import { setRequestLocale } from "next-intl/server"
import { SummariesContent } from "./summaries-content"

export default async function SummariesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <SummariesContent />
}
