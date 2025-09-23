import { requireAdminAuth } from "@/lib/auth"
import { redirect } from "next/navigation"
import DashboardClient from "./dashboard-client"

export default async function AuthWrapper() {
  let session
  try {
    session = await requireAdminAuth()
  } catch (error) {
    redirect("/admin/login")
  }

  return <DashboardClient session={session} />
}
