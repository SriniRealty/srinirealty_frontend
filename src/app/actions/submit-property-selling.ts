"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { uploadMultipleFiles } from "@/lib/file-upload" // Fixed import path
import { generatePropertyId } from "@/utils/generate-property-id"

export interface SubmissionResult {
  success: boolean
  message: string
  errors?: Record<string, string[]>
  statusCode?: number
  customId?: string
}

type UploadResult = { success: boolean; url?: string; error?: string }

function isSuccessfulWithUrl(r: UploadResult): r is UploadResult & { success: true; url: string } {
  return r.success === true && typeof r.url === "string"
}

export async function submitPropertySelling(formData: FormData): Promise<SubmissionResult> {
  try {
    const supabase = await createClient()

    // Extract form data
    const propertyType = formData.get("propertyType") as string
    const size = formData.get("size") as string
    const facing = formData.get("facing") as string
    const plotNumber = formData.get("plotNumber") as string
    const price = formData.get("price") as string
    const sellerType = formData.get("sellerType") as string
    const sellerName = formData.get("sellerName") as string
    const sellerPhone = formData.get("sellerPhone") as string
    const location = formData.get("location") as string
    const mapLink = formData.get("mapLink") as string
    const urgency = formData.get("urgency") as string
    const description = formData.get("description") as string

    // Handle file uploads
    const propertyDocuments: File[] = []
    const layoutDocuments: File[] = []

    // Extract files from FormData
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("propertyDocument_") && value instanceof File && value.size > 0) {
        propertyDocuments.push(value)
      } else if (key.startsWith("layoutDocument_") && value instanceof File && value.size > 0) {
        layoutDocuments.push(value)
      }
    }

    // Log file sizes for debugging
    console.log("Property documents:", propertyDocuments.map(f => ({name: f.name, size: f.size})))
    console.log("Layout documents:", layoutDocuments.map(f => ({name: f.name, size: f.size})))

    // Check total size before processing
    const totalFileSize = [...propertyDocuments, ...layoutDocuments].reduce((sum, file) => sum + file.size, 0)
    console.log(`Total file size: ${(totalFileSize / 1024 / 1024).toFixed(2)}MB`)

    if (totalFileSize > 10 * 1024 * 1024) { // 8MB limit
      return {
        success: false,
        message: `Total file size exceeds 8MB limit. Current total: ${(totalFileSize / 1024 / 1024).toFixed(2)}MB`,
        statusCode: 413,
      }
    }

    // Validate required fields
    const errors: Record<string, string[]> = {}

    if (!propertyType) errors.propertyType = ["Property type is required"]
    if (!size) errors.size = ["Size is required"]
    if (!facing) errors.facing = ["Facing is required"]
    if (!plotNumber) errors.plotNumber = ["Plot number is required"]
    if (!price) errors.price = ["Price is required"]
    if (!sellerType) errors.sellerType = ["Seller type is required"]
    if (!sellerName) errors.sellerName = ["Seller name is required"]
    if (!sellerPhone) errors.sellerPhone = ["Phone number is required"]

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: "Please fill all required fields",
        errors,
        statusCode: 400,
      }
    }

    // Generate custom property ID
    const customId = generatePropertyId(propertyType, size, facing, plotNumber)
    console.log("Generated custom ID:", customId)

    // Upload files to Supabase Storage
    let documentUrls: string[] = []
    let imageUrls: string[] = []

    try {
      if (propertyDocuments.length > 0) {
        console.log(`Uploading ${propertyDocuments.length} property documents`)
        const documentResults = await uploadMultipleFiles(propertyDocuments, "property-documents")
        documentUrls = documentResults.filter(isSuccessfulWithUrl).map(r => r.url)
        console.log(`Successfully uploaded ${documentUrls.length} property documents`)
        
        // Check for upload failures
        const failedUploads = documentResults.filter(r => !r.success)
        if (failedUploads.length > 0) {
          console.error("Failed uploads:", failedUploads)
        }
      }
      
      if (layoutDocuments.length > 0) {
        console.log(`Uploading ${layoutDocuments.length} layout documents`)
        const imageResults = await uploadMultipleFiles(layoutDocuments, "property-images")
        imageUrls = imageResults.filter(isSuccessfulWithUrl).map(r => r.url)
        console.log(`Successfully uploaded ${imageUrls.length} layout documents`)
        
        // Check for upload failures
        const failedUploads = imageResults.filter(r => !r.success)
        if (failedUploads.length > 0) {
          console.error("Failed uploads:", failedUploads)
        }
      }
    } catch (uploadError) {
      console.error("File upload error:", uploadError)
      return {
        success: false,
        message: "File upload failed. Please try again with smaller files.",
        statusCode: 413,
      }
    }

    // Prepare data for database insertion
    const dbData = {
      property_type: propertyType,
      size: size ? (Number.isFinite(Number(size)) ? Number(size) : null) : null,
      facing: facing,
      plot_number: plotNumber ? (Number.isFinite(Number(plotNumber)) ? Number(plotNumber) : null) : null,
      custom_id: customId,
      price: price ? (Number.isFinite(Number(price)) ? Number(price) : null) : null,
      seller_type: sellerType,
      seller_name: sellerName,
      seller_phone: sellerPhone,
      location: location || null,
      map_link: mapLink || null,
      urgency: urgency || null,
      description: description || null,
      document_urls: documentUrls,
      image_urls: imageUrls,
      processing_status: "pending",
      raw_data: {
        submitted_at: new Date().toISOString(),
        form_version: "1.0",
        custom_id: customId,
        user_agent: typeof window !== "undefined" ? window.navigator.userAgent : "server",
        files_uploaded: {
          property_documents: propertyDocuments.length,
          layout_documents: layoutDocuments.length,
          successful_uploads: documentUrls.length + imageUrls.length,
        },
      },
    }

    console.log("Submitting selling data:", dbData)

    // Insert into database
    const { data: insertedData, error } = await supabase
      .from("property_selling_submissions")
      .insert([dbData])
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return {
        success: false,
        message: `Database error: ${error.message}`,
        statusCode: 500,
      }
    }

    console.log("Successfully inserted selling submission:", insertedData.id, "with custom ID:", customId)

    // Revalidate admin dashboard
    revalidatePath("/admin/dashboard")

    return {
      success: true,
      message: `Property listing submitted successfully! Your property ID is ${customId}. We'll contact you soon.`,
      customId: customId,
      statusCode: 200,
    }
  } catch (error) {
    console.error("Form submission error:", error)
    
    // Check if it's a body size limit error
    if (error instanceof Error && error.message.includes("Body exceeded")) {
      return {
        success: false,
        message: "Files are too large. Please reduce file sizes and try again.",
        statusCode: 413,
      }
    }
    
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit form. Please try again.",
      statusCode: 500,
    }
  }
}