/**
 * MSG91 SMS Integration
 * Handles sending SMS notifications for form submissions
 */

interface SendSMSOptions {
  phone: string
  message: string
  templateId?: string
  variables?: Record<string, string>
}

interface SMSResponse {
  success: boolean
  messageId?: string
  error?: string
}

/**
 * Send SMS using MSG91 API
 */
export async function sendSMS(options: SendSMSOptions): Promise<SMSResponse> {
  const { phone, message, templateId, variables } = options

  // Validate phone number (Indian format)
  const cleanPhone = phone.replace(/\D/g, "")
  if (cleanPhone.length !== 10 || !cleanPhone.startsWith("6789")) {
    return {
      success: false,
      error: "Invalid phone number format. Must be 10 digits starting with 6, 7, 8, or 9",
    }
  }

  const authKey = process.env.MSG91_AUTH_KEY
  const senderId = process.env.MSG91_SENDER_ID || "PROPRT"
  const route = process.env.MSG91_ROUTE || "4" // 4 = Transactional

  if (!authKey) {
    console.error("MSG91_AUTH_KEY not configured")
    return {
      success: false,
      error: "SMS service not configured",
    }
  }

  try {
    let apiUrl = "https://api.msg91.com/api/v5/flow/"
    let requestBody: any

    if (templateId) {
      // Template SMS (recommended for production)
      apiUrl = "https://api.msg91.com/api/v5/flow/"
      requestBody = {
        template_id: templateId,
        short_url: "0",
        recipients: [
          {
            mobiles: `91${cleanPhone}`,
            ...variables,
          },
        ],
      }
    } else {
      // Plain SMS (for testing)
      apiUrl = "https://api.msg91.com/api/sendhttp.php"
      const params = new URLSearchParams({
        authkey: authKey,
        mobiles: `91${cleanPhone}`,
        message: message,
        sender: senderId,
        route: route,
        country: "91",
      })
      apiUrl = `${apiUrl}?${params.toString()}`
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        authkey: authKey,
        "content-type": "application/json",
      },
      body: templateId ? JSON.stringify(requestBody) : undefined,
    })

    const data = await response.json()

    console.log("MSG91 Response:", data)

    if (response.ok && (data.type === "success" || data.message === "success")) {
      return {
        success: true,
        messageId: data.message_id || data.request_id,
      }
    }

    return {
      success: false,
      error: data.message || "Failed to send SMS",
    }
  } catch (error) {
    console.error("MSG91 Error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Send SMS for Property Selling form submission
 */
export async function sendPropertySellingSMS(phone: string, propertyId: string, name: string): Promise<SMSResponse> {
  const templateId = process.env.MSG91_TEMPLATE_SELLING

  if (templateId) {
    return sendSMS({
      phone,
      message: "",
      templateId,
      variables: {
        name,
        property_id: propertyId,
      },
    })
  }

  // Fallback to plain SMS
  const message = `Dear ${name}, your property listing has been submitted successfully! Your Property ID is ${propertyId}. Our team will contact you soon. - Real Estate Team`

  return sendSMS({
    phone,
    message,
  })
}

/**
 * Send SMS for Property Buying form submission
 */
export async function sendPropertyBuyingSMS(phone: string, name: string): Promise<SMSResponse> {
  const templateId = process.env.MSG91_TEMPLATE_BUYING

  if (templateId) {
    return sendSMS({
      phone,
      message: "",
      templateId,
      variables: {
        name,
      },
    })
  }

  // Fallback to plain SMS
  const message = `Dear ${name}, your property search request has been submitted successfully! Our team will contact you soon with matching properties. - Real Estate Team`

  return sendSMS({
    phone,
    message,
  })
}

/**
 * Send SMS for Property Development form submission
 */
export async function sendPropertyDevelopmentSMS(phone: string, name: string): Promise<SMSResponse> {
  const templateId = process.env.MSG91_TEMPLATE_DEVELOPMENT

  if (templateId) {
    return sendSMS({
      phone,
      message: "",
      templateId,
      variables: {
        name,
      },
    })
  }

  // Fallback to plain SMS
  const message = `Dear ${name}, your property development request has been submitted successfully! Our team will contact you soon to discuss your project. - Real Estate Team`

  return sendSMS({
    phone,
    message,
  })
}

/**
 * Send SMS for Quick Enquiry form submission
 */
export async function sendQuickEnquirySMS(phone: string, name: string): Promise<SMSResponse> {
  const templateId = process.env.MSG91_TEMPLATE_ENQUIRY

  if (templateId) {
    return sendSMS({
      phone,
      message: "",
      templateId,
      variables: {
        name,
      },
    })
  }

  // Fallback to plain SMS
  const message = `Dear ${name}, thank you for your enquiry! Your request has been submitted successfully. Our team will contact you soon. - Real Estate Team`

  return sendSMS({
    phone,
    message,
  })
}

/**
 * Send SMS for Contact Form submission
 */
export async function sendContactFormSMS(phone: string, name: string): Promise<SMSResponse> {
  const templateId = process.env.MSG91_TEMPLATE_CONTACT

  if (templateId) {
    return sendSMS({
      phone,
      message: "",
      templateId,
      variables: {
        name,
      },
    })
  }

  // Fallback to plain SMS
  const message = `Dear ${name}, thank you for contacting us! Your message has been received successfully. We'll get back to you soon. - Real Estate Team`

  return sendSMS({
    phone,
    message,
  })
}
