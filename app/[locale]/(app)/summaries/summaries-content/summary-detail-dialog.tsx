"use client"

import { Brain, Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useSummary } from "@/hooks/use-summaries"

export function SummaryDetailDialog({
  id,
  onOpenChange,
}: {
  id: string | null
  onOpenChange: (open: boolean) => void
}) {
  const t = useTranslations("summaries")
  const { data: summary, isLoading } = useSummary(id)

  return (
    <Dialog open={!!id} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{summary?.title ?? t("title")}</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="text-muted-foreground flex items-center justify-center gap-2 py-10 text-sm">
            <Loader2 className="size-4 animate-spin" />
            {t("loading")}
          </div>
        ) : summary ? (
          <div className="max-h-[60vh] space-y-4 overflow-y-auto">
            <div className="bg-muted/40 border-border rounded-lg border p-4">
              <p className="text-accent mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide">
                <Brain className="size-3.5" />
                {t("aiSummary")}
              </p>
              <p className="text-foreground text-sm whitespace-pre-wrap">{summary.summaryText}</p>
            </div>

            <details className="border-border rounded-lg border p-4">
              <summary className="text-muted-foreground cursor-pointer text-xs font-medium uppercase tracking-wide">
                {t("originalText")}
              </summary>
              <p className="text-muted-foreground mt-3 text-sm whitespace-pre-wrap">
                {summary.lectureText}
              </p>
            </details>
          </div>
        ) : null}

        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  )
}
