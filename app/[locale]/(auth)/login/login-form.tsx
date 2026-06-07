"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter, Link } from "@/i18n/navigation"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { CheckCircle, AlertCircle, Eye, EyeOff, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/store/auth"
import api from "@/lib/axios"

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07, ease: EASE } }) }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }

type FormValues = { email: string; password: string }

export function LoginForm() {
  const t = useTranslations("auth.login")
  const tCommon = useTranslations("common")
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams.get("registered") === "true"
  const setAuth = useAuthStore((s) => s.setAuth)

  const [values, setValues] = useState<FormValues>({ email: "", password: "" })
  const [errors, setErrors] = useState<Partial<FormValues>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  function field(key: keyof FormValues) {
    return {
      value: values[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValues((v) => ({ ...v, [key]: e.target.value })),
      "aria-invalid": !!errors[key],
    }
  }

  function validate() {
    const errs: Partial<FormValues> = {}
    if (!values.email) errs.email = t("emailRequired")
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errs.email = t("emailInvalid")
    if (!values.password) errs.password = t("passwordRequired")
    else if (values.password.length < 6) errs.password = t("passwordMin")
    return errs
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setServerError("")
    setIsSubmitting(true)
    try {
      const { data } = await api.post("/auth/login", values)
      setAuth(data.user, data.token)
      const role = data.user.role
      router.push(role === "admin" || role === "super_admin" ? "/dashboard/students" : "/")
    } catch (err) {
      setServerError((err as { response?: { data?: { msg?: string } } })?.response?.data?.msg ?? tCommon("somethingWentWrong"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={fadeUp} custom={0} className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
      </motion.div>

      {registered && (
        <motion.div variants={fadeUp} custom={0.5} className="mb-6 flex items-center gap-2 rounded-xl border border-success/20 bg-success/10 p-3 text-sm">
          <CheckCircle className="size-4 shrink-0 text-success" />
          <span className="text-success">{t("registered")}</span>
        </motion.div>
      )}

      <motion.form variants={stagger} onSubmit={onSubmit} noValidate className="space-y-4">
        <motion.div variants={fadeUp} custom={1} className="space-y-1.5">
          <Label htmlFor="email">{t("email")}</Label>
          <Input id="email" type="email" placeholder={t("emailPlaceholder")} autoComplete="email" className="h-10" {...field("email")} />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </motion.div>

        <motion.div variants={fadeUp} custom={2} className="space-y-1.5">
          <Label htmlFor="password">{t("password")}</Label>
          <div className="relative">
            <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" autoComplete="current-password" className="h-10 pe-9" {...field("password")} />
            <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute end-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground" aria-label={showPassword ? t("hidePassword") : t("showPassword")}>
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
        </motion.div>

        {serverError && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm">
            <AlertCircle className="size-4 shrink-0 text-destructive" />
            <span className="text-destructive">{serverError}</span>
          </motion.div>
        )}

        <motion.div variants={fadeUp} custom={3}>
          <Button type="submit" className="h-10 w-full" disabled={isSubmitting}>
            {isSubmitting ? t("submitting") : <><span>{t("submit")}</span><ArrowRight className="ms-1.5 size-4 rtl:rotate-180" /></>}
          </Button>
        </motion.div>
      </motion.form>

      <motion.p variants={fadeUp} custom={4} className="mt-6 text-center text-sm text-muted-foreground">
        {t("noAccount")}{" "}
        <Link href="/register" className="font-medium text-primary hover:underline">{t("createOne")}</Link>
      </motion.p>
    </motion.div>
  )
}
