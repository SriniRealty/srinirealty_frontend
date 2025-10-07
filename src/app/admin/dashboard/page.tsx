import { Suspense } from "react"
import { requireAdminAuth } from "@/lib/auth"
import { redirect } from "next/navigation"
import DashboardClient from "./dashboard-client"

// Optional but helpful: makes this page dynamic (avoids static export trying to pre-render with params)
export const dynamic = "force-dynamic"

function DashboardClientBoundary({ session }: { session: any }) {
  // This is a tiny wrapper so the <Suspense> can render a client subtree
  return <DashboardClient session={session} />
}

export default async function AdminDashboard() {
  let session
  try {
    session = await requireAdminAuth()
  } catch {
    redirect("/admin/login")
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-600">
          Loading dashboard…
        </div>
      }
    >
      <DashboardClientBoundary session={session} />
    </Suspense>
  )
}
