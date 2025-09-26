import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Fetch properties from the property_selling_submissions table
    const { data: properties, error } = await supabase
      .from("property_selling_submissions")
      .select(`
        id,
        property_type,
        size,
        facing,
        location,
        created_at
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch properties from database" }, { status: 500 })
    }

    // Return the properties data
    return NextResponse.json({
      success: true,
      properties: properties || [],
      count: properties?.length || 0,
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
