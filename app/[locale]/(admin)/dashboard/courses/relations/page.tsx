import { setRequestLocale } from "next-intl/server"
import { RelationsContent } from "./relations-content"

export default async function RelationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <RelationsContent />
}
