"use client"

import { useTranslations } from "next-intl"
import { GpaRing } from "@/components/gpa-ring"
import type { UserProfile } from "@/types/api"

export function StudentProfileHeader({ student }: { student: UserProfile }) {
  const t = useTranslations("admin")
  const td = useTranslations("dashboard")
  const tCommon = useTranslations("common")

  const fields = [
    { label: t("colDept"), value: student.department },
    { label: t("colDept") + " (pref.)", value: student.preferredDepartment },
    { label: t("colYear"), value: tCommon("year", { n: student.academicYear }) },
    { label: t("credits"), value: String(student.totalCreditHours) },
  ]

  return (
    <div className="border-border bg-card rounded-xl border p-6 space-y-4">
      <div className="flex items-start gap-6">
        <GpaRing gpa={student.gpa ?? 0} />
        <div className="flex-1">
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
            {student.studentId}
          </p>
          <h2 className="text-foreground mt-1 text-2xl font-bold">
            {student.firstName} {student.lastName}
          </h2>
          <p className="text-muted-foreground text-sm">{student.email}</p>
        </div>
      </div>

      <div className="border-border grid grid-cols-2 gap-4 border-t pt-4 sm:grid-cols-4">
        {fields.map(({ label, value }) => (
          <div key={label}>
            <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">{label}</p>
            <p className="text-foreground mt-1 font-mono text-sm">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
