import type { Metadata } from "next"
import { type Locale, isValidLocale, translations } from "@/lib/i18n"
import { generateIndexMetadata } from "@/lib/metadata"
import { notFound } from "next/navigation"
import { ToolIndex } from "@/components/tool-index"

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return generateIndexMetadata(locale)
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const localeKey = locale as Locale

  return <ToolIndex locale={localeKey} translations={translations[localeKey]} />
}
