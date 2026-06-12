"use client"

import { useTranslations } from "next-intl"
import { AlertTriangle } from "lucide-react"
import { PlanCard } from "./plan-card"
import type { RoadmapTerm } from "@/types/api"

export function RoadmapTerms({ terms }: { terms: RoadmapTerm[] }) {
  const t = useTranslations("aiPlan")
  const firstOverflow = terms.findIndex((term) => term.overflow)

  return (
    <div className="space-y-8">
      {terms.map((term, i) => (
        <section key={`${term.academicYear}-${term.semester}-${i}`} className="space-y-3">
          {i === firstOverflow && (
            <div className="border-accent/40 bg-accent/10 flex items-center gap-2 rounded-lg border border-dashed p-3 text-sm">
              <AlertTriangle className="text-accent size-4 shrink-0" />
              <span className="text-foreground">{t("overflowDivider")}</span>
            </div>
          )}
          <div className="flex flex-wrap items-baseline gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                term.overflow
                  ? "bg-accent/15 text-amber-700 dark:text-accent"
                  : "bg-primary/10 text-primary"
              }`}
            >
              {i + 1}
            </span>
            <h2 className="text-foreground font-semibold">
              {t("termTitle", { year: term.academicYear, semester: term.semester })}
            </h2>
            <span className="text-muted-foreground text-xs">
              {t("termCredits", { credits: term.credits })}
            </span>
            {term.overflow && (
              <span className="bg-accent/15 text-amber-700 dark:text-accent rounded-full px-2 py-0.5 text-xs font-medium">
                {t("overflowBadge")}
              </span>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {term.courses.map((c) => (
              <PlanCard key={c.courseCode} course={c} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
