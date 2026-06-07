import { setRequestLocale } from "next-intl/server"

export default async function DesignSystemPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <main className="mx-auto max-w-5xl space-y-16 px-8 py-14">
      <p className="text-foreground text-2xl font-bold">Design System</p>
    </main>
  )
}
