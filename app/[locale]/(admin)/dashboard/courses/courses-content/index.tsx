"use client"

import { useState, useMemo } from "react"
import { useTranslations } from "next-intl"
import { useAdminCourses } from "@/hooks/use-admin-courses"
import { PageSkeleton } from "@/components/page-skeleton"
import { ErrorState } from "@/components/error-state"
import { CourseFilters, type FilterValue } from "./course-filters"
import { ActiveToggle } from "./active-toggle"
import { EditCourseDialog } from "./edit-course-dialog"
import { AddCourseDialog } from "./add-course-dialog"

export function AdminCoursesContent() {
  const t = useTranslations("admin")
  const { data: courses, isLoading, isError, refetch } = useAdminCourses()
  const [filter, setFilter] = useState<FilterValue>("all")

  const filtered = useMemo(() => {
    if (!courses) return []
    return courses.filter((c) => {
      if (filter === "active") return c.isActive
      if (filter === "inactive") return !c.isActive
      if (filter === "sem1") return c.Semester === 1
      if (filter === "sem2") return c.Semester === 2
      return true
    })
  }, [courses, filter])

  if (isLoading) return <PageSkeleton />
  if (isError) return <ErrorState onRetry={refetch} />

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">{t("courses")}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {t("coursesTotal", { count: courses?.length ?? 0, plural: (courses?.length ?? 0) !== 1 ? "s" : "" })}
          </p>
        </div>
        <AddCourseDialog />
      </div>

      <CourseFilters active={filter} onChange={setFilter} />

      <div className="border-border overflow-hidden rounded-xl border">
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground text-sm">{t("noCourses")}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="border-border border-b">
              <tr className="text-muted-foreground text-xs uppercase tracking-widest">
                <th className="px-5 py-3 text-start font-mono font-normal">{t("colCode")}</th>
                <th className="px-5 py-3 text-start font-normal">{t("colName")}</th>
                <th className="px-5 py-3 text-start font-normal">{t("colCredits")}</th>
                <th className="px-5 py-3 text-start font-normal">{t("colSem")}</th>
                <th className="px-5 py-3 text-start font-normal">{t("colLevel")}</th>
                <th className="px-5 py-3 text-start font-normal">{t("colReqHours")}</th>
                <th className="px-5 py-3 text-start font-normal">{t("colActive")}</th>
                <th className="px-5 py-3 text-end font-normal">{t("colActions")}</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {filtered.map((course) => (
                <tr key={course.Code} className="bg-card hover:bg-muted/30 transition-colors">
                  <td className="text-muted-foreground px-5 py-4 font-mono text-xs">{course.Code}</td>
                  <td className="text-foreground px-5 py-4 font-medium">{course.name}</td>
                  <td className="text-muted-foreground px-5 py-4 font-mono text-xs tabular-nums">{course.Credits}</td>
                  <td className="text-muted-foreground px-5 py-4 font-mono text-xs">{course.Semester}</td>
                  <td className="text-muted-foreground px-5 py-4 font-mono text-xs">{course.Required_level}</td>
                  <td className="text-muted-foreground px-5 py-4 font-mono text-xs tabular-nums">{course.Required_Hours}</td>
                  <td className="px-5 py-4">
                    <ActiveToggle courseCode={course.Code} isActive={course.isActive} />
                  </td>
                  <td className="px-5 py-4 text-end">
                    <EditCourseDialog course={course} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  )
}
