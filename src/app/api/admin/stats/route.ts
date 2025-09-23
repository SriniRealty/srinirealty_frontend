import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { requireAdminAuth } from "@/lib/auth"

export async function GET() {
  try {
    await requireAdminAuth()

    const supabase = await createClient()

    // Get counts from all three tables
    const [sellingResult, buyingResult, developmentResult] = await Promise.all([
      supabase.from("property_selling_submissions").select("*", { count: "exact", head: true }),
      supabase.from("property_buying_submissions").select("*", { count: "exact", head: true }),
      supabase.from("property_development_submissions").select("*", { count: "exact", head: true }),
    ])

    const sellingCount = sellingResult.count || 0
    const buyingCount = buyingResult.count || 0
    const developmentCount = developmentResult.count || 0
    const totalSubmissions = sellingCount + buyingCount + developmentCount

    // Get status counts
    const [sellingStatus, buyingStatus, developmentStatus] = await Promise.all([
      supabase.from("property_selling_submissions").select("processing_status"),
      supabase.from("property_buying_submissions").select("processing_status"),
      supabase.from("property_development_submissions").select("processing_status"),
    ])

    const allStatuses = [...(sellingStatus.data || []), ...(buyingStatus.data || []), ...(developmentStatus.data || [])]

    const pendingSubmissions = allStatuses.filter((s) => s.processing_status === "pending").length
    const completedSubmissions = allStatuses.filter((s) => s.processing_status === "completed").length
    const failedSubmissions = allStatuses.filter((s) => s.processing_status === "failed").length

    // Get today's submissions
    const today = new Date().toISOString().split("T")[0]
    const [todaySelling, todayBuying, todayDevelopment] = await Promise.all([
      supabase
        .from("property_selling_submissions")
        .select("*", { count: "exact", head: true })
        .gte("created_at", `${today}T00:00:00.000Z`)
        .lt("created_at", `${today}T23:59:59.999Z`),
      supabase
        .from("property_buying_submissions")
        .select("*", { count: "exact", head: true })
        .gte("created_at", `${today}T00:00:00.000Z`)
        .lt("created_at", `${today}T23:59:59.999Z`),
      supabase
        .from("property_development_submissions")
        .select("*", { count: "exact", head: true })
        .gte("created_at", `${today}T00:00:00.000Z`)
        .lt("created_at", `${today}T23:59:59.999Z`),
    ])

    const todaySubmissions = (todaySelling.count || 0) + (todayBuying.count || 0) + (todayDevelopment.count || 0)

    const stats = {
      totalSubmissions,
      sellingSubmissions: sellingCount,
      buyingSubmissions: buyingCount,
      developmentSubmissions: developmentCount,
      pendingSubmissions,
      completedSubmissions,
      failedSubmissions,
      todaySubmissions,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Stats API error:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
