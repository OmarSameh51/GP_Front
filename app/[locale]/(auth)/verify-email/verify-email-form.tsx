"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter, Link } from "@/i18n/navigation"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { CheckCircle, AlertCircle, MailCheck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/lib/axios"

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]
const fadeUp = { hidden: { opacity: 0, y: 16 }, show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.07, ease: EASE } }) }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }

const RESEND_COOLDOWN = 30

function getErrorMessage(err: unknown, fallback: string) {
  return (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg ?? fallback
}

export function VerifyEmailForm() {
  const t = useTranslations("auth.verifyEmail")
  const tCommon = useTranslations("common")
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailFromQuery = searchParams.get("email") ?? ""

  const [email, setEmail] = useState(emailFromQuery)
  const [code, setCode] = useState("")
  const [errors, setErrors] = useState<{ email?: string; code?: string }>({})
  const [serverError, setServerError] = useState("")
  const [resendMessage, setResendMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (cooldown <= 0) return
    const id = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000)
    return () => clearInterval(id)
  }, [cooldown])

  function validate() {
    const errs: { email?: string; code?: string } = {}
    if (!email) errs.email = t("emailRequired")
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = t("emailInvalid")
    if (!code) errs.code = t("codeRequired")
    else if (!/^\d{6}$/.test(code)) errs.code = t("codeInvalid")
    return errs
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setServerError("")
    setResendMessage("")
    setIsSubmitting(true)
    try {
      await api.post("/auth/verify-email", { email, code })
      router.push("/login?verified=true")
    } catch (err) {
      setServerError(getErrorMessage(err, tCommon("somethingWentWrong")))
    } finally {
      setIsSubmitting(false)
    }
  }

  async function onResend() {
    const errs: { email?: string } = {}
    if (!email) errs.email = t("emailRequired")
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = t("emailInvalid")
    if (Object.keys(errs).length) { setErrors((e) => ({ ...e, ...errs })); return }

    setServerError("")
    setResendMessage("")
    setIsResending(true)
    try {
      await api.post("/auth/resend-verification-code", { email })
      setResendMessage(t("resendSuccess"))
      setCooldown(RESEND_COOLDOWN)
    } catch (err) {
      setServerError(getErrorMessage(err, tCommon("somethingWentWrong")))
    } finally {
      setIsResending(false)
    }
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={fadeUp} custom={0} className="mb-8 flex items-start gap-3">
        <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <MailCheck className="size-4.5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{t("title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
      </motion.div>

      <motion.form variants={stagger} onSubmit={onSubmit} noValidate className="space-y-4">
        <motion.div variants={fadeUp} custom={1} className="space-y-1.5">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            autoComplete="email"
            className="h-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </motion.div>

        <motion.div variants={fadeUp} custom={2} className="space-y-1.5">
          <Label htmlFor="code">{t("code")}</Label>
          <Input
            id="code"
            inputMode="numeric"
            placeholder={t("codePlaceholder")}
            maxLength={6}
            className="h-10 text-center text-lg tracking-[0.5em]"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            aria-invalid={!!errors.code}
          />
          {errors.code && <p className="text-xs text-destructive">{errors.code}</p>}
        </motion.div>

        {serverError && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm">
            <AlertCircle className="size-4 shrink-0 text-destructive" />
            <span className="text-destructive">{serverError}</span>
          </motion.div>
        )}

        {resendMessage && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 rounded-xl border border-success/20 bg-success/10 p-3 text-sm">
            <CheckCircle className="size-4 shrink-0 text-success" />
            <span className="text-success">{resendMessage}</span>
          </motion.div>
        )}

        <motion.div variants={fadeUp} custom={3}>
          <Button type="submit" className="h-10 w-full" disabled={isSubmitting}>
            {isSubmitting ? t("submitting") : <><span>{t("submit")}</span><ArrowRight className="ms-1.5 size-4 rtl:rotate-180" /></>}
          </Button>
        </motion.div>

        <motion.div variants={fadeUp} custom={4} className="text-center text-sm text-muted-foreground">
          {t("noCode")}{" "}
          <button
            type="button"
            onClick={onResend}
            disabled={isResending || cooldown > 0}
            className="font-medium text-primary hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline"
          >
            {isResending ? t("resending") : cooldown > 0 ? t("resendCooldown", { seconds: cooldown }) : t("resend")}
          </button>
        </motion.div>
      </motion.form>

      <motion.p variants={fadeUp} custom={5} className="mt-6 text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-medium text-primary hover:underline">{t("backToLogin")}</Link>
      </motion.p>
    </motion.div>
  )
}
