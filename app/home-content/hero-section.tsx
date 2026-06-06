"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, TrendingUp, Brain, Sparkles } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { DashboardMockup } from "./dashboard-mockup"
import { EASE, fadeUp, stagger } from "./animations"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/6 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-6 pb-16 pt-20">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* left */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                {/* <Sparkles className="size-3 text-primary" /> */}
                Built for Helwan CS students
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-[2.75rem] font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl"
            >
              See your graduation path{" "}
              <span className="relative">
                <span className="text-primary">before you register.</span>
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
              Plan every semester, track your GPA in real time, and get AI-powered course
              recommendations tailored to the Helwan Computer Science curriculum.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3">
              <Link href="/register" className={buttonVariants({ variant: "default", size: "lg" })}>
                Start Planning Free
                <ArrowRight className="ml-1 size-4" />
              </Link>
              <Link href="/login" className={buttonVariants({ variant: "outline", size: "lg" })}>
                Sign In
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="flex items-center gap-4 pt-2">
              {[
                { text: "No signup required to explore" },
                { text: "Helwan curriculum built-in" },
              ].map(({ text }) => (
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
              className="absolute -left-4 top-16 z-10 hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-lg lg:flex"
            >
              <TrendingUp className="size-4 text-success" />
              <div>
                <p className="text-xs font-semibold text-foreground">GPA on track</p>
                <p className="text-[10px] text-muted-foreground">3.42 → projected 3.55</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5, ease: EASE }}
              className="absolute -right-4 bottom-20 z-10 hidden items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-lg lg:flex"
            >
              <Brain className="size-4 text-primary" />
              <div>
                <p className="text-xs font-semibold text-foreground">3 recommendations</p>
                <p className="text-[10px] text-muted-foreground">from AI advisor</p>
              </div>
            </motion.div>

            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
