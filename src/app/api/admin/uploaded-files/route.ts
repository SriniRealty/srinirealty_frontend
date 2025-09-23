import { type NextRequest, NextResponse } from "next/server"
import { requireAdminAuth } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()

    const supabase = await createClient()

    // Get files from both buckets
    const [documentsResult, imagesResult] = await Promise.all([
      supabase.storage.from("property-documents").list("uploads"),
      supabase.storage.from("property-images").list("uploads"),
    ])

    const files = []

    // Process documents
    if (documentsResult.data) {
      for (const file of documentsResult.data) {
        const { data: urlData } = supabase.storage.from("property-documents").getPublicUrl(`uploads/${file.name}`)

        files.push({
          id: file.id || file.name,
          name: file.name,
          url: urlData.publicUrl,
          type: "document",
          size: file.metadata?.size || 0,
          created_at: file.created_at || file.updated_at,
          bucket: "property-documents",
        })
      }
    }

    // Process images
    if (imagesResult.data) {
      for (const file of imagesResult.data) {
        const { data: urlData } = supabase.storage.from("property-images").getPublicUrl(`uploads/${file.name}`)

        files.push({
          id: file.id || file.name,
          name: file.name,
          url: urlData.publicUrl,
          type: "image",
          size: file.metadata?.size || 0,
          created_at: file.created_at || file.updated_at,
          bucket: "property-images",
        })
      }
    }

    // Sort by creation date (newest first)
    files.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    return NextResponse.json(files, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error fetching uploaded files:", error)
    return NextResponse.json(
      { error: "Failed to fetch uploaded files" },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}
