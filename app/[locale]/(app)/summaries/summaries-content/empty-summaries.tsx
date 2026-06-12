"use client"

import { Brain } from "lucide-react"
import { useTranslations } from "next-intl"

export function EmptySummaries() {
  const t = useTranslations("summaries")
  return (
    <div className="border-border bg-card flex flex-col items-center justify-center gap-4 rounded-xl border py-16 text-center">
      <div className="bg-accent/10 rounded-full p-4">
        <Brain className="text-accent size-6" />
      </div>
      <div className="space-y-1">
        <p className="text-foreground font-medium">{t("noSummariesTitle")}</p>
        <p className="text-muted-foreground max-w-sm text-sm">{t("noSummariesDesc")}</p>
      </div>
    </div>
  )
}
