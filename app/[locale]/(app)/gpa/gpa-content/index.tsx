"use client"

import { useTranslations } from "next-intl"
import { useProfile } from "@/hooks/use-profile"
import { PageSkeleton } from "@/components/page-skeleton"
import { ErrorState } from "@/components/error-state"
import { GpaHeader } from "./gpa-header"
import { GradeBar } from "./grade-bar"
import { GradeTable } from "./grade-table"

export function GPAContent() {
  const t = useTranslations("gpa")
  const { data: profile, isLoading, isError, refetch } = useProfile()

  if (isLoading) return <PageSkeleton />
  if (isError || !profile)
    return <ErrorState message="Could not load GPA data." onRetry={refetch} />

  const courses = profile.enrolledCourses
  const passed = courses.filter((c) => c.isPassed)
  const failed = courses.filter((c) => !c.isPassed)

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 space-y-6">
      <div>
        <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest mb-1">
          {profile.studentId}
        </p>
        <h1 className="text-foreground text-4xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {t("subtitle", { count: courses.length, plural: courses.length !== 1 ? "s" : "" })}
        </p>
      </div>

      <GpaHeader
        gpa={profile.gpa}
        totalCreditHours={profile.totalCreditHours}
        passedCount={passed.length}
        failedCount={failed.length}
      />

      {courses.length > 0 && <GradeBar courses={courses} />}

      {courses.length === 0 ? (
        <div className="border-border bg-card rounded-xl border py-12 text-center">
          <p className="text-muted-foreground text-sm">{t("noCourses")}</p>
        </div>
      ) : (
        <GradeTable courses={courses} />
      )}
    </main>
  )
}
