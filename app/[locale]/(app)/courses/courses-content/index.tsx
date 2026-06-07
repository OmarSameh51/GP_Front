"use client"

import { BookOpen } from "lucide-react"
import { useTranslations } from "next-intl"
import { useProfile } from "@/hooks/use-profile"
import { PageSkeleton } from "@/components/page-skeleton"
import { ErrorState } from "@/components/error-state"
import { CourseTable } from "./course-table"
import { AddCourseDialog } from "./add-course-dialog"

export function CoursesContent() {
  const t = useTranslations("courses")
  const { data: profile, isLoading, isError, refetch } = useProfile()

  if (isLoading) return <PageSkeleton />
  if (isError || !profile)
    return <ErrorState message={t("noCourses")} onRetry={refetch} />

  const courses = profile.enrolledCourses

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest mb-1">
            {profile.studentId}
          </p>
          <h1 className="text-foreground text-4xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {t("subtitle", { count: courses.length, plural: courses.length !== 1 ? "s" : "" })}
          </p>
        </div>
        <AddCourseDialog />
      </div>

      {courses.length === 0 ? (
        <div className="border-border bg-card flex flex-col items-center justify-center gap-4 rounded-xl border py-16 text-center">
          <div className="bg-muted rounded-full p-4">
            <BookOpen className="text-muted-foreground size-6" />
          </div>
          <div className="space-y-1">
            <p className="text-foreground font-medium">{t("noCourses")}</p>
            <p className="text-muted-foreground text-sm">{t("noCoursesDesc")}</p>
          </div>
          <AddCourseDialog />
        </div>
      ) : (
        <CourseTable courses={courses} />
      )}
    </main>
  )
}
