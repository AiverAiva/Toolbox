import type React from "react"
import type { Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import GoogleAnalytics from "@/components/google-analytics"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <GoogleAnalytics />
      {children}
    </html>
  )
}
