"use client"

import { Link } from "@/i18n/navigation"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { inView } from "./animations"

export function CTASection() {
  const t = useTranslations("home.cta")

  return (
    <motion.section
      variants={inView(0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="py-24"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="rounded-3xl border border-border bg-card px-8 py-14 shadow-[0_8px_40px_-8px_oklch(0_0_0/0.08)]">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-muted-foreground">{t("subtitle")}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/register" className={buttonVariants({ variant: "default", size: "lg" })}>
              {t("createPlan")}
              <ArrowRight className="ms-1 size-4 rtl:rotate-180" />
            </Link>
            <Link href="/login" className={buttonVariants({ variant: "outline", size: "lg" })}>
              {t("signIn")}
            </Link>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">{t("free")}</p>
        </div>
      </div>
    </motion.section>
  )
}
