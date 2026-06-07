"use client"

import { useTranslations } from "next-intl"
import { GpaRing } from "@/components/gpa-ring"

type GpaHeaderProps = {
  gpa: number
  totalCreditHours: number
  passedCount: number
  failedCount: number
}

export function GpaHeader({ gpa, totalCreditHours, passedCount, failedCount }: GpaHeaderProps) {
  const td = useTranslations("dashboard")
  const tc = useTranslations("courses")

  const stats = [
    { value: String(totalCreditHours), label: td("creditsEarned"), colorClass: "text-success" },
    { value: String(passedCount), label: tc("passed"), colorClass: "text-success" },
    { value: String(failedCount), label: tc("failed"), colorClass: "text-destructive" },
  ]

  return (
    <div className="border-border bg-card overflow-hidden rounded-xl border">
      <div className="flex flex-col items-start gap-6 p-6 sm:flex-row sm:items-center">
        <GpaRing gpa={gpa} />
        <div className="grid flex-1 grid-cols-3 divide-x">
          {stats.map(({ value, label, colorClass }) => (
            <div key={label} className="px-6">
              <p className={`font-mono text-4xl font-bold tabular-nums ${colorClass}`}>{value}</p>
              <p className="text-muted-foreground mt-1 text-xs uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
