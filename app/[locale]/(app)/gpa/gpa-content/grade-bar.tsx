"use client"

import { useTranslations } from "next-intl"
import type { EnrolledCourse } from "@/types/api"

type Bucket = { key: string; colorClass: string; min: number; max: number }

const buckets: Bucket[] = [
  { key: "aRange", colorClass: "bg-success", min: 85, max: 100 },
  { key: "bRange", colorClass: "bg-info", min: 75, max: 84 },
  { key: "cRange", colorClass: "bg-warning", min: 65, max: 74 },
  { key: "dRange", colorClass: "bg-accent", min: 50, max: 64 },
  { key: "fRange", colorClass: "bg-destructive", min: 0, max: 49 },
]

export function GradeBar({ courses }: { courses: EnrolledCourse[] }) {
  const t = useTranslations("gpa")
  const total = courses.length || 1

  const counts = buckets.map((b) => ({
    ...b,
    label: t(b.key as "aRange"),
    count: courses.filter((c) => c.grade >= b.min && c.grade <= b.max).length,
  }))

  return (
    <div className="border-border bg-card rounded-xl border p-5 space-y-3">
      <p className="text-muted-foreground text-xs uppercase tracking-widest">{t("distribution")}</p>
      <div className="space-y-2">
        {counts.map(({ label, colorClass, count }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="text-muted-foreground w-16 text-xs">{label}</span>
            <div className="flex-1 overflow-hidden rounded-full bg-muted h-2">
              <div
                className={`h-2 rounded-full ${colorClass} transition-all duration-500`}
                style={{ width: `${(count / total) * 100}%` }}
              />
            </div>
            <span className="text-muted-foreground w-4 text-end font-mono text-xs tabular-nums">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
