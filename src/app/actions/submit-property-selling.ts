"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { uploadMultipleFiles } from "@/lib/file-upload"
import { generatePropertyId } from "@/utils/generate-property-id"

export interface SubmissionResult {
  success: boolean
  message: string
  errors?: Record<string, string[]>
  statusCode?: number
  customId?: string
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
    const isSriniOwned = formData.get("isSriniOwned") === "true"

    // Handle file uploads
    const propertyDocuments: File[] = []
    const layoutDocuments: File[] = []

    // Extract files from FormData
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("propertyDocument_") && value instanceof File) {
        propertyDocuments.push(value)
      } else if (key.startsWith("layoutDocument_") && value instanceof File) {
        layoutDocuments.push(value)
      }
    }

    // Upload files to Supabase Storage
    let documentUrls: string[] = []
    let imageUrls: string[] = []

    try {
      if (propertyDocuments.length > 0) {
        console.log(`Uploading ${propertyDocuments.length} property documents`)
        const documentResults = await uploadMultipleFiles(propertyDocuments, "property-documents")
        documentUrls = documentResults
          .filter((result) => result.success)
          .map((result) => result.url)
          .filter((url) => url !== undefined) as string[]
        console.log(`Successfully uploaded ${documentUrls.length} property documents`)
      }
      if (layoutDocuments.length > 0) {
        console.log(`Uploading ${layoutDocuments.length} layout documents`)
        const imageResults = await uploadMultipleFiles(layoutDocuments, "property-images")
        imageUrls = imageResults
          .filter((result) => result.success)
          .map((result) => result.url)
          .filter((url) => url !== undefined) as string[]
        console.log(`Successfully uploaded ${imageUrls.length} layout documents`)
      }
    } catch (uploadError) {
      console.error("File upload error:", uploadError)
      return {
        success: false,
        message: "File upload failed. Please try again with smaller files.",
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
    const customId = generatePropertyId(propertyType, plotNumber, facing, size)

    console.log("Generated custom ID:", customId)

    // Prepare data for database insertion
    const dbData = {
      property_type: propertyType,
      size: size ? Number.parseInt(size) : null,
      facing: facing,
      plot_number: plotNumber ? Number.parseInt(plotNumber) : null,
      custom_id: customId,
      price: price,
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
      sms_sent: false,
      is_srini_owned: isSriniOwned,
      raw_data: {
        submitted_at: new Date().toISOString(),
        form_version: "1.0",
        custom_id: customId,
        is_srini_owned: isSriniOwned,
        user_agent: typeof window !== "undefined" ? window.navigator.userAgent : "server",
        files_uploaded: {
          property_documents: propertyDocuments.length,
          layout_documents: layoutDocuments.length,
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

    // Send SMS notification (only if not SRINI owned)
    // if (!isSriniOwned) {
    //   try {
    //     console.log("Sending SMS to:", sellerPhone)
    //     const smsResult = await sendPropertySellingSMS(sellerPhone, customId, sellerName)

    //     // Update SMS status in database
    //     const smsUpdateData: any = {
    //       sms_sent: smsResult.success,
    //       sms_sent_at: new Date().toISOString(),
    //     }

    //     if (smsResult.success) {
    //       smsUpdateData.sms_message_id = smsResult.messageId
    //       console.log("SMS sent successfully:", smsResult.messageId)
    //     } else {
    //       smsUpdateData.sms_error = smsResult.error
    //       console.error("SMS failed:", smsResult.error)
    //     }

    //     await supabase.from("property_selling_submissions").update(smsUpdateData).eq("id", insertedData.id)
    //   } catch (smsError) {
    //     console.error("SMS sending error:", smsError)
    //     await supabase
    //       .from("property_selling_submissions")
    //       .update({
    //         sms_sent: false,
    //         sms_error: smsError instanceof Error ? smsError.message : "Unknown SMS error",
    //       })
    //       .eq("id", insertedData.id)
    //   }
    // }

    // Revalidate admin dashboard
    revalidatePath("/admin/dashboard")

    return {
      success: true,
      message: isSriniOwned
        ? `SRINI property uploaded successfully! Property ID: ${customId}`
        : `Property listing submitted successfully! Your property ID is ${customId}. We'll contact you soon.`,
      customId: customId,
      statusCode: 200,
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit form. Please try again.",
      statusCode: 500,
    }
  }
}
