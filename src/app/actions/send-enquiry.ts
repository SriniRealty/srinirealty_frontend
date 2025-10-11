"use server"

import { Resend } from "resend"
import { createClient } from "@/lib/supabase/server"

const resend = new Resend(process.env.RESEND_API_KEY)

interface EnquiryData {
  name: string
  email: string
  phone: string
  propertyType: string
  priceRange: string
  message: string
}

export async function sendEnquiry(data: EnquiryData) {
  try {
    console.log("[v0] Starting enquiry submission:", data)

    // Validate required fields
    if (!data.name || !data.phone || !data.email) {
      return {
        success: false,
        message: "Name, phone, and email are required",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        message: "Invalid email address",
      }
    }

    // Validate phone number format (10 digits starting with 6-9)
    const phoneRegex = /^[6-9][0-9]{9}$/
    if (!phoneRegex.test(data.phone)) {
      return {
        success: false,
        message: "Invalid phone number. Must be 10 digits starting with 6, 7, 8, or 9",
      }
    }

    const supabase = await createClient()

    const submissionData = {
      full_name: data.name,
      phone: data.phone,
      email: data.email,
      property_type: data.propertyType,
      budget_range: data.priceRange,
      message: data.message || null,
      processing_status: "pending",
      raw_data: {
        submitted_at: new Date().toISOString(),
        form_version: "2.0",
        source: "enquiry_form",
      },
      created_at: new Date().toISOString(),
    }

    console.log("[v0] Inserting into database:", submissionData)

    const { data: insertedData, error: dbError } = await supabase
      .from("quick_enquiry_submissions")
      .insert([submissionData])
      .select()
      .single()

    if (dbError) {
      console.error("[v0] Database error:", dbError)
      return {
        success: false,
        message: `Failed to save enquiry: ${dbError.message}`,
      }
    }

    console.log("[v0] Successfully inserted enquiry with ID:", insertedData.id)

    try {
      const adminEmailResult = await resend.emails.send({
        from: "Srini Realty <noreply@srinirealty.in>",
        to: "srinirealty1@gmail.com",
        subject: `🏠 New Property Enquiry from ${data.name}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">🏠 New Property Enquiry</h1>
              </div>
              
              <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                <h2 style="color: #667eea; margin-top: 0;">Customer Details</h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Name:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><a href="mailto:${data.email}" style="color: #667eea;">${data.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Phone:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;"><a href="tel:${data.phone}" style="color: #667eea;">${data.phone}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Property Type:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.propertyType}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Budget Range:</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">₹${data.priceRange}</td>
                  </tr>
                  ${
                    data.message
                      ? `
                  <tr>
                    <td style="padding: 10px; font-weight: bold; vertical-align: top;">Message:</td>
                    <td style="padding: 10px;">${data.message}</td>
                  </tr>
                  `
                      : ""
                  }
                </table>
                
                <div style="margin-top: 30px; padding: 20px; background: white; border-radius: 8px; border-left: 4px solid #667eea;">
                  <p style="margin: 0; color: #666;">
                    <strong>Submission ID:</strong> ${insertedData.id}<br>
                    <strong>Submitted:</strong> ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                  </p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
                <p>This is an automated notification from Srini Realty website</p>
              </div>
            </body>
          </html>
        `,
      })

      console.log("[v0] Admin email sent:", adminEmailResult.data?.id)
    } catch (emailError) {
      console.error("[v0] Admin email error:", emailError)
      // Don't fail the submission if admin email fails
    }

    try {
      const customerEmailResult = await resend.emails.send({
        from: "Srini Realty <noreply@srinirealty.in>",
        to: data.email,
        subject: "✅ Your Property Enquiry Has Been Received - Srini Realty",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
              
               Logo Section 
              <div style="text-align: center; padding: 20px; background: white; border-radius: 10px 10px 0 0;">
                <div style="width: 150px; height: 80px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">
                  SRINI REALTY
                </div>
                <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">Your Trusted Property Partner</p>
              </div>
              
               Main Content 
              <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
                <h1 style="color: #667eea; margin-top: 0; font-size: 24px;">✅ Enquiry Received Successfully!</h1>
                
                <p style="font-size: 16px; color: #333;">Dear <strong>${data.name}</strong>,</p>
                
                <p style="font-size: 16px; color: #333;">
                  Thank you for your interest in our properties! We have successfully received your enquiry and our team will get back to you within 24 hours.
                </p>
                
                <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                  <h3 style="margin-top: 0; color: #667eea;">Your Enquiry Details:</h3>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; font-weight: bold; color: #666;">Property Type:</td>
                      <td style="padding: 8px 0;">${data.propertyType}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-weight: bold; color: #666;">Budget Range:</td>
                      <td style="padding: 8px 0;">₹${data.priceRange}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-weight: bold; color: #666;">Contact Number:</td>
                      <td style="padding: 8px 0;">${data.phone}</td>
                    </tr>
                    ${
                      data.message
                        ? `
                    <tr>
                      <td style="padding: 8px 0; font-weight: bold; color: #666; vertical-align: top;">Your Message:</td>
                      <td style="padding: 8px 0;">${data.message}</td>
                    </tr>
                    `
                        : ""
                    }
                  </table>
                </div>
                
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: white;">What Happens Next?</h3>
                  <ul style="color: white; padding-left: 20px; margin: 10px 0;">
                    <li style="margin-bottom: 10px;">Our property expert will review your requirements</li>
                    <li style="margin-bottom: 10px;">We'll prepare personalized property recommendations</li>
                    <li style="margin-bottom: 10px;">You'll receive a call within 24 hours to discuss options</li>
                    <li>We'll schedule a property visit at your convenience</li>
                  </ul>
                </div>
                
                <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0; color: #856404;">
                    <strong>📞 Need Immediate Assistance?</strong><br>
                    Call us at: <a href="tel:+917478997899" style="color: #667eea; text-decoration: none; font-weight: bold;">+91 74 7899 7899</a><br>
                    Email: <a href="mailto:info@srinirealty.in" style="color: #667eea; text-decoration: none;">info@srinirealty.in</a>
                  </p>
                </div>
                
                <p style="font-size: 16px; color: #333;">
                  We look forward to helping you find your dream property!
                </p>
                
                <p style="font-size: 16px; color: #333;">
                  Best regards,<br>
                  <strong>Team Srini Realty</strong>
                </p>
              </div>
              
               Footer 
              <div style="text-align: center; margin-top: 20px; padding: 20px; color: #999; font-size: 12px;">
                <p style="margin: 5px 0;">PE/14, 8-7-91/16, Phase 4, Hasthinapuram South, Hastinapuram, Hyderabad, Telangana 500070</p>
                <p style="margin: 5px 0;">
                  <a href="https://www.srinirealty.in" style="color: #667eea; text-decoration: none;">www.srinirealty.in</a>
                </p>
                <p style="margin: 15px 0 5px 0; font-size: 11px; color: #bbb;">
                  This is an automated confirmation email. Please do not reply to this email.
                </p>
              </div>
            </body>
          </html>
        `,
      })

      console.log("[v0] Customer confirmation email sent:", customerEmailResult.data?.id)

      await supabase
        .from("quick_enquiry_submissions")
        .update({
          email_sent: true,
          email_sent_at: new Date().toISOString(),
        })
        .eq("id", insertedData.id)
    } catch (emailError) {
      console.error("[v0] Customer email error:", emailError)
      // Update database with email error
      await supabase
        .from("quick_enquiry_submissions")
        .update({
          email_sent: false,
          email_error: emailError instanceof Error ? emailError.message : "Email failed",
        })
        .eq("id", insertedData.id)
    }

    return {
      success: true,
      message: "Your enquiry has been submitted successfully! Check your email for confirmation.",
      submissionId: insertedData.id,
    }
  } catch (error) {
    console.error("[v0] Enquiry submission error:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit enquiry. Please try again.",
      mailtoLink: `mailto:srinirealty1@gmail.com?subject=Property Enquiry from ${data.name}&body=Name: ${data.name}%0D%0APhone: ${data.phone}%0D%0AEmail: ${data.email}%0D%0AProperty Type: ${data.propertyType}%0D%0ABudget: ${data.priceRange}%0D%0AMessage: ${data.message}`,
    }
  }
}
