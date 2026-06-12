import { setRequestLocale } from "next-intl/server"
import { UpdatesContent } from "./updates-content"

export default async function UpdatesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <UpdatesContent />
}
