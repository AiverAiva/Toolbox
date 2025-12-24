"use client"

import Link from "next/link"
import type { Locale, TranslationKey } from "@/lib/i18n"
import type { ToolConfig } from "@/lib/tools-config"
import { ThemeToggle } from "./theme-toggle"
import { LanguageToggle } from "./language-toggle"
import { LevelTool } from "./tools/level-tool"

interface ToolPageProps {
  locale: Locale
  tool: ToolConfig
  translations: Record<TranslationKey, string>
}

export function ToolPage({ locale, tool, translations }: ToolPageProps) {
  const t = (key: TranslationKey) => translations[key]
  // Render tool based on slug
  const renderTool = () => {
    switch (tool.slug) {
      case "level":
        return <LevelTool t={t} locale={locale} />
      default:
        return <div className="p-8 text-center text-muted-foreground">Tool not implemented</div>
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}`}
              className="p-2 -ml-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label={t("back")}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-foreground">{t(tool.nameKey as TranslationKey)}</h1>
              <p className="text-xs text-muted-foreground">{t(tool.descriptionKey as TranslationKey)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle locale={locale} currentPath={`/tools/${tool.slug}`} />
          </div>
        </div>
      </header>

      {/* Tool Content */}
      <main className="flex-1 flex flex-col">{renderTool()}</main>

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
