// Google Analytics Configuration and Helper Functions

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""

// Check if GA is enabled
export const isGAEnabled = (): boolean => {
  return !!GA_MEASUREMENT_ID && typeof window !== "undefined"
}

// Initialize Google Analytics
export const pageview = (url: string): void => {
  if (!isGAEnabled()) return

  try {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    })
  } catch (error) {
    console.error("GA pageview error:", error)
  }
}

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}): void => {
  if (!isGAEnabled()) return

  try {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  } catch (error) {
    console.error("GA event error:", error)
  }
}

// Track property views
export const trackPropertyView = (propertyId: string, propertyType: string): void => {
  event({
    action: "view_property",
    category: "Property",
    label: `${propertyType} - ${propertyId}`,
  })
}

// Track form submissions
export const trackFormSubmission = (formType: string): void => {
  event({
    action: "form_submission",
    category: "Engagement",
    label: formType,
  })
}

// Track phone clicks
export const trackPhoneClick = (): void => {
  event({
    action: "click_phone",
    category: "Contact",
    label: "Phone Number",
  })
}

// Track WhatsApp clicks
export const trackWhatsAppClick = (): void => {
  event({
    action: "click_whatsapp",
    category: "Contact",
    label: "WhatsApp",
  })
}

// Track email clicks
export const trackEmailClick = (): void => {
  event({
    action: "click_email",
    category: "Contact",
    label: "Email",
  })
}

// Track enquiry form opens
export const trackEnquiryFormOpen = (propertyId?: string): void => {
  event({
    action: "open_enquiry_form",
    category: "Engagement",
    label: propertyId || "General",
  })
}

// Track filter usage
export const trackFilterUsage = (filterType: string, filterValue: string): void => {
  event({
    action: "use_filter",
    category: "Search",
    label: `${filterType}: ${filterValue}`,
  })
}

// Type definitions for window.gtag
declare global {
  interface Window {
    gtag: (command: "config" | "event" | "js", targetId: string | Date, config?: Record<string, any>) => void
    dataLayer: any[]
  }
}
