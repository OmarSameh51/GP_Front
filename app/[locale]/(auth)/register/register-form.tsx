"use client"

import { useState } from "react"
import { useRouter, Link } from "@/i18n/navigation"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { AlertCircle, Eye, EyeOff, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/lib/axios"

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.06, ease: EASE } }) }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }

type FormValues = {
  firstName: string; lastName: string; email: string
  password: string; confirmPassword: string
  department: string; academicYear: string; preferredDepartment: string
}

const SPECIALIZATIONS = ["AI", "CS", "IT", "IS"] as const

export function RegisterForm() {
  const t = useTranslations("auth.register")
  const tCommon = useTranslations("common")
  const router = useRouter()

  const [values, setValues] = useState<FormValues>({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", department: "", academicYear: "", preferredDepartment: "" })
  const [errors, setErrors] = useState<Partial<FormValues>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [serverError, setServerError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const yearNum = Number(values.academicYear)
  const isLowerYear = yearNum === 1 || yearNum === 2
  const isUpperYear = yearNum === 3 || yearNum === 4

  function field(key: keyof FormValues) {
    return {
      value: values[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValues((v) => ({ ...v, [key]: e.target.value })),
      "aria-invalid": !!errors[key],
    }
  }

  function setYear(next: string) {
    const n = Number(next)
    setValues((v) => {
      const updated: FormValues = { ...v, academicYear: next }
      if (n === 1 || n === 2) {
        updated.department = "General"
      } else if (n === 3 || n === 4) {
        updated.preferredDepartment = ""
        if (v.department === "General") updated.department = ""
      }
      return updated
    })
  }

  function validate() {
    const errs: Partial<FormValues> = {}
    if (!values.firstName.trim()) errs.firstName = t("firstName") + " " + t("required")
    if (!values.lastName.trim()) errs.lastName = t("lastName") + " " + t("required")
    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errs.email = t("emailInvalid")
    if (values.password.length < 6) errs.password = t("passwordMin")
    if (values.password !== values.confirmPassword) errs.confirmPassword = t("passwordsMismatch")
    if (!values.academicYear || ![1, 2, 3, 4].includes(yearNum)) errs.academicYear = t("academicYear") + " " + t("required")
    if (!values.department) {
      errs.department = t("department") + " " + t("required")
    } else if (isLowerYear && values.department !== "General") {
      errs.department = t("lowerYearDeptHint")
    } else if (isUpperYear && values.department === "General") {
      errs.department = t("upperYearDeptHint")
    }
    if (isLowerYear && !values.preferredDepartment) {
      errs.preferredDepartment = t("preferredDepartment") + " " + t("required")
    }
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
      await api.post("/auth/register", {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email,
        password: values.password,
        username: values.email.split("@")[0],
        department: values.department,
        academicYear: yearNum,
        ...(isLowerYear && { preferredDepartment: values.preferredDepartment }),
      })
      router.push(`/verify-email?email=${encodeURIComponent(values.email)}`)
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

      <motion.form variants={stagger} onSubmit={onSubmit} noValidate className="space-y-4">
        <motion.div variants={fadeUp} custom={1} className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="firstName">{t("firstName")}</Label>
            <Input id="firstName" placeholder={t("firstNamePlaceholder")} autoComplete="given-name" className="h-10" {...field("firstName")} />
            {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName">{t("lastName")}</Label>
            <Input id="lastName" placeholder={t("lastNamePlaceholder")} autoComplete="family-name" className="h-10" {...field("lastName")} />
            {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
          </div>
        </motion.div>

        <motion.div variants={fadeUp} custom={2} className="space-y-1.5">
          <Label htmlFor="email">{t("email")}</Label>
          <Input id="email" type="email" placeholder={t("emailPlaceholder")} autoComplete="email" className="h-10" {...field("email")} />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </motion.div>

        <motion.div variants={fadeUp} custom={3} className="space-y-1.5">
          <Label htmlFor="password">{t("password")}</Label>
          <div className="relative">
            <Input id="password" type={showPassword ? "text" : "password"} placeholder={t("passwordPlaceholder")} autoComplete="new-password" className="h-10 pe-9" {...field("password")} />
            <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute end-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
        </motion.div>

        <motion.div variants={fadeUp} custom={4} className="space-y-1.5">
          <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
          <div className="relative">
            <Input id="confirmPassword" type={showConfirm ? "text" : "password"} placeholder={t("confirmPasswordPlaceholder")} autoComplete="new-password" className="h-10 pe-9" {...field("confirmPassword")} />
            <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute end-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
        </motion.div>

        <motion.div variants={fadeUp} custom={5} className="space-y-3 border-t border-border pt-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t("academicDetails")}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="academicYear">{t("academicYear")}</Label>
              <select
                id="academicYear"
                value={values.academicYear}
                onChange={(e) => setYear(e.target.value)}
                aria-invalid={!!errors.academicYear}
                className="h-10 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30"
              >
                <option value="">{t("academicYearPlaceholder")}</option>
                {[1, 2, 3, 4].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              {errors.academicYear && <p className="text-xs text-destructive">{errors.academicYear}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="department">{t("department")}</Label>
              <select
                id="department"
                value={values.department}
                onChange={(e) => setValues((v) => ({ ...v, department: e.target.value }))}
                disabled={isLowerYear}
                aria-invalid={!!errors.department}
                className="h-10 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-input/30"
              >
                <option value="">{t("departmentPlaceholder")}</option>
                {isLowerYear ? (
                  <option value="General">General</option>
                ) : (
                  SPECIALIZATIONS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))
                )}
              </select>
              {errors.department && <p className="text-xs text-destructive">{errors.department}</p>}
              {isLowerYear && !errors.department && (
                <p className="text-xs text-muted-foreground">{t("lowerYearDeptHint")}</p>
              )}
            </div>
          </div>

          {isLowerYear && (
            <div className="space-y-1.5">
              <Label htmlFor="preferredDepartment">{t("preferredDepartment")}</Label>
              <select
                id="preferredDepartment"
                value={values.preferredDepartment}
                onChange={(e) => setValues((v) => ({ ...v, preferredDepartment: e.target.value }))}
                aria-invalid={!!errors.preferredDepartment}
                className="h-10 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30"
              >
                <option value="">{t("preferredDepartmentPlaceholder")}</option>
                {SPECIALIZATIONS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              {errors.preferredDepartment ? (
                <p className="text-xs text-destructive">{errors.preferredDepartment}</p>
              ) : (
                <p className="text-xs text-muted-foreground">{t("preferredDepartmentHint")}</p>
              )}
            </div>
          )}
        </motion.div>

        {serverError && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm">
            <AlertCircle className="size-4 shrink-0 text-destructive" />
            <span className="text-destructive">{serverError}</span>
          </motion.div>
        )}

        <motion.div variants={fadeUp} custom={6}>
          <Button type="submit" className="h-10 w-full" disabled={isSubmitting}>
            {isSubmitting ? t("submitting") : <><span>{t("submit")}</span><ArrowRight className="ms-1.5 size-4 rtl:rotate-180" /></>}
          </Button>
        </motion.div>
      </motion.form>

      <motion.p variants={fadeUp} custom={7} className="mt-6 text-center text-sm text-muted-foreground">
        {t("hasAccount")}{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">{t("signIn")}</Link>
      </motion.p>
    </motion.div>
  )
}
