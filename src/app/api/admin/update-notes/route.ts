import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { requireAdminAuth } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Verify admin session
    await requireAdminAuth();

    const { id, type, notes } = await request.json()

    if (!id || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = createClient()

    // Determine the correct table based on submission type
    let tableName: string
    switch (type) {
      case "selling":
        tableName = "property_selling_submissions"
        break
      case "buying":
        tableName = "property_buying_submissions"
        break
      case "development":
        tableName = "property_development_submissions"
        break
      default:
        return NextResponse.json({ error: "Invalid submission type" }, { status: 400 })
    }

    // Update the notes in the database
    const { data, error } = await (await supabase)
      .from(tableName)
      .update({
        admin_notes: notes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to update notes" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Notes updated successfully",
      data,
    })
  } catch (error) {
    console.error("Update notes error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
function verifyAdminSession() {
    throw new Error("Function not implemented.")
}

