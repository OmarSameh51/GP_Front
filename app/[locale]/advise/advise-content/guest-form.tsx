"use client"

import { useState } from "react"
import { X, Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CourseSearchSelect } from "@/components/course-search-select"
import type { GuestAdviceRequest, GuestAdvicePassedCourse, CourseSearchResult } from "@/types/api"

type Props = {
  isPending: boolean
  onSubmit: (payload: GuestAdviceRequest, fullRoadmap: boolean) => void
}

const DEPARTMENTS = ["General", "AI", "CS", "IT", "IS"] as const
const YEARS = [1, 2, 3, 4] as const
const SEMESTERS = [1, 2] as const

export function GuestForm({ isPending, onSubmit }: Props) {
  const t = useTranslations("advise")
  const [department, setDepartment] = useState<(typeof DEPARTMENTS)[number]>("General")
  const [academicYear, setAcademicYear] = useState<1 | 2 | 3 | 4>(1)
  const [preferredDepartment, setPreferredDepartment] = useState<
    (typeof DEPARTMENTS)[number] | ""
  >("")
  const [semester, setSemester] = useState<1 | 2>(1)
  const [fullRoadmap, setFullRoadmap] = useState(false)
  const [passed, setPassed] = useState<(GuestAdvicePassedCourse & { courseName?: string })[]>([])

  const addCourse = (course: CourseSearchResult) => {
    if (passed.some((c) => c.courseCode === course.Code)) return
    setPassed([...passed, { courseCode: course.Code, courseName: course.name, isPassed: true }])
  }

  const removeCourse = (code: string) => {
    setPassed(passed.filter((c) => c.courseCode !== code))
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(
      {
        department,
        academicYear,
        preferredDepartment: preferredDepartment || undefined,
        semester,
        passedCourses: passed.map(({ courseCode, grade, isPassed }) => ({ courseCode, grade, isPassed })),
      },
      fullRoadmap
    )
  }

  return (
    <form
      onSubmit={submit}
      className="border-border bg-card grid gap-5 rounded-xl border p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1.5">
          <Label htmlFor="dept">{t("department")}</Label>
          <select
            id="dept"
            value={department}
            onChange={(e) => setDepartment(e.target.value as typeof department)}
            className="border-border bg-background h-9 w-full rounded-md border px-3 text-sm"
          >
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="year">{t("academicYear")}</Label>
          <select
            id="year"
            value={academicYear}
            onChange={(e) =>
              setAcademicYear(Number(e.target.value) as 1 | 2 | 3 | 4)
            }
            className="border-border bg-background h-9 w-full rounded-md border px-3 text-sm"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="pref">{t("preferredDepartment")}</Label>
          <select
            id="pref"
            value={preferredDepartment}
            onChange={(e) =>
              setPreferredDepartment(e.target.value as typeof preferredDepartment)
            }
            className="border-border bg-background h-9 w-full rounded-md border px-3 text-sm"
          >
            <option value="">{t("none")}</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="sem">{t("semester")}</Label>
          <select
            id="sem"
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value) as 1 | 2)}
            className="border-border bg-background h-9 w-full rounded-md border px-3 text-sm"
          >
            {SEMESTERS.map((s) => (
              <option key={s} value={s}>
                {t("semesterOption", { n: s })}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>{t("passedCourses")}</Label>
        <CourseSearchSelect
          placeholder={t("courseSearchPlaceholder")}
          noResultsText={t("courseSearchEmpty")}
          onSelect={addCourse}
        />
        {passed.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {passed.map((c) => (
              <span
                key={c.courseCode}
                className="bg-muted text-foreground inline-flex items-center gap-2 rounded-full py-1 ps-3 pe-2 text-xs"
              >
                <span>{c.courseName ?? c.courseCode}</span>
                <span className="text-muted-foreground font-mono">{c.courseCode}</span>
                <button
                  type="button"
                  onClick={() => removeCourse(c.courseCode)}
                  className="hover:text-destructive"
                  aria-label={t("remove")}
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <label className="flex w-fit cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={fullRoadmap}
          onChange={(e) => setFullRoadmap(e.target.checked)}
          className="accent-primary size-4"
        />
        <span className="text-foreground">{t("fullRoadmap")}</span>
        <span className="text-muted-foreground text-xs">{t("fullRoadmapHint")}</span>
      </label>

      <div>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {t("advising")}
            </>
          ) : (
            t("advise")
          )}
        </Button>
      </div>
    </form>
  )
}
