import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { requireAdminAuth } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    await requireAdminAuth()

    const { id, type, stage } = await request.json()

    console.log("Update stage request:", { id, type, stage })

    if (!id || !type || !stage) {
      return NextResponse.json({ error: "Missing required fields: id, type, stage" }, { status: 400 })
    }

    const supabase = await createClient()

    // Determine the table name based on type
    let tableName = ""
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
        console.error(`Invalid submission type: ${type}`)
        return NextResponse.json({ error: "Invalid submission type" }, { status: 400 })
    }

    console.log(`Updating stage in table: ${tableName}`)

    // Update the stage in the database
    const { data, error } = await supabase
      .from(tableName)
      .update({
        stage: stage,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Database update error:", error)
      return NextResponse.json({ error: "Failed to update stage" }, { status: 500 })
    }

    console.log("Successfully updated stage:", data)

    return NextResponse.json({
      success: true,
      data: data,
      message: `Stage updated to ${stage}`,
    })
  } catch (error) {
    console.error("Stage update error:", error)

    // Check if this is an authentication error
    if (error instanceof Error && error.message.includes("unauthorized")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
