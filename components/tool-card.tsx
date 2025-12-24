"use client"

import Link from "next/link"
import { ToolIcon } from "./tool-icon"
import type { ToolConfig } from "@/lib/tools-config"
import type { Locale, TranslationKey } from "@/lib/i18n"

interface ToolCardProps {
  tool: ToolConfig
  locale: Locale
  isAvailable: boolean
  t: (key: TranslationKey) => string
}

export function ToolCard({ tool, locale, isAvailable, t }: ToolCardProps) {
  const content = (
    <>
      <div
        className={`
        p-4 rounded-xl
        ${isAvailable ? "bg-secondary text-foreground" : "bg-muted text-muted-foreground"}
      `}
      >
        <ToolIcon icon={tool.icon} className="w-8 h-8" />
      </div>

      <div className="text-center">
        <h3 className={`font-semibold ${isAvailable ? "text-foreground" : "text-muted-foreground"}`}>
          {t(tool.nameKey as TranslationKey)}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
          {isAvailable ? t(tool.descriptionKey as TranslationKey) : t(tool.unavailableKey as TranslationKey)}
        </p>
      </div>

      {!isAvailable && (
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-destructive/20 text-destructive-foreground">
            {t("unavailable")}
          </span>
        </div>
      )}
    </>
  )

  const baseClassName = `
    relative flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all
    ${
      isAvailable
        ? "bg-card border-border hover:border-foreground/20 hover:bg-secondary/30 active:scale-[0.98]"
        : "bg-muted/30 border-border/50 cursor-not-allowed opacity-60"
    }
  `

  if (isAvailable) {
    return (
      <Link href={`/${locale}/tools/${tool.slug}`} className={baseClassName}>
        {content}
      </Link>
    )
  }

  return <div className={baseClassName}>{content}</div>
}
