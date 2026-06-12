"use client"

import { FileText, Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { useDeleteSummary } from "@/hooks/use-summaries"
import type { SummaryListItem } from "@/types/api"

export function SummaryCard({
  summary,
  onSelect,
}: {
  summary: SummaryListItem
  onSelect: (id: string) => void
}) {
  const t = useTranslations("summaries")
  const { mutate: deleteSummary, isPending } = useDeleteSummary()

  return (
    <div className="border-border bg-card group relative rounded-xl border p-4 transition-colors hover:border-accent/40">
      <button
        type="button"
        onClick={() => onSelect(summary._id)}
        className="flex w-full flex-col items-start gap-3 text-start"
      >
        <div className="bg-accent/10 rounded-full p-2.5">
          <FileText className="text-accent size-5" />
        </div>
        <div className="min-w-0 w-full">
          <p className="text-foreground truncate font-medium">{summary.title}</p>
          <p className="text-muted-foreground mt-1 font-mono text-xs">
            {new Date(summary.createdAt).toLocaleDateString()}
          </p>
        </div>
      </button>

      <AlertDialog>
        <AlertDialogTrigger
          className="text-muted-foreground hover:text-destructive absolute end-3 top-3 opacity-0 transition-opacity group-hover:opacity-100"
          aria-label={t("delete")}
        >
          <Trash2 className="size-4" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("deleteTitle")}</AlertDialogTitle>
            <AlertDialogDescription>{t("deleteDesc")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isPending}
              onClick={() => deleteSummary(summary._id)}
            >
              {t("delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
