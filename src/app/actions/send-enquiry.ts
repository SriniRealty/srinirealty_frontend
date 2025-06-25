"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  priceRange: string;
  message: string;
}

export async function sendEnquiry(formData: EnquiryData) {
  try {
    // Validate required environment variables
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    // Send email using Resend's default domain (onboarding@resend.dev)
    const result = await resend.emails.send({
      from: "Srini Realty <onboarding@resend.dev>", // Resend's default domain - no custom domain needed
      to: ["srinirealty1@gmail.com"], // Your email - hardcoded
      subject: `🏠 New Property Enquiry from ${formData.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Property Enquiry</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-row { display: flex; margin-bottom: 15px; }
            .label { font-weight: bold; color: #2563eb; min-width: 140px; }
            .value { flex: 1; }
            .highlight { background: #e0f2fe; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb; }
            .footer { text-align: center; margin-top: 30px; padding: 20px; background: #1f2937; color: white; border-radius: 8px; }
            .urgent { background: #fef3c7; border: 2px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .contact-info { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏠 New Property Enquiry</h1>
              <p>Srini Realty Website Submission</p>
            </div>
            
            <div class="content">
              <div class="urgent">
                <strong>⏰ URGENT:</strong> Please contact this customer within 2 hours as promised on the website.
              </div>
              
              <div class="contact-info">
                <h2 style="color: #2563eb; margin-top: 0;">Customer Details</h2>
                <div class="info-row">
                  <span class="label">👤 Name:</span>
                  <span class="value">${formData.name}</span>
                </div>
                <div class="info-row">
                  <span class="label">📧 Email:</span>
                  <span class="value"><a href="mailto:${formData.email}" style="color: #2563eb; text-decoration: none;">${formData.email}</a></span>
                </div>
                <div class="info-row">
                  <span class="label">📱 Phone:</span>
                  <span class="value"><a href="tel:${formData.phone}" style="color: #2563eb; text-decoration: none;">${formData.phone}</a></span>
                </div>
                <div class="info-row">
                  <span class="label">🏘️ Property Type:</span>
                  <span class="value">${formData.propertyType}</span>
                </div>
                <div class="info-row">
                  <span class="label">💰 Budget Range:</span>
                  <span class="value">₹${formData.priceRange}</span>
                </div>
                <div class="info-row">
                  <span class="label">📅 Submitted:</span>
                  <span class="value">${new Date().toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}</span>
                </div>
              </div>
              
              ${
                formData.message
                  ? `
                <div class="highlight">
                  <h3 style="margin-top: 0; color: #2563eb;">📝 Additional Requirements:</h3>
                  <p style="margin-bottom: 0;">${formData.message}</p>
                </div>
              `
                  : ""
              }
              
              <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                <h3 style="color: #059669; margin-top: 0;">🎯 Quick Actions:</h3>
                <p style="margin: 10px 0;">
                  <a href="tel:${formData.phone}" style="background: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-right: 10px;">📞 Call ${formData.phone}</a>
                  <a href="https://wa.me/${formData.phone.replace(/[^0-9]/g, "")}?text=Hi ${formData.name}, Thank you for your enquiry about ${formData.propertyType} properties. I'm calling from Srini Realty." style="background: #25d366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-right: 10px;">💬 WhatsApp</a>
                  <a href="mailto:${formData.email}?subject=Re: Your Property Enquiry - Srini Realty&body=Dear ${formData.name},%0A%0AThank you for your enquiry about ${formData.propertyType} properties.%0A%0ABest regards,%0ASrini Realty Team" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">📧 Reply to ${formData.email}</a>
                </p>
              </div>
            </div>
            
            <div class="footer">
              <p><strong>Srini Realty</strong> - Growing Together Since 2008</p>
              <p>📍 Hyderabad, Telangana | 📞 +91 74 7899 7899 | 🌐 https://srinirealty.in</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
      New Property Enquiry - Srini Realty
      
      URGENT: Please contact this customer within 2 hours as promised.
      
      Customer Details:
      ==================
      Name: ${formData.name}
      Email: ${formData.email}
      Phone: ${formData.phone}
      Property Type: ${formData.propertyType}
      Budget Range: ₹${formData.priceRange}
      Submitted: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
      
      ${formData.message ? `Additional Requirements:\n${formData.message}\n` : ""}
      
      Quick Actions:
      - Call: ${formData.phone}
      - WhatsApp: https://wa.me/${formData.phone.replace(/[^0-9]/g, "")}
      - Email: ${formData.email}
      
      ==================
      Srini Realty - Growing Together Since 2008
      Hyderabad, Telangana | +91 74 7899 7899
      `,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      throw new Error(`Failed to send email: ${result.error.message}`);
    }

    console.log(
      "Email sent successfully to srinirealty1@gmail.com:",
      result.data
    );

    return {
      success: true,
      message:
        "Thank you for your enquiry! Our property expert will contact you within 2 hours.",
      emailId: result.data?.id,
    };
  } catch (error) {
    console.error("Error sending enquiry email:", error);

    // Fallback - create mailto link
    const emailContent = `
    New Property Enquiry from Srini Realty Website
    
    Customer Details:
    ==================
    Name: ${formData.name}
    Email: ${formData.email}
    Phone: ${formData.phone}
    Property Type: ${formData.propertyType}
    Budget Range: ₹${formData.priceRange}
    
    Additional Requirements:
    ========================
    ${formData.message || "No additional requirements specified"}
    
    Submission Date: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
    
    ==================
    This enquiry was submitted through the Srini Realty website.
    Please contact the customer within 2 hours as promised.
    `;

    const mailtoLink = `mailto:srinirealty1@gmail.com?subject=New Property Enquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(emailContent)}`;

    return {
      success: false,
      message:
        "Email service temporarily unavailable. Opening your email client as fallback.",
      mailtoLink,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
