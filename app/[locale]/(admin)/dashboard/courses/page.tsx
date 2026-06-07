import { setRequestLocale } from "next-intl/server"
import { AdminCoursesContent } from "./courses-content"

export default async function AdminCoursesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <AdminCoursesContent />
}
