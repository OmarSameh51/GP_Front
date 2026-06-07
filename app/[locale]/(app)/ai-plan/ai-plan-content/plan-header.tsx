"use client"

import { Brain } from "lucide-react"
import { useTranslations } from "next-intl"

export function PlanHeader() {
  const t = useTranslations("aiPlan")
  return (
    <div className="bg-card border-border border-s-2 border-s-accent rounded-lg border p-5">
      <div className="flex items-start gap-4">
        <Brain className="text-accent mt-0.5 size-5 shrink-0" />
        <div>
          <p className="text-foreground font-medium">{t("headerTitle")}</p>
          <p className="text-muted-foreground mt-1 text-sm">{t("headerDesc")}</p>
        </div>
      </div>
    </div>
  )
}
