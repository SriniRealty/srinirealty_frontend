"use client"

import Script from "next/script"
import { pageview, GA_MEASUREMENT_ID } from "@/lib/google-analytics"

export default function GoogleAnalytics() {

  // Track page views on route change
 

  // Don't render if GA_MEASUREMENT_ID is not set
  if (!GA_MEASUREMENT_ID) {
    console.warn("Google Analytics Measurement ID is not set. Analytics will not be tracked.")
    return null
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  )
}
