"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { AlertCircle, Check, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/lib/axios"

export function PasswordForm() {
  const t = useTranslations("profile")
  const tCommon = useTranslations("common")

  const [serverError, setServerError] = useState("")
  const [success, setSuccess] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [values, setValues] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const errs: Record<string, string> = {}
    if (!values.currentPassword) errs.currentPassword = t("newPasswordMin")
    if (values.newPassword.length < 6) errs.newPassword = t("newPasswordMin")
    if (values.newPassword === values.currentPassword) errs.newPassword = t("newPasswordDiff")
    if (values.newPassword !== values.confirmPassword) errs.confirmPassword = t("passwordsMatch")
    return errs
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setServerError("")
    setSuccess(false)
    setIsSubmitting(true)
    try {
      await api.patch("/user/change-password", values)
      setValues({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      const msg =
        (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg ??
        tCommon("somethingWentWrong")
      setServerError(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  function field(key: keyof typeof values) {
    return {
      value: values[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setValues((v) => ({ ...v, [key]: e.target.value })),
      "aria-invalid": !!errors[key],
    }
  }

  return (
    <div className="border-border bg-card rounded-xl border p-6 space-y-4">
      <h3 className="text-foreground font-semibold">{t("passwordTitle")}</h3>

      <form onSubmit={onSubmit} className="space-y-4">
        {serverError && (
          <div className="bg-destructive/10 border-destructive/20 flex items-center gap-2 rounded-lg border p-3 text-sm">
            <AlertCircle className="text-destructive size-4 shrink-0" />
            <span className="text-destructive">{serverError}</span>
          </div>
        )}
        {success && (
          <div className="bg-success/10 border-success/20 flex items-center gap-2 rounded-lg border p-3 text-sm">
            <Check className="text-success size-4 shrink-0" />
            <span className="text-success">{t("passwordUpdated")}</span>
          </div>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="currentPassword">{t("currentPassword")}</Label>
          <div className="relative">
            <Input id="currentPassword" type={showCurrent ? "text" : "password"} {...field("currentPassword")} />
            <button type="button" className="text-muted-foreground absolute end-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowCurrent((p) => !p)}>
              {showCurrent ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.currentPassword && <p className="text-destructive text-xs">{errors.currentPassword}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="newPassword">{t("newPassword")}</Label>
          <div className="relative">
            <Input id="newPassword" type={showNew ? "text" : "password"} {...field("newPassword")} />
            <button type="button" className="text-muted-foreground absolute end-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowNew((p) => !p)}>
              {showNew ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.newPassword && <p className="text-destructive text-xs">{errors.newPassword}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
          <Input id="confirmPassword" type="password" {...field("confirmPassword")} />
          {errors.confirmPassword && <p className="text-destructive text-xs">{errors.confirmPassword}</p>}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("updating") : t("updatePassword")}
        </Button>
      </form>
    </div>
  )
}
