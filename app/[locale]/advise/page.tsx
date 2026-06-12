import { setRequestLocale } from "next-intl/server"
import { AdviseContent } from "./advise-content"

export default async function AdvisePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <AdviseContent />
}
