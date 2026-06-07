"use client"

import { useTranslations } from "next-intl"
import { SEMESTERS, semStyle } from "../data"

export function PlannerPreview() {
  const t = useTranslations("home")

  return (
    <div className="space-y-2 rounded-xl border border-border bg-background p-4">
      {SEMESTERS.map((sem) => {
        const s = semStyle[sem.status]
        const w = sem.status === "done" ? "100%" : sem.status === "active" ? "50%" : "0%"
        return (
          <div key={sem.num} className="flex items-center gap-3">
            <span className={`size-2 shrink-0 rounded-full ${s.dot}`} />
            <span className="w-20 shrink-0 text-xs font-medium text-foreground">
              {t("semLabel", { n: sem.num })}
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              <div className={`h-full rounded-full ${s.bar}`} style={{ width: w }} />
            </div>
            <span className={`w-14 text-end font-mono text-[10px] ${sem.gpa ? "text-success" : "text-muted-foreground"}`}>
              {sem.gpa ? `GPA ${sem.gpa}` : "—"}
            </span>
          </div>
        )
      })}
      <div className="flex justify-between border-t border-border pt-2 text-[10px] text-muted-foreground">
        <span>{t("plannerCredits")}</span>
        <span className="font-medium text-primary">{t("plannerGraduation")}</span>
      </div>
    </div>
  )
}
