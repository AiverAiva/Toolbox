import { redirect } from "next/navigation"
import { headers } from "next/headers"

export default async function RootPage() {
  // Server-side locale detection from Accept-Language header
  const headersList = await headers()
  const acceptLanguage = headersList.get("accept-language") || ""

  let locale = "en"
  if (acceptLanguage.includes("zh")) {
    locale = "zh-TW"
  }

  redirect(`/${locale}`)
}
