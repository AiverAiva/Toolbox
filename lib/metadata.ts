import type { Metadata } from "next"
import { type Locale, locales, getTranslation } from "./i18n"
import { getToolBySlug } from "./tools-config"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://toolbox.example.com"

export function generateLocaleAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {}
  for (const locale of locales) {
    alternates[locale] = `${BASE_URL}/${locale}${path}`
  }
  return alternates
}

export function generateIndexMetadata(locale: Locale): Metadata {
  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(locale, key)

  return {
    title: t("siteName"),
    description: t("siteDescription"),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: generateLocaleAlternates(""),
    },
    openGraph: {
      title: t("siteName"),
      description: t("siteDescription"),
      locale: locale === "zh-TW" ? "zh_TW" : "en_US",
      type: "website",
    },
  }
}

export function generateToolMetadata(locale: Locale, slug: string): Metadata {
  const tool = getToolBySlug(slug)
  if (!tool) {
    return {
      title: "Tool Not Found",
    }
  }

  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(locale, key)
  const title = t(tool.metaTitleKey as Parameters<typeof getTranslation>[1])
  const description = t(tool.metaDescriptionKey as Parameters<typeof getTranslation>[1])

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools/${slug}`,
      languages: generateLocaleAlternates(`/tools/${slug}`),
    },
    openGraph: {
      title,
      description,
      locale: locale === "zh-TW" ? "zh_TW" : "en_US",
      type: "website",
    },
  }
}
