import { setRequestLocale } from "next-intl/server"
import { AIPlanContent } from "./ai-plan-content"

export default async function AIPlanPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <AIPlanContent />
}
