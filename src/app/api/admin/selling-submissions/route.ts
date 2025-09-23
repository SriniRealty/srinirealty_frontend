import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { requireAdminAuth } from "@/lib/auth"

export async function GET() {
  try {
    await requireAdminAuth()

    const supabase = await createClient()

    const { data: submissions, error } = await supabase
      .from("property_selling_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)

    if (error) {
      throw error
    }

    return NextResponse.json(submissions || [])
  } catch (error) {
    console.error("Selling submissions API error:", error)
    return NextResponse.json({ error: "Failed to fetch selling submissions" }, { status: 500 })
  }
}
