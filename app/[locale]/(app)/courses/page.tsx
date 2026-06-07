import { setRequestLocale } from "next-intl/server"
import { CoursesContent } from "./courses-content"

export default async function CoursesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <CoursesContent />
}
