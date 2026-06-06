"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { inView } from "./animations"

export function CTASection() {
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
            Ready to start?
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Your degree, on your terms.
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-muted-foreground">
            Join Computer Science students who plan smarter, avoid registration mistakes,
            and graduate on time.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/register" className={buttonVariants({ variant: "default", size: "lg" })}>
              Create your plan
              <ArrowRight className="ml-1 size-4" />
            </Link>
            <Link href="/login" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Sign in
            </Link>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Free for all Helwan CS students · No credit card required
          </p>
        </div>
      </div>
    </motion.section>
  )
}
