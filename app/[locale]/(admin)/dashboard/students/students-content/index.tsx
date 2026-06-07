"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { useTranslations } from "next-intl"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAdminStudents } from "@/hooks/use-admin-students"
import { PageSkeleton } from "@/components/page-skeleton"
import { ErrorState } from "@/components/error-state"
import { StudentRow } from "./student-row"

const PAGE_SIZE = 20

export function StudentsContent() {
  const t = useTranslations("admin")
  const tCommon = useTranslations("common")
  const { data, isLoading, isError, refetch } = useAdminStudents()
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (!data?.students) return []
    const q = search.toLowerCase()
    return data.students.filter(
      (s) =>
        s.studentId?.toLowerCase().includes(q) ||
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.department?.toLowerCase().includes(q)
    )
  }, [data, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  if (isLoading) return <PageSkeleton />
  if (isError) return <ErrorState onRetry={refetch} />

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-foreground text-3xl font-bold tracking-tight">{t("students")}</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {t("studentsTotal", { count: data?.count ?? 0, plural: (data?.count ?? 0) !== 1 ? "s" : "" })}
        </p>
      </div>

      <div className="relative max-w-sm">
        <Search className="text-muted-foreground absolute start-3 top-1/2 size-4 -translate-y-1/2" />
        <Input
          placeholder={t("studentsSearch")}
          className="ps-9"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
        />
      </div>

      <div className="border-border overflow-hidden rounded-xl border">
        {paged.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground text-sm">{t("noStudents")}</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-border border-b">
              <tr className="text-muted-foreground text-xs uppercase tracking-widest">
                <th className="px-5 py-3 text-start font-mono font-normal">{t("colStudentId")}</th>
                <th className="px-5 py-3 text-start font-normal">{t("colName")}</th>
                <th className="px-5 py-3 text-start font-normal">{t("colEmail")}</th>
                <th className="px-5 py-3 text-start font-normal">{t("colDept")}</th>
                <th className="px-5 py-3 text-start font-normal">{t("colGpa")}</th>
                <th className="px-5 py-3 text-start font-normal">{t("colCredits")}</th>
                <th className="px-5 py-3 text-start font-normal">{t("colYear")}</th>
                <th className="px-5 py-3 text-end font-normal">{t("colActions")}</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {paged.map((student) => (
                <StudentRow key={student._id} student={student} />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            {tCommon("page", { page, total: totalPages })}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
              {tCommon("previous")}
            </Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
              {tCommon("next")}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
