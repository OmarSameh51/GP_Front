"use client"

import { useTranslations } from "next-intl"
import { gradeToLetter } from "@/lib/grade"
import type { EnrolledCourse } from "@/types/api"

export function CoursesSection({ courses }: { courses: EnrolledCourse[] }) {
  const t = useTranslations("admin")
  const tc = useTranslations("courses")

  if (courses.length === 0) {
    return (
      <div className="border-border bg-card rounded-xl border p-6">
        <p className="text-muted-foreground text-xs uppercase tracking-widest mb-4">{t("courses")}</p>
        <p className="text-muted-foreground text-sm">{t("noCoursesSection")}</p>
      </div>
    )
  }

  return (
    <div className="border-border overflow-hidden rounded-xl border">
      <div className="border-border border-b px-5 py-3">
        <p className="text-muted-foreground text-xs uppercase tracking-widest">
          {t("coursesSection", { count: courses.length })}
        </p>
      </div>
      <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] text-sm">
        <thead className="border-border border-b">
          <tr className="text-muted-foreground text-xs uppercase tracking-widest">
            <th className="px-5 py-3 text-start font-mono font-normal">{tc("colCode")}</th>
            <th className="px-5 py-3 text-start font-normal">{tc("colName")}</th>
            <th className="px-5 py-3 text-start font-normal">{tc("colCredits")}</th>
            <th className="px-5 py-3 text-start font-normal">{tc("colGrade")}</th>
            <th className="px-5 py-3 text-start font-normal">{tc("colStatus")}</th>
          </tr>
        </thead>
        <tbody className="divide-border divide-y">
          {courses.map((c) => (
            <tr key={c._id} className="bg-card">
              <td className="text-muted-foreground px-5 py-4 font-mono text-xs">{c.courseCode}</td>
              <td className="text-foreground px-5 py-4">{c.courseName}</td>
              <td className="text-muted-foreground px-5 py-4 font-mono text-xs tabular-nums">{c.creditHours}</td>
              <td className="text-foreground px-5 py-4 font-mono text-sm tabular-nums">
                {c.grade} / {gradeToLetter(c.grade)}
              </td>
              <td className="px-5 py-4">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  c.isPassed ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
                }`}>
                  {c.isPassed ? tc("passed") : tc("failed")}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}
