import enTranslations from "./en"

export type TranslationSchema = typeof enTranslations
export type TranslationKey = keyof TranslationSchema

export { enTranslations }
