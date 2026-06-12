"use client"

import { useState } from "react"
import { Plus, AlertCircle, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { buttonVariants } from "@/components/ui/button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useAddCourse } from "@/hooks/use-courses"
import { CourseSearchSelect } from "@/components/course-search-select"
import type { CourseSearchResult } from "@/types/api"

type DraftCourse = {
  course: CourseSearchResult
  grade: string
  isPassed: boolean
}

export function AddCourseDialog({ excludeCodes }: { excludeCodes?: string[] }) {
  const t = useTranslations("courses")
  const [open, setOpen] = useState(false)
  const [serverError, setServerError] = useState("")
  const [drafts, setDrafts] = useState<DraftCourse[]>([])
  const { mutateAsync: addCourse, isPending } = useAddCourse()

  function addDraft(course: CourseSearchResult) {
    setDrafts((ds) => [...ds, { course, grade: "", isPassed: true }])
  }

  function removeDraft(index: number) {
    setDrafts((ds) => ds.filter((_, i) => i !== index))
  }

  function updateDraft(index: number, patch: Partial<Pick<DraftCourse, "grade" | "isPassed">>) {
    setDrafts((ds) => ds.map((d, i) => (i === index ? { ...d, ...patch } : d)))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (drafts.length === 0) {
      setServerError(t("selectAtLeastOne") || "Select at least one course")
      return
    }

    const invalid = drafts.some((d) => {
      const grade = Number(d.grade)
      return d.grade.trim() === "" || Number.isNaN(grade) || grade < 0 || grade > 100
    })
    if (invalid) {
      setServerError(t("gradeRangeError") || "Enter a grade between 0 and 100 for each course")
      return
    }

    setServerError("")

    const failedIndexes = new Set<number>()
    const failureMessages: string[] = []
    for (let i = 0; i < drafts.length; i++) {
      const draft = drafts[i]
      try {
        await addCourse({
          courseCode: draft.course.Code,
          grade: Number(draft.grade),
          isPassed: draft.isPassed,
        })
      } catch (err) {
        const msg =
          (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg ??
          "Something went wrong."
        failedIndexes.add(i)
        failureMessages.push(`${draft.course.Code}: ${msg}`)
      }
    }

    if (failedIndexes.size === 0) {
      setDrafts([])
      setOpen(false)
    } else {
      setDrafts((ds) => ds.filter((_, i) => failedIndexes.has(i)))
      setServerError(failureMessages.join(" · "))
    }
  }

  function onOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setDrafts([])
      setServerError("")
    }
  }

  const excluded = [...(excludeCodes ?? [])]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className={buttonVariants({ variant: "default", size: "sm" })}>
        <Plus className="size-4" />
        {t("addCourse")}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("addCourseTitle")}{drafts.length > 1 ? "s" : ""}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          {serverError && (
            <div className="bg-destructive/10 border-destructive/20 flex items-center gap-2 rounded-lg border p-3 text-sm">
              <AlertCircle className="text-destructive size-4 shrink-0" />
              <span className="text-destructive">{serverError}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <CourseSearchSelect
              placeholder={t("courseSearchPlaceholder") || "Search by course name or code…"}
              noResultsText={t("courseSearchEmpty") || "No courses found"}
              excludeCodes={excluded}
              onSelect={addDraft}
            />
          </div>

          {drafts.length > 0 && (
            <div className="space-y-2">
              {drafts.map((d, idx) => (
                <div
                  key={`${d.course.Code}-${idx}`}
                  className="border-border bg-card space-y-2 rounded-lg border p-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{d.course.name}</p>
                      <p className="text-muted-foreground font-mono text-xs">{d.course.Code}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDraft(idx)}
                      className="text-muted-foreground hover:text-destructive shrink-0"
                      aria-label="Remove"
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      placeholder={t("gradePlaceholder")}
                      value={d.grade}
                      onChange={(e) => updateDraft(idx, { grade: e.target.value })}
                      className="w-24 shrink-0"
                    />

                    <div className="flex flex-1 gap-1.5">
                      <button
                        type="button"
                        onClick={() => updateDraft(idx, { isPassed: true })}
                        className={`flex-1 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors ${
                          d.isPassed
                            ? "bg-success/15 border-success/30 text-success"
                            : "border-border text-muted-foreground hover:border-primary/30"
                        }`}
                      >
                        {t("passed")}
                      </button>
                      <button
                        type="button"
                        onClick={() => updateDraft(idx, { isPassed: false })}
                        className={`flex-1 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors ${
                          !d.isPassed
                            ? "bg-destructive/15 border-destructive/30 text-destructive"
                            : "border-border text-muted-foreground hover:border-primary/30"
                        }`}
                      >
                        {t("failed")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <DialogFooter showCloseButton>
            <Button type="submit" disabled={isPending || drafts.length === 0}>
              {isPending
                ? t("adding")
                : drafts.length > 1
                  ? t("addCourses", { count: drafts.length })
                  : t("addCourse")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
