"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { sendQuickEnquirySMS, sendContactFormSMS } from "@/lib/msg91"

export interface SubmissionResult {
  success: boolean
  message: string
  errors?: Record<string, string[]>
  statusCode?: number
}

export async function submitQuickEnquiry(formData: FormData): Promise<SubmissionResult> {
  try {
    const supabase = await createClient()

    // Extract form data
    const name = formData.get("name") as string
    const phone = formData.get("phone") as string
    const email = (formData.get("email") as string) || null
    const propertyType = (formData.get("propertyType") as string) || null
    const priceRange = (formData.get("priceRange") as string) || null
    const message = (formData.get("message") as string) || null
    const formType = (formData.get("formType") as string) || "quick_enquiry"

    // Validate required fields
    const errors: Record<string, string[]> = {}

    if (!name) errors.name = ["Name is required"]
    if (!phone) errors.phone = ["Phone number is required"]

    // Validate phone format (Indian)
    if (phone && !/^[6-9]\d{9}$/.test(phone.replace(/\D/g, ""))) {
      errors.phone = ["Please enter a valid 10-digit Indian phone number"]
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: "Please fill all required fields correctly",
        errors,
        statusCode: 400,
      }
    }

    // Determine which table to use
    const tableName = formType === "contact_us" ? "contact_form_submissions" : "quick_enquiry_submissions"

    // Prepare data for database insertion
    const dbData: any = {
      full_name: name,
      phone: phone,
      email: email,
      property_type: propertyType,
      message: message,
      processing_status: "pending",
      sms_sent: false,
      raw_data: {
        submitted_at: new Date().toISOString(),
        form_version: "2.0",
        form_type: formType,
        user_agent: typeof window !== "undefined" ? window.navigator.userAgent : "server",
      },
    }

    // Add location/priceRange based on form type
    if (formType === "quick_enquiry") {
      dbData.location = priceRange // Store budget range in location field for quick enquiry
    }

    console.log(`Submitting ${formType} data to ${tableName}:`, dbData)

    // Insert into database
    const { data: insertedData, error } = await supabase.from(tableName).insert([dbData]).select().single()

    if (error) {
      console.error("Database error:", error)
      return {
        success: false,
        message: `Database error: ${error.message}`,
        statusCode: 500,
      }
    }

    console.log(`Successfully inserted ${formType} submission:`, insertedData.id)

    // Send SMS notification
    try {
      console.log("Sending SMS to:", phone)

      let smsResult
      if (formType === "contact_us") {
        smsResult = await sendContactFormSMS(phone, name)
      } else {
        smsResult = await sendQuickEnquirySMS(phone, name)
      }

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

      await supabase.from(tableName).update(smsUpdateData).eq("id", insertedData.id)
    } catch (smsError) {
      console.error("SMS sending error:", smsError)
      // Don't fail the submission if SMS fails
      await supabase
        .from(tableName)
        .update({
          sms_sent: false,
          sms_error: smsError instanceof Error ? smsError.message : "Unknown SMS error",
        })
        .eq("id", insertedData.id)
    }

    // Revalidate admin dashboard
    revalidatePath("/admin/dashboard")

    const formTypeLabel = formType === "contact_us" ? "Contact Form" : "Quick Enquiry"

    return {
      success: true,
      message: `Your ${formTypeLabel} has been submitted successfully! 📱 We've sent you a confirmation SMS. Our team will contact you within 2 hours.`,
      statusCode: 200,
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit enquiry. Please try again.",
      statusCode: 500,
    }
  }
}
