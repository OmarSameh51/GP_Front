"use client"

import { useState } from "react"
import { AlertCircle, Check } from "lucide-react"
import { useTranslations } from "next-intl"
import { useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import api from "@/lib/axios"
import type { UserProfile } from "@/types/api"

const YEARS = [1, 2, 3, 4] as const

export function AcademicYearForm({ profile }: { profile: UserProfile }) {
  const t = useTranslations("profile")
  const tCommon = useTranslations("common")
  const qc = useQueryClient()
  const [year, setYear] = useState(profile.academicYear)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  async function save() {
    setLoading(true)
    setError("")
    setSuccess(false)
    try {
      await api.patch("/user/academic-year", { academicYear: year })
      qc.invalidateQueries({ queryKey: ["profile"] })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    } catch (err) {
      const msg =
        (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg ??
        t("failedYear")
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border-border bg-card rounded-xl border p-6 space-y-6">
      <h3 className="text-foreground font-semibold">{t("academicYearTitle")}</h3>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-3">
          <Label htmlFor="year-select">{t("academicYearLabel")}</Label>
          <select
            id="year-select"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border-border bg-background text-foreground w-full rounded-lg border px-3 py-2 text-sm"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {tCommon("year", { n: y })}
              </option>
            ))}
          </select>
          {error && (
            <div className="bg-destructive/10 border-destructive/20 flex items-center gap-2 rounded-lg border p-3 text-sm">
              <AlertCircle className="text-destructive size-4 shrink-0" />
              <span className="text-destructive">{error}</span>
            </div>
          )}
          <Button size="sm" onClick={save} disabled={loading || year === profile.academicYear}>
            {loading ? (
              tCommon("saving")
            ) : success ? (
              <>
                <Check className="size-4" /> {tCommon("save")}
              </>
            ) : (
              tCommon("save")
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
