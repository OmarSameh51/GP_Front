"use client"

import { Brain } from "lucide-react"
import { useTranslations } from "next-intl"
import type { AIPlan } from "@/types/api"

export function AIPlanSection({ aiPlan }: { aiPlan?: AIPlan }) {
  const t = useTranslations("admin")
  const plan = aiPlan?.plan ?? []

  return (
    <div className="border-border bg-card rounded-xl border p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Brain className="text-accent size-4" />
        <p className="text-muted-foreground text-xs uppercase tracking-widest">{t("aiPlanSection")}</p>
      </div>
      {plan.length === 0 ? (
        <p className="text-muted-foreground text-sm">{t("noAiPlan")}</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {plan.map((c) => (
            <div key={c.courseCode} className="border-border rounded-lg border p-3">
              <p className="text-muted-foreground font-mono text-xs">{c.courseCode}</p>
              <p className="text-foreground mt-0.5 text-sm font-medium">{c.courseName}</p>
              <p className="text-muted-foreground mt-1 font-mono text-xs">{c.creditHours} cr</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
