import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { requireAdminAuth } from "@/lib/auth"

export async function GET() {
  try {
    await requireAdminAuth()

    const supabase = await createClient()

    // Get processed submissions from all three tables
    const [sellingResult, buyingResult, developmentResult] = await Promise.all([
      supabase.from("processed_selling_submissions").select("*").order("created_at", { ascending: false }).limit(20),
      supabase.from("processed_buying_submissions").select("*").order("created_at", { ascending: false }).limit(20),
      supabase
        .from("processed_development_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20),
    ])

    const allProcessed = [
      ...(sellingResult.data || []).map((item: any) => ({ ...item, type: "selling" })),
      ...(buyingResult.data || []).map((item: any) => ({ ...item, type: "buying" })),
      ...(developmentResult.data || []).map((item: any) => ({ ...item, type: "development" })),
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    return NextResponse.json(allProcessed)
  } catch (error) {
    console.error("Processed submissions API error:", error)
    return NextResponse.json({ error: "Failed to fetch processed submissions" }, { status: 500 })
  }
}
