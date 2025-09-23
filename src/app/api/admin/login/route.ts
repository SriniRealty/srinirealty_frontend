import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    console.log("Login API called")

    const body = await request.json()
    const { username, password } = body

    console.log("Login attempt for username:", username)

    if (!username || !password) {
      console.log("Missing username or password")
      return NextResponse.json(
        { success: false, message: "Username and password are required" },
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    // Create Supabase client
    const supabase = await createClient()

    // Query the admin_users table directly
    const { data: user, error } = await supabase
      .from("admin_users")
      .select("id, username, password_hash, role")
      .eq("username", username.trim())
      .single()

    if (error) {
      console.error("Database query error:", error)
      return NextResponse.json(
        { success: false, message: "Database error" },
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    if (!user) {
      console.log("User not found:", username)
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    console.log("User found, verifying password...")

    // Check password (both hashed and plain text for demo)
    const isValidPassword =
      (await bcrypt.compare(password, user.password_hash)) ||
      (password === "admin123" && username === "admin") ||
      (password === "manager123" && username === "manager") ||
      (password === "sales123" && username === "sales") ||
      (password === "support123" && username === "support")

    if (!isValidPassword) {
      console.log("Invalid password for user:", username)
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
    }

    console.log("Authentication successful, creating session...")

    // Create session
    const session = {
      userId: user.id,
      username: user.username,
      role: user.role,
    }

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set("admin-session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    console.log("Login successful for:", username)
    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          username: session.username,
          role: session.role,
        },
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  } catch (error) {
    console.error("Login API error:", error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { success: false, message: "Method not allowed" },
    {
      status: 405,
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
