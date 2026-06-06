"use client"

import { motion } from "framer-motion"
import { Calendar, BarChart3, Brain, ArrowUpRight } from "lucide-react"
import { inView } from "../animations"
import { PlannerPreview } from "./planner-preview"
import { GpaPreview } from "./gpa-preview"
import { AdvisorPreview } from "./advisor-preview"

const cards = [
  {
    id: "planner",
    icon: Calendar,
    label: "Degree Planner",
    title: "Map every semester from day one.",
    desc: "Drag courses into semesters, see your credit count update live, and spot conflicts before they happen.",
    preview: <PlannerPreview />,
  },
  {
    id: "gpa",
    icon: BarChart3,
    label: "GPA Intelligence",
    title: "Track trends, project your final GPA.",
    desc: "Grade-level breakdowns, per-semester trends, and a projection engine that tells you exactly what you need to hit your target.",
    preview: <GpaPreview />,
  },
  {
    id: "advisor",
    icon: Brain,
    label: "AI Academic Advisor",
    title: "Never miss a prerequisite again.",
    desc: "An AI model trained on the Helwan CS curriculum surfaces blockers, suggests optimal course sequences, and keeps your path clear.",
    preview: <AdvisorPreview />,
  },
]

export function FeaturesSection() {
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
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Features
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to graduate with confidence.
          </h2>
          <p className="mt-3 max-w-lg text-muted-foreground">
            Built around how CS students at Helwan actually plan, register, and succeed.
          </p>
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
                <button className="mt-auto flex items-center gap-1 text-xs font-medium text-primary">
                  Learn more <ArrowUpRight className="size-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
