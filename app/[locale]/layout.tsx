import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/providers/theme-provider"
import { locales, isValidLocale } from "@/lib/i18n"
import { notFound } from "next/navigation"
import { Analytics } from "@vercel/analytics/next"

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider defaultTheme="system" storageKey="toolbox-theme">
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
