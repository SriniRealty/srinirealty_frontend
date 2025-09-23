import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { requireAdminAuth } from "@/lib/auth"

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    // Verify admin authentication
    await requireAdminAuth()

    // Await params as required by Next.js 15
    const params = await context.params
    const { id } = params
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "selling"

    console.log(`Fetching submission ${id} of type ${type}`)

    if (!id) {
      return NextResponse.json({ error: "Submission ID is required" }, { status: 400 })
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

    console.log(`Querying table: ${tableName} for ID: ${id}`)

    // Fetch the submission data
    const { data: submission, error } = await supabase.from(tableName).select("*").eq("id", id).single()

    if (error) {
      console.error("Database fetch error:", error)
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "Submission not found" }, { status: 404 })
      }
      return NextResponse.json({ error: "Failed to fetch submission" }, { status: 500 })
    }

    if (!submission) {
      console.log("No submission found for ID:", id)
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    console.log("Successfully fetched submission:", submission.id)

    // Process file URLs to ensure they're accessible
    const processedSubmission = {
      ...submission,
      document_urls: submission.document_urls || [],
      image_urls: submission.image_urls || [],
      type: type,
    }

    return NextResponse.json({
      success: true,
      data: processedSubmission,
    })
  } catch (error) {
    console.error("Submission fetch error:", error)

    // Check if this is an authentication error
    if (error instanceof Error && error.message.includes("unauthorized")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
