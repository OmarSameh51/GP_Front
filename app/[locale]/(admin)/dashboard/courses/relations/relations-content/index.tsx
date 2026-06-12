"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useAdminCourses } from "@/hooks/use-admin-courses"
import { useCourseRelations } from "@/hooks/use-course-relations"
import { PageSkeleton } from "@/components/page-skeleton"
import { ErrorState } from "@/components/error-state"
import { CourseSelector } from "./course-selector"
import { PrerequisiteList } from "./prerequisite-list"
import { UnlocksList } from "./unlocks-list"
import { AddPrerequisiteDialog } from "./add-prerequisite-dialog"

export function RelationsContent() {
  const t = useTranslations("admin")
  const tCommon = useTranslations("common")
  const [selectedCode, setSelectedCode] = useState("")
  const { data: courses, isLoading: coursesLoading } = useAdminCourses()
  const {
    data: relations,
    isLoading: relLoading,
    isError: relError,
    refetch,
  } = useCourseRelations(selectedCode)

  if (coursesLoading) return <PageSkeleton />

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">{t("relationsTitle")}</h1>
        <p className="text-muted-foreground mt-1 text-sm">{t("relationsSubtitle")}</p>
      </div>

      <CourseSelector
        courses={courses ?? []}
        selected={selectedCode}
        onSelect={setSelectedCode}
      />

      {!selectedCode && (
        <div className="border-border bg-card rounded-xl border py-12 text-center">
          <p className="text-muted-foreground text-sm">{t("selectCourse")}</p>
        </div>
      )}

      {selectedCode && relLoading && (
        <div className="border-border bg-card rounded-xl border py-8 text-center">
          <p className="text-muted-foreground text-sm">{tCommon("loadingRelations")}</p>
        </div>
      )}

      {selectedCode && relError && (
        <ErrorState message="Could not load course relations." onRetry={refetch} />
      )}

      {selectedCode && relations && !relLoading && (
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="border-border bg-card rounded-xl border p-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs uppercase tracking-widest">
                {t("prerequisites", { count: relations.prerequisites.length })}
              </p>
              <AddPrerequisiteDialog courseCode={selectedCode} />
            </div>
            <PrerequisiteList
              courseCode={selectedCode}
              prerequisites={relations.prerequisites}
            />
          </div>

          <div className="border-border bg-card rounded-xl border p-5 space-y-4">
            <p className="text-muted-foreground text-xs uppercase tracking-widest">
              {t("unlocks", { count: relations.unlocks.length })}
            </p>
            <UnlocksList unlocks={relations.unlocks} />
          </div>
        </div>
      )}
    </div>
  )
}
