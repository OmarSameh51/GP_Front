import { setRequestLocale } from "next-intl/server"
import { StudentDetailContent } from "./student-detail-content"

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ locale: string; studentId: string }>
}) {
  const { locale, studentId } = await params
  setRequestLocale(locale)
  return <StudentDetailContent studentId={studentId} />
}
