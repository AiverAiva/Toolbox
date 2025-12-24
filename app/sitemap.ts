import type { MetadataRoute } from "next"
import { locales } from "@/lib/i18n"
import { getEnabledTools } from "@/lib/tools-config"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://google.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getEnabledTools()
  const entries: MetadataRoute.Sitemap = []

  // Add index pages for each locale
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}`])),
      },
    })
  }

  // Add tool pages for each locale
  for (const tool of tools) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/tools/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${BASE_URL}/${l}/tools/${tool.slug}`])),
        },
      })
    }
  }

  return entries
}
