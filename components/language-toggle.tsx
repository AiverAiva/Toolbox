"use client"

import Link from "next/link"
import { type Locale, locales, localeNames, localeFlags } from "@/lib/i18n"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface LanguageToggleProps {
  locale: Locale
  currentPath: string
}

export function LanguageToggle({ locale, currentPath }: LanguageToggleProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 font-semibold text-base">
          <span className="flex items-center">
            <span className="text-xs">文</span>
            <span className="text-[10px]">A</span>
          </span>
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((l) => (
          <DropdownMenuItem key={l} asChild>
            <Link href={`/${l}${currentPath}`} className="flex items-center gap-2 cursor-pointer">
              <span>{localeFlags[l]}</span>
              <span>{localeNames[l]}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
