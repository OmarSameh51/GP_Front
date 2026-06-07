import { setRequestLocale } from "next-intl/server"
import { AdminsContent } from "./admins-content"

export default async function AdminsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <AdminsContent />
}
