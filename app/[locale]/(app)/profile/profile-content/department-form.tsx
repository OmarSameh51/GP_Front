"use client"

import { useState } from "react"
import { AlertCircle, Check, Lock } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"
import type { UserProfile } from "@/types/api"

const SPECIALIZATIONS = ["AI", "CS", "IT", "IS"] as const

export function DepartmentForm({ profile }: { profile: UserProfile }) {
  const t = useTranslations("profile")
  const tCommon = useTranslations("common")
  const qc = useQueryClient()

  const isLowerYear = profile.academicYear === 1 || profile.academicYear === 2
  const canEditDepartment = profile.academicYear === 3

  const [dept, setDept] = useState(profile.department)
  const [preferred, setPreferred] = useState(profile.preferredDepartment || "")
  const [deptLoading, setDeptLoading] = useState(false)
  const [prefLoading, setPrefLoading] = useState(false)
  const [deptError, setDeptError] = useState("")
  const [prefError, setPrefError] = useState("")
  const [deptSuccess, setDeptSuccess] = useState(false)
  const [prefSuccess, setPrefSuccess] = useState(false)

  async function saveDept() {
    setDeptLoading(true)
    setDeptError("")
    setDeptSuccess(false)
    try {
      await api.patch("/user/department", { department: dept })
      qc.invalidateQueries({ queryKey: ["profile"] })
      setDeptSuccess(true)
      setTimeout(() => setDeptSuccess(false), 2000)
    } catch (err) {
      const msg =
        (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg ??
        t("failedDept")
      setDeptError(msg)
    } finally {
      setDeptLoading(false)
    }
  }

  async function savePref() {
    setPrefLoading(true)
    setPrefError("")
    setPrefSuccess(false)
    try {
      await api.patch("/user/preferred-department", { preferredDepartment: preferred })
      qc.invalidateQueries({ queryKey: ["profile"] })
      setPrefSuccess(true)
      setTimeout(() => setPrefSuccess(false), 2000)
    } catch (err) {
      const msg =
        (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg ??
        t("failedPref")
      setPrefError(msg)
    } finally {
      setPrefLoading(false)
    }
  }

  return (
    <div className="border-border bg-card rounded-xl border p-6 space-y-6">
      <h3 className="text-foreground font-semibold">{t("departmentTitle")}</h3>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-3">
          <Label htmlFor="dept-select">{t("currentDept")}</Label>
          {canEditDepartment ? (
            <>
              <select
                id="dept-select"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className="border-border bg-background text-foreground w-full rounded-lg border px-3 py-2 text-sm"
              >
                {SPECIALIZATIONS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              {deptError && (
                <div className="bg-destructive/10 border-destructive/20 flex items-center gap-2 rounded-lg border p-3 text-sm">
                  <AlertCircle className="text-destructive size-4 shrink-0" />
                  <span className="text-destructive">{deptError}</span>
                </div>
              )}
              <Button size="sm" onClick={saveDept} disabled={deptLoading || dept === profile.department}>
                {deptLoading ? tCommon("saving") : deptSuccess ? (
                  <><Check className="size-4" /> {tCommon("save")}</>
                ) : tCommon("save")}
              </Button>
            </>
          ) : (
            <>
              <div className="border-border bg-muted/40 text-foreground flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
                <span>{profile.department}</span>
                <Lock className="text-muted-foreground size-4" />
              </div>
              <p className="text-muted-foreground text-xs">
                {isLowerYear ? t("lockedDeptLowerYear") : t("lockedDeptYear4")}
              </p>
            </>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="pref-select">{t("preferredDept")}</Label>
          {isLowerYear ? (
            <>
              <select
                id="pref-select"
                value={preferred}
                onChange={(e) => setPreferred(e.target.value)}
                className="border-border bg-background text-foreground w-full rounded-lg border px-3 py-2 text-sm"
              >
                <option value="" disabled>{t("preferredDeptPlaceholder")}</option>
                {SPECIALIZATIONS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              {prefError && (
                <div className="bg-destructive/10 border-destructive/20 flex items-center gap-2 rounded-lg border p-3 text-sm">
                  <AlertCircle className="text-destructive size-4 shrink-0" />
                  <span className="text-destructive">{prefError}</span>
                </div>
              )}
              <Button size="sm" onClick={savePref} disabled={prefLoading || !preferred || preferred === profile.preferredDepartment}>
                {prefLoading ? tCommon("saving") : prefSuccess ? (
                  <><Check className="size-4" /> {tCommon("save")}</>
                ) : tCommon("save")}
              </Button>
            </>
          ) : (
            <>
              <div className="border-border bg-muted/40 text-foreground flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
                <span>{profile.preferredDepartment || "—"}</span>
                <Lock className="text-muted-foreground size-4" />
              </div>
              <p className="text-muted-foreground text-xs">{t("preferredFollowsDept")}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
