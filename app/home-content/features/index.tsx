"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Calendar, BarChart3, Brain, ArrowUpRight } from "lucide-react"
import { inView } from "../animations"
import { PlannerPreview } from "./planner-preview"
import { GpaPreview } from "./gpa-preview"
import { AdvisorPreview } from "./advisor-preview"

export function FeaturesSection() {
  const t = useTranslations("home")

  const cards = [
    {
      id: "planner",
      icon: Calendar,
      label: t("plannerTitle"),
      title: t("plannerTitle"),
      desc: t("plannerDesc"),
      preview: <PlannerPreview />,
    },
    {
      id: "gpa",
      icon: BarChart3,
      label: t("gpaTitle"),
      title: t("gpaTitle"),
      desc: t("gpaDesc"),
      preview: <GpaPreview />,
    },
    {
      id: "advisor",
      icon: Brain,
      label: t("advisorTitle"),
      title: t("advisorTitle"),
      desc: t("advisorDesc"),
      preview: <AdvisorPreview />,
    },
  ]

  return (
    <section id="features" className="bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={inView(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("featuresTitle")}
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map(({ id, icon: Icon, label, title, desc, preview }, i) => (
            <motion.div
              key={id}
              variants={inView(i * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="border-b border-border bg-muted/20 p-4">{preview}</div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-3.5 text-primary" />
                  </div>
                  <span className="text-xs font-semibold text-primary">{label}</span>
                </div>
                <p className="text-sm font-semibold leading-snug text-foreground">{title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
