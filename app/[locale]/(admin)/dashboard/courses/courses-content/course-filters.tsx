"use client"

import { useTranslations } from "next-intl"

type FilterValue = "all" | "active" | "inactive" | "sem1" | "sem2"

export function CourseFilters({
  active,
  onChange,
}: {
  active: FilterValue
  onChange: (v: FilterValue) => void
}) {
  const t = useTranslations("admin")

  const filters: { label: string; value: FilterValue }[] = [
    { label: t("all"), value: "all" },
    { label: t("active"), value: "active" },
    { label: t("inactive"), value: "inactive" },
    { label: t("semester1"), value: "sem1" },
    { label: t("semester2"), value: "sem2" },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
            active === value
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export type { FilterValue }
