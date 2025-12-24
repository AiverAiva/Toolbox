export type Locale = "en" | "zh-TW"

export const locales: Locale[] = ["en", "zh-TW"]
export const defaultLocale: Locale = "en"

export const localeNames: Record<Locale, string> = {
  en: "English (US)",
  "zh-TW": "繁體中文 (台灣)",
}

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  "zh-TW": "🇹🇼",
}

export const translations = {
  en: {
    // Site
    siteName: "Online Toolbox",
    siteDescription: "Free browser-based utilities. Simple, fast, no installation required.",
    siteTagline: "Web utilities that work anywhere",

    // Navigation
    toolbox: "Tools",
    back: "Back",
    allTools: "All Tools",

    // Common
    language: "Language",
    unavailable: "Unavailable",
    requestPermission: "Request Permission",
    permissionDenied: "Permission Denied",
    permissionRequired: "This tool requires device sensor access",

    // Level Tool
    level: "Level",
    levelTitle: "Online Level Tool",
    levelDescription: "Use your phone as a spirit level",
    levelMetaTitle: "Online Level Tool – Use Your Phone as a Spirit Level",
    levelMetaDescription:
      "Free online spirit level using your device's gyroscope. Accurate, instant, no app installation needed.",
    levelHorizontal: "Horizontal",
    levelVertical: "Vertical",
    levelUnavailable: "Gyroscope not available",
    levelHelper: "Place your device on a surface to measure tilt",
    levelPerfect: "Level!",
    calibrate: "Calibrate All",
    calibrateAll: "Calibrate All",
    calibrateHorizontal: "Calibrate Horizontal",
    calibrateVertical: "Calibrate Vertical",
    calibrated: "Calibrated!",
    calibratedAll: "All Calibrated!",
    calibratedHorizontal: "Horizontal Calibrated!",
    calibratedVertical: "Vertical Calibrated!",

    // Compass Tool (placeholder)
    compass: "Compass",
    compassDescription: "Digital compass using magnetometer",
    compassUnavailable: "Magnetometer not available",

    // Sound Meter (placeholder)
    soundMeter: "Sound Meter",
    soundMeterDescription: "Measure ambient sound levels",
    soundMeterUnavailable: "Microphone not available",

    // Flashlight (placeholder)
    flashlight: "Flashlight",
    flashlightDescription: "Toggle device flashlight",
    flashlightUnavailable: "Flashlight not available",

    // Footer
    footerMadeBy: "Made and debloyed by",
    footerDeployed: "with <3",
    footerSourceCode: "GitHub",

    // Index page
    indexHeroTitle: "Online Toolbox",
    indexHeroSubtitle: "Free browser-based utilities that work on any device",
    indexFeature1: "No Installation",
    indexFeature1Desc: "Works instantly in your browser",
    indexFeature2: "Privacy First",
    indexFeature2Desc: "All processing happens on your device",
    indexFeature3: "Cross Platform",
    indexFeature3Desc: "Works on mobile, tablet, and desktop",
  },
  "zh-TW": {
    // Site
    siteName: "線上工具箱",
    siteDescription: "免費的瀏覽器工具。簡單、快速、無需安裝。",
    siteTagline: "隨處可用的網頁工具",

    // Navigation
    toolbox: "工具",
    back: "返回",
    allTools: "所有工具",

    // Common
    language: "語言",
    unavailable: "不可用",
    requestPermission: "請求權限",
    permissionDenied: "權限被拒絕",
    permissionRequired: "此工具需要裝置感應器存取權限",

    // Level Tool
    level: "水平儀",
    levelTitle: "線上水平尺工具",
    levelDescription: "使用手機陀螺儀的水平儀",
    levelMetaTitle: "線上水平尺工具｜使用手機陀螺儀的水平儀",
    levelMetaDescription: "免費線上水平儀，使用裝置陀螺儀。精準、即時、無需安裝應用程式。",
    levelHorizontal: "水平",
    levelVertical: "垂直",
    levelUnavailable: "陀螺儀不可用",
    levelHelper: "將裝置放在表面上以測量傾斜度",
    levelPerfect: "水平！",
    calibrate: "全部校準",
    calibrateAll: "全部校準",
    calibrateHorizontal: "校準水平",
    calibrateVertical: "校準垂直",
    calibrated: "已校準！",
    calibratedAll: "已全部校準！",
    calibratedHorizontal: "已校準水平！",
    calibratedVertical: "已校準垂直！",

    // Compass Tool (placeholder)
    compass: "指南針",
    compassDescription: "使用磁力計的數位指南針",
    compassUnavailable: "磁力計不可用",

    // Sound Meter (placeholder)
    soundMeter: "聲音計",
    soundMeterDescription: "測量環境聲音等級",
    soundMeterUnavailable: "麥克風不可用",

    // Flashlight (placeholder)
    flashlight: "手電筒",
    flashlightDescription: "切換裝置手電筒",
    flashlightUnavailable: "手電筒不可用",

    // Footer
    footerMadeBy: "由",
    footerDeployed: "製作與部屬",
    footerSourceCode: "GitHub",

    // Index page
    indexHeroTitle: "線上工具箱",
    indexHeroSubtitle: "免費的瀏覽器工具，適用於任何裝置",
    indexFeature1: "無需安裝",
    indexFeature1Desc: "在瀏覽器中即時運作",
    indexFeature2: "隱私優先",
    indexFeature2Desc: "所有處理都在您的裝置上進行",
    indexFeature3: "跨平台",
    indexFeature3Desc: "適用於手機、平板和桌機",
  },
} as const

export type TranslationKey = keyof typeof translations.en

export function getTranslation(locale: Locale, key: TranslationKey): string {
  return translations[locale][key]
}

export function createTranslator(locale: Locale) {
  return (key: TranslationKey): string => getTranslation(locale, key)
}

export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return defaultLocale
  const browserLang = navigator.language || navigator.languages?.[0] || "en"
  if (browserLang.startsWith("zh")) return "zh-TW"
  return "en"
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}
