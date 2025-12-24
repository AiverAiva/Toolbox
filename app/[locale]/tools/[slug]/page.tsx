import type { Metadata } from "next"
import { type Locale, locales, isValidLocale, translations } from "@/lib/i18n"
import { generateToolMetadata } from "@/lib/metadata"
import { getToolBySlug, getEnabledTools } from "@/lib/tools-config"
import { notFound } from "next/navigation"
import { ToolPage } from "@/components/tool-page"

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const tools = getEnabledTools()
  const params = []

  for (const locale of locales) {
    for (const tool of tools) {
      params.push({ locale, slug: tool.slug })
    }
  }

  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isValidLocale(locale)) return {}
  return generateToolMetadata(locale, slug)
}

export default async function ToolRoute({ params }: PageProps) {
  const { locale, slug } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const tool = getToolBySlug(slug)
  if (!tool || !tool.enabled) {
    notFound()
  }

  const localeKey = locale as Locale

  return <ToolPage locale={localeKey} tool={tool} translations={translations[localeKey]} />
}
