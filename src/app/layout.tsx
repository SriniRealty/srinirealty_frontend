import type React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingButtons from "@/components/floating-buttons";

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
  title: "Srini Realty - Premium Real Estate in Hyderabad | Grow Together",
  description:
    "Discover premium villas, apartments, and commercial properties in Hyderabad with Srini Realty. Growing together since 2008 with 5000+ happy families. Expert property consultation and trusted real estate services.",
  keywords:
    "real estate Hyderabad, villas Hyderabad, apartments Hyderabad, property dealers, Srini Realty, Banjara Hills properties, HITEC City real estate",
  authors: [{ name: "Srini Realty" }],
  creator: "Srini Realty",
  publisher: "Srini Realty",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://srinirealty.com",
    title: "Srini Realty - Premium Real Estate in Hyderabad",
    description:
      "Discover premium villas, apartments, and commercial properties in Hyderabad with Srini Realty. Growing together since 2008.",
    siteName: "Srini Realty",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Srini Realty Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Srini Realty - Premium Real Estate in Hyderabad",
    description:
      "Discover premium villas, apartments, and commercial properties in Hyderabad with Srini Realty. Growing together since 2008.",
    images: ["/android-chrome-512x512.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Standard favicon */}
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

        {/* Apple touch icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        {/* Android Chrome icons */}
        <link
          rel="icon"
          href="/android-chrome-192x192.png"
          sizes="192x192"
          type="image/png"
        />
        <link
          rel="icon"
          href="/android-chrome-512x512.png"
          sizes="512x512"
          type="image/png"
        />

        {/* Legacy support */}
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Web app manifest */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#7c3aed" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
