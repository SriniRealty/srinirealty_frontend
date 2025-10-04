"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { sendPropertyDevelopmentSMS } from "@/lib/msg91"

export interface SubmissionResult {
  success: boolean
  message: string
  errors?: Record<string, string[]>
  statusCode?: number
}

export async function submitPropertyDevelopment(formData: FormData): Promise<SubmissionResult> {
  try {
    const supabase = await createClient()

    // Extract form data
    const propertyType = formData.get("propertyType") as string
    const size = formData.get("size") as string
    const location = formData.get("location") as string
    const name = formData.get("name") as string
    const phone = formData.get("phone") as string
    const description = formData.get("description") as string

    // Validate required fields
    const errors: Record<string, string[]> = {}

    if (!propertyType) errors.propertyType = ["Property type is required"]
    if (!name) errors.name = ["Name is required"]
    if (!phone) errors.phone = ["Phone number is required"]

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: "Please fill all required fields",
        errors,
        statusCode: 400,
      }
    }

    // Prepare data for database insertion (matching exact schema)
    const dbData = {
      development_type: propertyType,
      project_size: size || null,
      location: location || null,
      full_name: name,
      phone: phone,
      project_description: description || null,
      processing_status: "pending",
      sms_sent: false,
      raw_data: {
        submitted_at: new Date().toISOString(),
        form_version: "1.0",
        user_agent: typeof window !== "undefined" ? window.navigator.userAgent : "server",
      },
    }

    console.log("Submitting development data:", dbData)

    // Insert into database
    const { data: insertedData, error } = await supabase
      .from("property_development_submissions")
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

    console.log("Successfully inserted development submission:", insertedData.id)

    // Send SMS notification
    try {
      console.log("Sending SMS to:", phone)
      const smsResult = await sendPropertyDevelopmentSMS(phone, name)

      // Update SMS status in database
      const smsUpdateData: any = {
        sms_sent: smsResult.success,
        sms_sent_at: new Date().toISOString(),
      }

      if (smsResult.success) {
        smsUpdateData.sms_message_id = smsResult.messageId
        console.log("SMS sent successfully:", smsResult.messageId)
      } else {
        smsUpdateData.sms_error = smsResult.error
        console.error("SMS failed:", smsResult.error)
      }

      await supabase.from("property_development_submissions").update(smsUpdateData).eq("id", insertedData.id)
    } catch (smsError) {
      console.error("SMS sending error:", smsError)
      // Don't fail the submission if SMS fails
      await supabase
        .from("property_development_submissions")
        .update({
          sms_sent: false,
          sms_error: smsError instanceof Error ? smsError.message : "Unknown SMS error",
        })
        .eq("id", insertedData.id)
    }

    // Revalidate admin dashboard
    revalidatePath("/admin/dashboard")

    return {
      success: true,
      message: "Development request submitted successfully! We'll contact you soon.",
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
