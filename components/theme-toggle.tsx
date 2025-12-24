"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "@/providers/theme-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { getTranslation, isValidLocale, defaultLocale, type Locale } from "@/lib/i18n"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname() || ""
  const parts = pathname.split("/")
  const locale: Locale = (parts[1] && isValidLocale(parts[1]) ? (parts[1] as Locale) : defaultLocale)

  const lightLabel = getTranslation(locale, "themeLight")
  const darkLabel = getTranslation(locale, "themeDark")
  const systemLabel = getTranslation(locale, "themeSystem")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>{lightLabel}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>{darkLabel}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor className="mr-2 h-4 w-4" />
          <span>{systemLabel}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
