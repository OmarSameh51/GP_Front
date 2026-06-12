"use client"

import type { SummaryListItem } from "@/types/api"
import { SummaryCard } from "./summary-card"

export function SummaryList({
  summaries,
  onSelect,
}: {
  summaries: SummaryListItem[]
  onSelect: (id: string) => void
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {summaries.map((summary) => (
        <SummaryCard key={summary._id} summary={summary} onSelect={onSelect} />
      ))}
    </div>
  )
}
