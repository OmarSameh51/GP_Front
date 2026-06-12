"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useMutation } from "@tanstack/react-query"
import { Route } from "lucide-react"
import api from "@/lib/axios"
import type {
  AIAdviceResponse,
  GuestAdviceRequest,
  RoadmapResponse,
} from "@/types/api"
import { RoadmapTerms } from "@/app/[locale]/(app)/ai-plan/ai-plan-content/roadmap-terms"
import { GuestForm } from "./guest-form"
import { GuestResult } from "./guest-result"

export function AdviseContent() {
  const t = useTranslations("advise")
  const [submitted, setSubmitted] = useState<GuestAdviceRequest | null>(null)

  const advice = useMutation({
    mutationFn: (payload: GuestAdviceRequest) =>
      api.post<AIAdviceResponse>("/public/ai/advise", payload).then((r) => r.data),
  })

  const roadmap = useMutation({
    mutationFn: (payload: GuestAdviceRequest) =>
      api.post<RoadmapResponse>("/public/ai/roadmap", payload).then((r) => r.data),
  })

  const isPending = advice.isPending || roadmap.isPending
  const isError = advice.isError || roadmap.isError
  const error = (advice.error || roadmap.error) as Error | null

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 space-y-8">
      <div>
        <h1 className="text-foreground text-4xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">{t("subtitle")}</p>
      </div>

      <GuestForm
        isPending={isPending}
        onSubmit={(payload, fullRoadmap) => {
          setSubmitted(payload)
          advice.reset()
          roadmap.reset()
          if (fullRoadmap) {
            roadmap.mutate(payload)
          } else {
            advice.mutate(payload)
          }
        }}
      />

      {isError && (
        <div className="border-destructive/30 bg-destructive/5 text-destructive rounded-lg border p-4 text-sm">
          {error?.message || t("error")}
        </div>
      )}

      {advice.data && (
        <GuestResult data={advice.data} submittedFor={submitted} />
      )}

      {roadmap.data && (
        <section className="space-y-5">
          <div className="bg-card border-border border-s-2 border-s-accent rounded-lg border p-5">
            <div className="flex items-start gap-4">
              <Route className="text-accent mt-0.5 size-5 shrink-0" />
              <div className="space-y-1">
                <p className="text-foreground font-medium">
                  {t("roadmapTitle", {
                    terms: roadmap.data.terms.length,
                    credits: roadmap.data.totalPlannedCredits,
                  })}
                </p>
                {roadmap.data.notes && (
                  <p className="text-muted-foreground text-sm">{roadmap.data.notes}</p>
                )}
                <p className="text-muted-foreground text-xs">
                  {t("remaining", { hours: roadmap.data.remainingHoursToGraduate })}
                </p>
              </div>
            </div>
          </div>

          {roadmap.data.terms.length === 0 ? (
            <div className="border-border bg-card text-muted-foreground rounded-xl border p-8 text-center text-sm">
              {t("emptyPlan")}
            </div>
          ) : (
            <RoadmapTerms terms={roadmap.data.terms} />
          )}

          {submitted && (
            <p className="text-muted-foreground font-mono text-xs">
              {t("forContext", {
                dept: submitted.department,
                year: submitted.academicYear,
              })}
            </p>
          )}
        </section>
      )}
    </main>
  )
}
