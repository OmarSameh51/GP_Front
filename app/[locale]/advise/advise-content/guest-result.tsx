"use client"

import { Brain } from "lucide-react"
import { useTranslations } from "next-intl"
import { PlanCard } from "@/app/[locale]/(app)/ai-plan/ai-plan-content/plan-card"
import type { AIAdviceResponse, GuestAdviceRequest } from "@/types/api"

type Props = {
  data: AIAdviceResponse
  submittedFor: GuestAdviceRequest | null
}

export function GuestResult({ data, submittedFor }: Props) {
  const t = useTranslations("advise")

  return (
    <section className="space-y-5">
      <div className="bg-card border-border border-s-2 border-s-accent rounded-lg border p-5">
        <div className="flex items-start gap-4">
          <Brain className="text-accent mt-0.5 size-5 shrink-0" />
          <div className="space-y-1">
            <p className="text-foreground font-medium">
              {t("resultTitle", {
                count: data.plan.length,
                credits: data.totalSuggestedCredits,
              })}
            </p>
            {data.notes && (
              <p className="text-muted-foreground text-sm">{data.notes}</p>
            )}
            <p className="text-muted-foreground text-xs">
              {t("remaining", { hours: data.remainingHoursToGraduate })}
            </p>
          </div>
        </div>
      </div>

      {data.plan.length === 0 ? (
        <div className="border-border bg-card rounded-xl border p-8 text-center text-sm text-muted-foreground">
          {t("emptyPlan")}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.plan.map((c) => (
            <PlanCard key={c.courseCode} course={c} />
          ))}
        </div>
      )}

      {submittedFor && (
        <p className="text-muted-foreground font-mono text-xs">
          {t("forContext", {
            dept: submittedFor.department,
            year: submittedFor.academicYear,
          })}
        </p>
      )}
    </section>
  )
}
