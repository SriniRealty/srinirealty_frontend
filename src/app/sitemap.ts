import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://srinirealty.in"

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date("2024-01-15"),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/villas`,
      lastModified: new Date("2024-01-15"),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/apartments`,
      lastModified: new Date("2024-01-15"),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/independent-houses`,
      lastModified: new Date("2024-01-15"),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/open-flats`,
      lastModified: new Date("2024-01-15"),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/farms`,
      lastModified: new Date("2024-01-15"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2024-01-15"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2024-01-15"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]

  // Dynamic blog posts


  // Dynamic property pages


  return [...staticPages]
}
