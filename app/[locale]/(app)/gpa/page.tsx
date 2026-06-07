import { setRequestLocale } from "next-intl/server"
import { GPAContent } from "./gpa-content"

export default async function GPAPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <GPAContent />
}
