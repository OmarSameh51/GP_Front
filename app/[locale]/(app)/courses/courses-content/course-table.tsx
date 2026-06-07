"use client"

import { Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import type { EnrolledCourse } from "@/types/api"
import { GradeBadge } from "./grade-badge"
import { EditCourseDialog } from "./edit-course-dialog"
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog"
import { useDeleteCourse } from "@/hooks/use-courses"

export function CourseTable({ courses }: { courses: EnrolledCourse[] }) {
  const t = useTranslations("courses")
  const { mutate: deleteCourse, isPending } = useDeleteCourse()

  return (
    <div className="border-border overflow-hidden rounded-xl border">
      <table className="w-full text-sm">
        <thead className="border-border border-b">
          <tr className="text-muted-foreground text-xs uppercase tracking-widest">
            <th className="px-5 py-3 text-start font-mono font-normal">{t("colCode")}</th>
            <th className="px-5 py-3 text-start font-normal">{t("colName")}</th>
            <th className="px-5 py-3 text-start font-normal">{t("colCredits")}</th>
            <th className="px-5 py-3 text-start font-normal">{t("colGrade")}</th>
            <th className="px-5 py-3 text-start font-normal">{t("colStatus")}</th>
            <th className="px-5 py-3 text-end font-normal">{t("colActions")}</th>
          </tr>
        </thead>
        <tbody className="divide-border divide-y">
          {courses.map((course) => (
            <tr key={course._id} className="bg-card hover:bg-muted/30 transition-colors">
              <td className="text-muted-foreground px-5 py-4 font-mono text-xs">{course.courseCode}</td>
              <td className="text-foreground px-5 py-4 font-medium">{course.courseName}</td>
              <td className="text-muted-foreground px-5 py-4 font-mono text-xs tabular-nums">{course.creditHours}</td>
              <td className="px-5 py-4">
                <GradeBadge grade={course.grade} isPassed={course.isPassed} />
              </td>
              <td className="px-5 py-4">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  course.isPassed ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
                }`}>
                  {course.isPassed ? t("passed") : t("failed")}
                </span>
              </td>
              <td className="px-5 py-4 text-end">
                <div className="flex items-center justify-end gap-1">
                  <EditCourseDialog course={course} />
                  <ConfirmDeleteDialog
                    trigger={<Trash2 className="size-4" />}
                    title={t("removeTitle")}
                    description={t("removeDesc", { code: course.courseCode })}
                    onConfirm={() => deleteCourse(course._id)}
                    isPending={isPending}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
