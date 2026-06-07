"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRemovePrerequisite } from "@/hooks/use-course-relations"
import type { Course } from "@/types/api"

export function PrerequisiteList({
  courseCode,
  prerequisites,
}: {
  courseCode: string
  prerequisites: Course[]
}) {
  const t = useTranslations("admin")
  const { mutate: remove, isPending } = useRemovePrerequisite(courseCode)
  const [confirmCode, setConfirmCode] = useState<string | null>(null)

  if (prerequisites.length === 0) {
    return <p className="text-muted-foreground text-sm">{t("noPrerequisites")}</p>
  }

  return (
    <div className="space-y-2">
      {prerequisites.map((c) => (
        <div
          key={c.Code}
          className="border-border flex items-center justify-between rounded-lg border px-4 py-3"
        >
          <div>
            <p className="text-muted-foreground font-mono text-xs">{c.Code}</p>
            <p className="text-foreground text-sm font-medium">{c.name}</p>
          </div>
          <button
            onClick={() => {
              if (confirmCode === c.Code) {
                remove(c.Code, { onSuccess: () => setConfirmCode(null) })
              } else {
                setConfirmCode(c.Code)
                setTimeout(() => setConfirmCode(null), 3000)
              }
            }}
            disabled={isPending}
            className={`rounded p-1.5 transition-colors ${
              confirmCode === c.Code
                ? "text-destructive bg-destructive/10"
                : "text-muted-foreground hover:text-destructive"
            }`}
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
