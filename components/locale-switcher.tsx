"use client"

import { useLocale } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"

export function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function switchLocale(next: "en" | "ar") {
    router.replace(pathname, { locale: next })
  }

  return (
    <div className="flex gap-0.5">
      {(["en", "ar"] as const).map((l) => (
        <Button
          key={l}
          variant={locale === l ? "secondary" : "ghost"}
          size="sm"
          className="h-7 px-2 font-mono text-xs"
          onClick={() => switchLocale(l)}
          aria-pressed={locale === l}
        >
          {l.toUpperCase()}
        </Button>
      ))}
    </div>
  )
}
