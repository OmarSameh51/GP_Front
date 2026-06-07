import { setRequestLocale } from "next-intl/server"
import { StudentsContent } from "./students-content"

export default async function StudentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <StudentsContent />
}
