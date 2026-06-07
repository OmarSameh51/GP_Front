"use client"

import { useTranslations } from "next-intl"
import type { AIPlanCourse } from "@/types/api"

export function PlanCard({ course }: { course: AIPlanCourse }) {
  const t = useTranslations("aiPlan")
  return (
    <div className="border-border bg-card hover:border-primary/30 flex flex-col gap-3 rounded-xl border p-5 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-muted-foreground font-mono text-xs">{course.courseCode}</p>
          <h3 className="text-foreground mt-0.5 font-semibold leading-snug">{course.courseName}</h3>
        </div>
        <span className="bg-accent/15 text-amber-700 dark:text-accent rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap">
          {t("recommended")}
        </span>
      </div>
      <div className="border-border border-t pt-3">
        <span className="text-muted-foreground text-xs">{course.creditHours} cr</span>
      </div>
    </div>
  )
}
