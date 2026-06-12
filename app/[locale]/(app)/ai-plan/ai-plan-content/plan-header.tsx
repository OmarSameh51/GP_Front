"use client"

import { useState } from "react"
import { Brain, Loader2, Route } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { useGenerateAIPlan } from "@/hooks/use-generate-ai-plan"
import type { useGenerateRoadmap } from "@/hooks/use-generate-roadmap"

export function PlanHeader({ roadmap }: { roadmap: ReturnType<typeof useGenerateRoadmap> }) {
  const t = useTranslations("aiPlan")
  const [semester, setSemester] = useState<1 | 2>(1)
  const { mutate, isPending, isError, error, data } = useGenerateAIPlan()
  const notes = data?.notes

  return (
    <div className="space-y-3">
      <div className="bg-card border-border border-s-2 border-s-accent rounded-lg border p-5">
        <div className="flex flex-wrap items-start gap-4">
          <Brain className="text-accent mt-0.5 size-5 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-foreground font-medium">{t("headerTitle")}</p>
            <p className="text-muted-foreground mt-1 text-sm">{t("headerDesc")}</p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <div className="border-border bg-background flex rounded-md border p-0.5">
              {[1, 2].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSemester(s as 1 | 2)}
                  className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                    semester === s
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t("semesterShort", { n: s })}
                </button>
              ))}
            </div>
            <Button
              type="button"
              size="sm"
              disabled={isPending || roadmap.isPending}
              onClick={() => mutate({ semester })}
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {t("generating")}
                </>
              ) : (
                <>
                  <Brain className="size-4" />
                  {t("generate")}
                </>
              )}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={isPending || roadmap.isPending}
              onClick={() => roadmap.mutate({ semester })}
            >
              {roadmap.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {t("roadmapGenerating")}
                </>
              ) : (
                <>
                  <Route className="size-4" />
                  {t("roadmap")}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {notes && (
        <div className="bg-muted/40 border-border rounded-lg border p-4">
          <p className="text-muted-foreground text-sm">{notes}</p>
        </div>
      )}

      {isError && (
        <div className="border-destructive/30 bg-destructive/5 text-destructive rounded-lg border p-4 text-sm">
          {(error as Error)?.message || t("generateError")}
        </div>
      )}

      {roadmap.isError && (
        <div className="border-destructive/30 bg-destructive/5 text-destructive rounded-lg border p-4 text-sm">
          {(roadmap.error as Error)?.message || t("generateError")}
        </div>
      )}
    </div>
  )
}
