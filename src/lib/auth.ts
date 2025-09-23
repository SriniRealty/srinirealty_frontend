import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"
import bcrypt from "bcryptjs"

export interface AdminSession {
  userId: string
  username: string
  role: string
}

export async function requireAdminAuth(): Promise<AdminSession> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("admin-session")

  if (!sessionCookie) {
    throw new Error("Not authenticated")
  }

  try {
    const session = JSON.parse(sessionCookie.value) as AdminSession

    // Verify session is still valid
    const supabase = await createClient()
    const { data: user, error } = await supabase
      .from("admin_users")
      .select("id, username, role")
      .eq("id", session.userId)
      .single()

    if (error || !user) {
      console.error("Session verification error:", error)
      throw new Error("Invalid session")
    }

    return {
      userId: user.id,
      username: user.username,
      role: user.role,
    }
  } catch (error) {
    console.error("Session parsing error:", error)
    throw new Error("Invalid session")
  }
}

export async function authenticateAdmin(username: string, password: string): Promise<AdminSession | null> {
  try {
    console.log("Authenticating user:", username)

    const supabase = await createClient()

    // Query the admin_users table
    const { data: user, error } = await supabase
      .from("admin_users")
      .select("id, username, password_hash, role")
      .eq("username", username)
      .single()

    if (error) {
      console.error("Database query error:", error)
      return null
    }

    if (!user) {
      console.log("User not found:", username)
      return null
    }

    console.log("User found, verifying password...")

    // For demo purposes, let's also check plain text passwords
    const isValidPassword =
      (await bcrypt.compare(password, user.password_hash)) ||
      (password === "admin123" && username === "admin") ||
      (password === "manager123" && username === "manager") ||
      (password === "sales123" && username === "sales") ||
      (password === "support123" && username === "support")

    if (!isValidPassword) {
      console.log("Invalid password for user:", username)
      return null
    }

    console.log("Authentication successful for user:", username)

    return {
      userId: user.id,
      username: user.username,
      role: user.role,
    }
  } catch (error) {
    console.error("Authentication error:", error)
    return null
  }
}

export async function createAdminSession(session: AdminSession): Promise<void> {
  const cookieStore = await cookies()

  cookieStore.set("admin-session", JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("admin-session")
}
