"use client"

import { useRouter } from "@/i18n/navigation"
import { ArrowLeft, Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useAdminStudent } from "@/hooks/use-admin-students"
import { useDeleteAdminStudent } from "@/hooks/use-admin-courses"
import { PageSkeleton } from "@/components/page-skeleton"
import { ErrorState } from "@/components/error-state"
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog"
import { StudentProfileHeader } from "./student-profile-header"
import { CoursesSection } from "./courses-section"
import { AIPlanSection } from "./ai-plan-section"

export function StudentDetailContent({ studentId }: { studentId: string }) {
  const t = useTranslations("admin")
  const td = useTranslations("dashboard")
  const tc = useTranslations("courses")
  const router = useRouter()
  const { data: student, isLoading, isError, refetch } = useAdminStudent(studentId)
  const { mutate: deleteStudent, isPending: deleting } = useDeleteAdminStudent()

  if (isLoading) return <PageSkeleton />
  if (isError || !student) return <ErrorState onRetry={refetch} />

  function handleDelete() {
    deleteStudent(studentId, {
      onSuccess: () => router.push("/dashboard/students"),
    })
  }

  const enrolledCourses = student.enrolledCourses ?? []
  const passed = enrolledCourses.filter((c) => c.isPassed).length
  const inProgress = enrolledCourses.filter((c) => !c.isPassed).length

  const stats = [
    { value: student.gpa?.toFixed(2) ?? "—", label: td("gpa"), colorClass: "text-primary" },
    { value: String(student.totalCreditHours), label: t("credits"), colorClass: "text-success" },
    { value: String(inProgress), label: td("inProgress"), colorClass: "text-info" },
    { value: String(passed), label: td("passed"), colorClass: "text-muted-foreground" },
  ]

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <button
            onClick={() => router.push("/dashboard/students")}
            className="text-muted-foreground hover:text-foreground mb-2 flex items-center gap-1 text-sm transition-colors"
          >
            <ArrowLeft className="size-3 rtl:rotate-180" />
            {t("backToStudents")}
          </button>
          <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">{t("studentDetail")}</h1>
        </div>
        <ConfirmDeleteDialog
          trigger={
            <span className="flex items-center gap-2">
              <Trash2 className="size-4" />
              {t("deleteStudent")}
            </span>
          }
          title={t("deleteStudentTitle")}
          description={t("deleteStudentDesc", { name: `${student.firstName} ${student.lastName}` })}
          onConfirm={handleDelete}
          isPending={deleting}
        />
      </div>

      <div className="border-border bg-card grid grid-cols-2 divide-x divide-y overflow-hidden rounded-xl border sm:grid-cols-4 sm:divide-y-0">
        {stats.map(({ value, label, colorClass }) => (
          <div key={label} className="px-4 py-4 sm:px-6 sm:py-5">
            <p className={`font-mono text-4xl font-bold tabular-nums sm:text-5xl ${colorClass}`}>{value}</p>
            <p className="text-muted-foreground mt-2 text-xs uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </div>

      <StudentProfileHeader student={student} />
      <CoursesSection courses={enrolledCourses} />
      <AIPlanSection aiPlan={student.AI_plan} />
    </div>
  )
}
