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
  department: string; academicYear: string
}

export function RegisterForm() {
  const t = useTranslations("auth.register")
  const tCommon = useTranslations("common")
  const router = useRouter()

  const [values, setValues] = useState<FormValues>({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", department: "", academicYear: "" })
  const [errors, setErrors] = useState<Partial<FormValues>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
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
    if (!values.firstName.trim()) errs.firstName = t("firstName") + " required"
    if (!values.lastName.trim()) errs.lastName = t("lastName") + " required"
    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errs.email = t("email") + " invalid"
    if (values.password.length < 6) errs.password = tCommon("somethingWentWrong")
    if (values.password !== values.confirmPassword) errs.confirmPassword = tCommon("somethingWentWrong")
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
        ...(values.department && { department: values.department }),
        ...(values.academicYear && { academicYear: Number(values.academicYear) }),
      })
      router.push("/login?registered=true")
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
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t("optionalDetails")}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="department">{t("department")}</Label>
              <Input id="department" placeholder={t("departmentPlaceholder")} className="h-10" {...field("department")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="academicYear">{t("academicYear")}</Label>
              <Input id="academicYear" type="number" min={1} max={4} placeholder={t("academicYearPlaceholder")} className="h-10" {...field("academicYear")} />
            </div>
          </div>
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
