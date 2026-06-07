"use client"

import { useEffect } from "react"
import { useRouter } from "@/i18n/navigation"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { useProfile } from "@/hooks/use-profile"
import { useAuthStore } from "@/store/auth"
import { PageSkeleton } from "@/components/page-skeleton"
import { ErrorState } from "@/components/error-state"
import { StatStrip } from "./dashboard/stat-strip"
import { AIBanner } from "./dashboard/ai-banner"
import { CourseSnapshot } from "./dashboard/course-snapshot"
import { QuickLinks } from "./dashboard/quick-links"
import { fadeUp, stagger } from "./animations"

export function AuthenticatedHome() {
  const t = useTranslations("dashboard")
  const router = useRouter()
  const { data: profile, isLoading, isError, refetch } = useProfile()
  const setRole = useAuthStore((s) => s.setRole)

  useEffect(() => {
    if (profile) {
      setRole(profile.role)
      if (profile.role === "admin" || profile.role === "super_admin") {
        router.replace("/dashboard/students")
      }
    }
  }, [profile, setRole, router])

  if (isLoading) return <PageSkeleton />
  if (isError || !profile)
    return <ErrorState message="Could not load your profile." onRetry={refetch} />

  if (profile.role === "admin" || profile.role === "super_admin") {
    return <PageSkeleton />
  }

  const enrolledCourses = profile.enrolledCourses ?? []
  const passed = enrolledCourses.filter((c) => c.isPassed).length
  const inProgress = enrolledCourses.filter((c) => !c.isPassed).length
  const planCount = profile.AI_plan?.plan?.length ?? 0

  const stats = [
    { value: profile.gpa != null ? profile.gpa.toFixed(2) : "—", label: t("gpa"), colorClass: "text-primary" },
    { value: String(profile.totalCreditHours), label: t("creditsEarned"), colorClass: "text-success" },
    { value: String(inProgress), label: t("inProgress"), colorClass: "text-info" },
    { value: String(passed), label: t("passed"), colorClass: "text-muted-foreground" },
  ]

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">
        <motion.div variants={fadeUp}>
          <p className="text-muted-foreground mb-1 font-mono text-xs uppercase tracking-widest">
            {profile.studentId}
          </p>
          <h1 className="text-foreground text-4xl font-bold tracking-tight">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">{profile.email}</p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <StatStrip stats={stats} />
        </motion.div>

        <motion.div variants={fadeUp}>
          <AIBanner planCount={planCount} />
        </motion.div>

        <motion.div variants={fadeUp}>
          <QuickLinks />
        </motion.div>

        <motion.div variants={fadeUp}>
          <CourseSnapshot courses={enrolledCourses} />
        </motion.div>
      </motion.div>
    </main>
  )
}
