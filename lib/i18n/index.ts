import enTranslations from "./en"
import zhTWTranslations from "./zh-TW"
import type { TranslationKey, TranslationSchema } from "./schema"

export const translations = {
  en: enTranslations,
  "zh-TW": zhTWTranslations,
} as const

export type Locale = keyof typeof translations

export const locales: Locale[] = Object.keys(translations) as Locale[]
export const defaultLocale: Locale = "en"

export const localeNames: Record<Locale, string> = {
  en: "English (US)",
  "zh-TW": "繁體中文 (台灣)",
}

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  "zh-TW": "🇹🇼",
}

export function getTranslation(locale: Locale, key: TranslationKey): string {
  return translations[locale][key]
}

export function createTranslator(locale: Locale) {
  return (key: TranslationKey): string => getTranslation(locale, key)
}

export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return defaultLocale
  const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || "en"
  if (browserLang.startsWith("zh")) return "zh-TW"
  return "en"
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export type { TranslationSchema, TranslationKey }

export default translations
