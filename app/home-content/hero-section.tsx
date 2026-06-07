"use client"

import { Link } from "@/i18n/navigation"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { ArrowRight, CheckCircle2, TrendingUp, Brain } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { DashboardMockup } from "./dashboard-mockup"
import { EASE, fadeUp, stagger } from "./animations"

export function HeroSection() {
  const t = useTranslations("home")

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/6 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-6 pb-16 pt-20">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* left */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                {t("badge")}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-[2.75rem] font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl"
            >
              {t("heroTitle")}{" "}
              <span className="relative">
                <span className="text-primary">{t("heroHighlight")}</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.5, ease: EASE }}
                  style={{ originX: 0 }}
                  className="absolute -bottom-1 left-0 right-0 block h-px bg-primary/30"
                />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="max-w-md text-base leading-relaxed text-muted-foreground"
            >
              {t("heroSubtitle")}
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3">
              <Link href="/register" className={buttonVariants({ variant: "default", size: "lg" })}>
                {t("startPlanning")}
                <ArrowRight className="ms-1 size-4 rtl:rotate-180" />
              </Link>
              <Link href="/login" className={buttonVariants({ variant: "outline", size: "lg" })}>
                {t("signIn")}
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="flex items-center gap-4 pt-2">
              {[t("noSignup"), t("builtIn")].map((text) => (
                <p key={text} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="size-3.5 text-success" />
                  {text}
                </p>
              ))}
            </motion.div>
          </motion.div>

          {/* right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5, ease: EASE }}
              className="absolute -start-4 top-16 z-10 hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-lg lg:flex"
            >
              <TrendingUp className="size-4 text-success" />
              <div>
                <p className="text-xs font-semibold text-foreground">{t("gpaBadge")}</p>
                <p className="text-[10px] text-muted-foreground">{t("gpaProjected")}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5, ease: EASE }}
              className="absolute -end-4 bottom-20 z-10 hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-lg lg:flex"
            >
              <Brain className="size-4 text-primary" />
              <div>
                <p className="text-xs font-semibold text-foreground">{t("aiBadge")}</p>
                <p className="text-[10px] text-muted-foreground">{t("aiFrom")}</p>
              </div>
            </motion.div>

            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
