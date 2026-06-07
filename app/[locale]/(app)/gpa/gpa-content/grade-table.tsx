"use client"

import { useTranslations } from "next-intl"
import type { EnrolledCourse } from "@/types/api"
import { gradeToLetter } from "@/lib/grade"

export function GradeTable({ courses }: { courses: EnrolledCourse[] }) {
  const t = useTranslations("gpa")
  const tc = useTranslations("courses")

  return (
    <div className="border-border overflow-hidden rounded-xl border">
      <table className="w-full text-sm">
        <thead className="border-border border-b">
          <tr className="text-muted-foreground text-xs uppercase tracking-widest">
            <th className="px-5 py-3 text-start font-mono font-normal">{t("colCode")}</th>
            <th className="px-5 py-3 text-start font-normal">{t("colCourse")}</th>
            <th className="px-5 py-3 text-start font-normal">{t("colCredits")}</th>
            <th className="px-5 py-3 text-start font-normal">{t("colGrade")}</th>
            <th className="px-5 py-3 text-start font-normal">{t("colLetter")}</th>
            <th className="px-5 py-3 text-start font-normal">{t("colPoints")}</th>
            <th className="px-5 py-3 text-start font-normal">{t("colStatus")}</th>
          </tr>
        </thead>
        <tbody className="divide-border divide-y">
          {courses.map((c) => (
            <tr key={c._id} className="bg-card hover:bg-muted/30 transition-colors">
              <td className="text-muted-foreground px-5 py-4 font-mono text-xs">{c.courseCode}</td>
              <td className="text-foreground px-5 py-4 font-medium">{c.courseName}</td>
              <td className="text-muted-foreground px-5 py-4 font-mono text-xs tabular-nums">{c.creditHours}</td>
              <td className="text-foreground px-5 py-4 font-mono text-sm tabular-nums">{c.grade}</td>
              <td className="text-foreground px-5 py-4 font-mono text-sm">{gradeToLetter(c.grade)}</td>
              <td className="text-foreground px-5 py-4 font-mono text-sm tabular-nums">{c.gradePoints.toFixed(2)}</td>
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
  )
}
