"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, GraduationCap } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: EASE },
})

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="size-[500px] rounded-full bg-primary/6 blur-[120px]" />
      </div>

      {/* logo */}
      <motion.div {...fadeUp(0)} className="mb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
          <GraduationCap className="size-5 text-primary" />
          Helwan CS
        </Link>
      </motion.div>

      {/* 404 */}
      <motion.p
        {...fadeUp(0.05)}
        className="font-mono text-8xl font-bold tabular-nums text-primary/20 sm:text-9xl"
      >
        404
      </motion.p>

      <motion.h1
        {...fadeUp(0.1)}
        className="-mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
      >
        Page not found.
      </motion.h1>

      <motion.p
        {...fadeUp(0.15)}
        className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground"
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </motion.p>

      <motion.div {...fadeUp(0.2)} className="mt-8">
        <Link href="/" className={buttonVariants({ variant: "default" })}>
          <ArrowLeft className="mr-1.5 size-4" />
          Go home
        </Link>
      </motion.div>
    </div>
  )
}
