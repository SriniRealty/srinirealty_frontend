import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { requireAdminAuth } from "@/lib/auth"

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    // Verify admin auth
    await requireAdminAuth()

    // Next.js 15 requires awaiting params
    const { id } = await context.params
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "selling"

    if (!id) {
      return NextResponse.json({ error: "Submission ID is required" }, { status: 400 })
    }

    const supabase = await createClient()

    // Decide table by type
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
        return NextResponse.json({ error: "Invalid submission type" }, { status: 400 })
    }

    // Attempt direct id lookup
    const { data: submission, error } = await supabase.from(tableName).select("*").eq("id", id).single()

    if (error) {
      // PGRST116 = no rows found for .single()
      if ((error as any).code === "PGRST116") {
        // Try fallback by custom_id
        const { data: customIdResult, error: customIdError } = await supabase
          .from(tableName)
          .select("*")
          .eq("custom_id", id)
          .single()

        if (!customIdError && customIdResult) {
          return NextResponse.json({
            success: true,
            data: {
              ...customIdResult,
              document_urls: customIdResult.document_urls || [],
              image_urls: customIdResult.image_urls || [],
              type,
            },
          })
        }

        return NextResponse.json({ error: "Submission not found" }, { status: 404 })
      }

      if ((error as any).code === "42P01") {
        return NextResponse.json({ error: `Table ${tableName} does not exist` }, { status: 500 })
      }

      if ((error as any).code === "42501") {
        return NextResponse.json({ error: "Permission denied to access table" }, { status: 403 })
      }

      return NextResponse.json({ error: "Failed to fetch submission", errorCode: (error as any).code }, { status: 500 })
    }

    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    const processedSubmission = {
      ...submission,
      document_urls: submission.document_urls || [],
      image_urls: submission.image_urls || [],
      type,
    }

    return NextResponse.json({ success: true, data: processedSubmission })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    // Unauthorized path
    if (message.toLowerCase().includes("unauthorized")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.json({ error: "Internal server error", message }, { status: 500 })
  }
}
