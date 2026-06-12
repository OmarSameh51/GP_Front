"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { useProfile } from "@/hooks/use-profile"
import { PageSkeleton } from "@/components/page-skeleton"
import { ErrorState } from "@/components/error-state"
import { PlanHeader } from "./plan-header"
import { PlanCard } from "./plan-card"
import { EmptyPlan } from "./empty-plan"
import { RoadmapTerms } from "./roadmap-terms"
import { useGenerateRoadmap } from "@/hooks/use-generate-roadmap"

export function AIPlanContent() {
  const t = useTranslations("aiPlan")
  const [activeTab, setActiveTab] = useState<"plan" | "roadmap">("plan")
  const { data: profile, isLoading, isError, refetch } = useProfile()
  const roadmap = useGenerateRoadmap()
  const hasRoadmap = !!roadmap.data && roadmap.data.terms.length > 0

  useEffect(() => {
    if (hasRoadmap) setActiveTab("roadmap")
  }, [hasRoadmap])

  if (isLoading) return <PageSkeleton />
  if (isError || !profile) return <ErrorState onRetry={refetch} />

  const plan = profile.AI_plan?.plan ?? []
  const totalCredits = plan.reduce((sum, c) => sum + c.creditHours, 0)
  const updatedAt = profile.AI_plan?.updatedAt

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest mb-1">
            {profile.studentId}
          </p>
          <h1 className="text-foreground text-4xl font-bold tracking-tight">{t("title")}</h1>
          {plan.length > 0 && (
            <p className="text-muted-foreground mt-1 text-sm">
              {t("subtitle", { count: plan.length, plural: plan.length !== 1 ? "s" : "", credits: totalCredits })}
            </p>
          )}
        </div>
        {updatedAt && (
          <p className="text-muted-foreground font-mono text-xs">
            {t("lastUpdated", { date: new Date(updatedAt).toLocaleDateString() })}
          </p>
        )}
      </div>

      <PlanHeader roadmap={roadmap} />

      {hasRoadmap && (
        <div className="border-border bg-background flex rounded-lg border p-0.5">
          {["plan", "roadmap"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "plan" | "roadmap")}
              className={`flex-1 rounded px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "plan" ? t("semesterPlan") : t("fullRoadmap")}
            </button>
          ))}
        </div>
      )}

      {activeTab === "plan" ? (
        <>
          {plan.length === 0 ? (
            <EmptyPlan />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {plan.map((course) => (
                <PlanCard key={course.courseCode} course={course} />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {roadmap.data && (
            <div className="space-y-4">
              <div className="bg-muted/40 border-border rounded-lg border p-4">
                <p className="text-foreground text-sm font-medium">
                  {t("roadmapSummary", {
                    terms: roadmap.data.terms.length,
                    credits: roadmap.data.totalPlannedCredits,
                  })}
                </p>
                {roadmap.data.notes && (
                  <p className="text-muted-foreground mt-1 text-sm">{roadmap.data.notes}</p>
                )}
              </div>
              <RoadmapTerms terms={roadmap.data.terms} />
            </div>
          )}
        </>
      )}
    </main>
  )
}
