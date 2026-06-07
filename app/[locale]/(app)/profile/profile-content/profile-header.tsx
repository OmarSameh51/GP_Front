"use client"

import { useTranslations } from "next-intl"
import type { UserProfile } from "@/types/api"

export function ProfileHeader({ profile }: { profile: UserProfile }) {
  const t = useTranslations("profile")

  const fields = [
    { label: t("studentId"), value: profile.studentId, mono: true },
    { label: t("username"), value: profile.username, mono: true },
    { label: t("year"), value: t("yearValue", { year: profile.academicYear }), mono: true },
    { label: t("role"), value: profile.role, capitalize: true },
  ]

  return (
    <div className="border-border bg-card rounded-xl border p-6 space-y-4">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full text-lg font-bold">
          {profile.firstName[0]}{profile.lastName[0]}
        </div>
        <div>
          <h2 className="text-foreground text-xl font-semibold">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="text-muted-foreground text-sm">{profile.email}</p>
        </div>
      </div>
      <div className="border-border grid grid-cols-2 gap-4 border-t pt-4 sm:grid-cols-4">
        {fields.map(({ label, value, mono, capitalize }) => (
          <div key={label}>
            <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
              {label}
            </p>
            <p className={`text-foreground mt-1 text-sm ${mono ? "font-mono" : ""} ${capitalize ? "capitalize" : ""}`}>
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
