"use client"

import { motion } from "framer-motion"
import { Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { User } from "@/store/auth"
import { dashStats } from "./data"
import { fadeUp, stagger } from "./animations"

export function AuthenticatedHome({ user }: { user: User }) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={fadeUp}>
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {user.studentId}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {user.firstName} {user.lastName}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="grid grid-cols-2 divide-x divide-y overflow-hidden rounded-xl border border-border bg-card sm:grid-cols-4 sm:divide-y-0"
        >
          {dashStats.map(({ value, label, colorClass }) => (
            <div key={label} className="px-6 py-5">
              <p className={`font-mono text-5xl font-bold tabular-nums ${colorClass}`}>{value}</p>
              <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="rounded-lg border border-l-2 border-border border-l-accent bg-card p-5"
        >
          <div className="flex items-start gap-4">
            <Brain className="mt-0.5 size-5 shrink-0 text-accent" />
            <div className="flex-1">
              <p className="font-medium text-foreground">Course recommendations available</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Based on your academic path, we have suggestions for next semester.
              </p>
            </div>
            <Button variant="outline" size="sm" className="shrink-0">
              View
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </main>
  )
}
