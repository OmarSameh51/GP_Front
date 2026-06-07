"use client"

import { useRouter } from "@/i18n/navigation"
import { Eye, Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog"
import { useDeleteAdminStudent } from "@/hooks/use-admin-courses"
import type { UserProfile } from "@/types/api"

export function StudentRow({ student }: { student: UserProfile }) {
  const t = useTranslations("admin")
  const tCommon = useTranslations("common")
  const router = useRouter()
  const { mutate: deleteStudent, isPending } = useDeleteAdminStudent()

  return (
    <tr className="bg-card hover:bg-muted/30 transition-colors">
      <td className="text-muted-foreground px-5 py-4 font-mono text-xs">{student.studentId}</td>
      <td className="text-foreground px-5 py-4 font-medium">
        {student.firstName} {student.lastName}
      </td>
      <td className="text-muted-foreground px-5 py-4 text-sm">{student.email}</td>
      <td className="text-muted-foreground px-5 py-4 text-sm">{student.department}</td>
      <td className="text-foreground px-5 py-4 font-mono text-sm tabular-nums">
        {student.gpa?.toFixed(2) ?? "—"}
      </td>
      <td className="text-muted-foreground px-5 py-4 font-mono text-sm tabular-nums">
        {student.totalCreditHours}
      </td>
      <td className="text-muted-foreground px-5 py-4 text-sm">
        {tCommon("year", { n: student.academicYear })}
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/dashboard/students/${student.studentId}`)}
          >
            <Eye className="size-4" />
          </Button>
          <ConfirmDeleteDialog
            trigger={<Trash2 className="size-4" />}
            title={t("deleteStudentTitle")}
            description={t("deleteStudentDesc", { name: `${student.firstName} ${student.lastName}` })}
            onConfirm={() => deleteStudent(student.studentId)}
            isPending={isPending}
          />
        </div>
      </td>
    </tr>
  )
}
