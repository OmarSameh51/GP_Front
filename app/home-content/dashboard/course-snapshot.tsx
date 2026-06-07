"use client"

import { useTranslations } from "next-intl"
import type { EnrolledCourse } from "@/types/api"
import { gradeToLetter } from "@/lib/grade"

export function CourseSnapshot({ courses }: { courses: EnrolledCourse[] }) {
  const t = useTranslations("dashboard")
  const tc = useTranslations("courses")
  const recent = courses.slice(-3).reverse()

  if (recent.length === 0) return null

  return (
    <div className="border-border bg-card overflow-hidden rounded-xl border">
      <div className="border-border border-b px-5 py-3">
        <p className="text-muted-foreground text-xs uppercase tracking-widest">{t("recentCourses")}</p>
      </div>
      <div className="divide-border divide-y">
        {recent.map((c) => (
          <div key={c._id} className="flex items-center justify-between px-5 py-3">
            <div>
              <p className="text-muted-foreground font-mono text-xs">{c.courseCode}</p>
              <p className="text-foreground text-sm font-medium">{c.courseName}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground font-mono text-xs tabular-nums">
                {c.grade} / {gradeToLetter(c.grade)}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  c.isPassed ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
                }`}
              >
                {c.isPassed ? tc("passed") : tc("failed")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
