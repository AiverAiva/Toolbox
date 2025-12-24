"use client"
import { useDeviceCapabilities } from "@/hooks/use-device-capabilities"
import { getEnabledTools } from "@/lib/tools-config"
import type { Locale, TranslationKey } from "@/lib/i18n"
import { ToolCard } from "./tool-card"
import { ThemeToggle } from "./theme-toggle"
import { LanguageToggle } from "./language-toggle"

interface ToolIndexProps {
  locale: Locale
  translations: Record<TranslationKey, string>
}

export function ToolIndex({ locale, translations }: ToolIndexProps) {
  const t = (key: TranslationKey) => translations[key]
  const { isCapabilityAvailable, isChecking } = useDeviceCapabilities()
  const tools = getEnabledTools()

  if (isChecking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto w-full">
          <div>
            <h1 className="text-xl font-bold text-foreground">{t("siteName")}</h1>
            <p className="text-sm text-muted-foreground">{t("siteTagline")}</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle locale={locale} currentPath="" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-12 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-4">{t("indexHeroTitle")}</h2>
        <p className="text-lg text-muted-foreground mb-8">{t("indexHeroSubtitle")}</p>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="p-4">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-secondary flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <p className="text-xs font-medium">{t("indexFeature1")}</p>
            <p className="text-[10px] text-muted-foreground">{t("indexFeature1Desc")}</p>
          </div>
          <div className="p-4">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-secondary flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <p className="text-xs font-medium">{t("indexFeature2")}</p>
            <p className="text-[10px] text-muted-foreground">{t("indexFeature2Desc")}</p>
          </div>
          <div className="p-4">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-secondary flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </div>
            <p className="text-xs font-medium">{t("indexFeature3")}</p>
            <p className="text-[10px] text-muted-foreground">{t("indexFeature3Desc")}</p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <main className="flex-1 px-4 pb-8 max-w-4xl mx-auto w-full">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">{t("toolbox")}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {tools.map((tool) => {
            const isAvailable = isCapabilityAvailable(tool.requiredCapabilities)
            return <ToolCard key={tool.slug} tool={tool} locale={locale} isAvailable={isAvailable} t={t} />
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto pt-8 pb-6 border-t border-border/40">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>{t("footerMadeBy")}</span>
          <a
            href="https://weikuwu.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-foreground underline decoration-foreground/20 hover:decoration-foreground/40 underline-offset-4 transition-colors duration-200"
          >
            AiverAiva
          </a>
          <span>{t("footerDeployed")}</span>
          <span className="text-muted-foreground/50">·</span>
          <a
            href="https://github.com/AiverAiva/Toolbox/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-foreground underline decoration-foreground/20 hover:decoration-foreground/40 underline-offset-4 transition-colors duration-200"
          >
            {t("footerSourceCode")}
          </a>
        </div>
      </footer>
    </div>
  )
}
