"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useSummaries } from "@/hooks/use-summaries"
import { PageSkeleton } from "@/components/page-skeleton"
import { ErrorState } from "@/components/error-state"
import { CreateSummaryDialog } from "./create-summary-dialog"
import { EmptySummaries } from "./empty-summaries"
import { SummaryList } from "./summary-list"
import { SummaryDetailDialog } from "./summary-detail-dialog"

export function SummariesContent() {
  const t = useTranslations("summaries")
  const { data: summaries, isLoading, isError, refetch } = useSummaries()
  const [activeId, setActiveId] = useState<string | null>(null)

  if (isLoading) return <PageSkeleton />
  if (isError || !summaries) return <ErrorState onRetry={refetch} />

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-4xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {t("subtitle", { count: summaries.length, plural: summaries.length !== 1 ? "s" : "" })}
          </p>
        </div>
        <CreateSummaryDialog />
      </div>

      {summaries.length === 0 ? (
        <EmptySummaries />
      ) : (
        <SummaryList summaries={summaries} onSelect={setActiveId} />
      )}

      <SummaryDetailDialog id={activeId} onOpenChange={(open) => !open && setActiveId(null)} />
    </main>
  )
}
