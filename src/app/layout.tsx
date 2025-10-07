import type React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingButtons from "@/components/floating-buttons";
import GoogleAnalytics from "@/components/google-analytics";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.srinirealty.in"),
  title: {
    default:
      "Srini Realty - Premium Real Estate in Hyderabad | Villas, Apartments & Properties for Sale",
    template: "%s | Srini Realty Hyderabad",
  },
  description:
    "Discover premium villas, luxury apartments, and independent houses for sale in Hyderabad with Srini Realty. RERA approved properties in HITEC City, Gachibowli, Jubilee Hills. 5000+ happy families since 2010. Expert real estate services and trusted property dealers in Hyderabad.",
  keywords: [
    "Srini Realty",
    "real estate Hyderabad",
    "villas for sale in Hyderabad",
    "open plots for sale in Hyderabad",
    "luxury villas Hyderabad",
    "HMDA approved plots Hyderabad",
    "DTCP approved plots Hyderabad",
    "farm land for sale Hyderabad",
    "independent houses Hyderabad",
    "apartments for sale Hyderabad",
    "flats for sale Hyderabad",
    "property dealers Hyderabad",
    "property investment Hyderabad",
    "buy property Hyderabad",
    "sell property Hyderabad",
    "Gachibowli villas",
    "Jubilee Hills villas",
    "Kokapet properties",
    "Narsingi villas",
    "Financial District real estate",
    "HITEC City apartments",
    "commercial property Hyderabad",
    "residential plots Hyderabad",
    "real estate agents Hyderabad",
    "property resale Hyderabad",
    "trusted real estate Hyderabad",
    "RERA approved projects Hyderabad",
    "real estate marketing Hyderabad",
    "real estate consultation Hyderabad",
    "Srini Realty Open Plots",
    "Srini Realty Villas",
    "Srini Realty Private Limited",
    "plots near Shadnagar",
    "plots near Tukkuguda",
    "plots near Maheshwaram",
    "plots near Shamshabad",
    "best real estate company Hyderabad",
    "property buyers Hyderabad",
    "property sellers Hyderabad",
    "Hyderabad land investment",
    "Hyderabad villa projects",
    "Hyderabad gated community plots",
    "Hyderabad luxury real estate",
    "Srini Realty properties Hyderabad",
  ],
  authors: [
    { name: "Srini Realty Private Limited", url: "https://www.srinirealty.in" },
  ],
  creator: "Srini Realty",
  publisher: "Srini Realty Private Limited",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.srinirealty.in",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.srinirealty.in",
    title:
      "Srini Realty - Premium Real Estate in Hyderabad | Villas, Apartments & Properties for Sale",
    description:
      "Discover premium villas, luxury apartments, and independent houses for sale in Hyderabad. RERA approved properties in HITEC City, Gachibowli, Jubilee Hills. 5000+ happy families since 2010.",
    siteName: "Srini Realty",
  },

  verification: {
    google: "google473d5500e8dc4613.html",
  },
  category: "Real Estate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Geo Tags */}
        <meta name="geo.region" content="IN-TG" />
        <meta name="geo.placename" content="Hyderabad" />
        <meta name="geo.position" content="17.3850;78.4867" />
        <meta name="ICBM" content="17.3850, 78.4867" />

        {/* Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "Srini Realty Private Limited",
              "@id": "https://www.srinirealty.in",
              url: "https://www.srinirealty.in",
              telephone: "+917478997899",
              email: "info@srinirealty.in",
              address: {
                "@type": "PostalAddress",
                streetAddress: "PE/14, 8-7-91/16, Phase 4, Hasthinapuram South",
                addressLocality: "Hyderabad",
                addressRegion: "Telangana",
                postalCode: "500070",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 17.385,
                longitude: 78.4867,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "09:00",
                closes: "21:00",
              },
              priceRange: "₹₹₹",
              areaServed: [
                {
                  "@type": "City",
                  name: "Hyderabad",
                },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "5000",
              },
              sameAs: ["https://www.instagram.com/srini_realty/"],
            }),
          }}
        />
      </head>
      <body className="font-body antialiased">
        <GoogleAnalytics />
        <Navbar />

        <main>
          {children}
          <Toaster richColors closeButton position="top-right" />
        </main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
