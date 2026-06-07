"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { BookOpen, Target, Calendar, Brain } from "lucide-react"
import { inView } from "./animations"

const icons = [BookOpen, Target, Calendar, Brain]
const values = ["120+", "144", "8", "AI"]

export function MetricsStrip() {
  const t = useTranslations("authLayout")

  const metrics = [
    { value: values[0], label: t("statCourses"), icon: icons[0] },
    { value: values[1], label: t("statCredits"), icon: icons[1] },
    { value: values[2], label: t("statSemesters"), icon: icons[2] },
    { value: values[3], label: "AI", icon: icons[3] },
  ]

  return (
    <motion.section
      variants={inView(0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="border-y border-border bg-card"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
          {metrics.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 px-8 py-6">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="size-4 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold tabular-nums text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
