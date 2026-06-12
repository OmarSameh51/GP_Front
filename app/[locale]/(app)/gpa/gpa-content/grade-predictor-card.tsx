"use client"

import { useState } from "react"
import { Brain, Loader2, Calculator } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useGradePrediction } from "@/hooks/use-grade-prediction"

export function GradePredictorCard() {
  const t = useTranslations("gpa")
  const [coursework, setCoursework] = useState("")
  const [courseworkMax, setCourseworkMax] = useState("25")
  const [midterm, setMidterm] = useState("")
  const [midtermMax, setMidtermMax] = useState("25")
  const [formError, setFormError] = useState("")
  const { mutate, isPending, isError, error, data } = useGradePrediction()

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const cw = Number(coursework)
    const cwMax = Number(courseworkMax)
    const mt = Number(midterm)
    const mtMax = Number(midtermMax)

    if (
      [coursework, courseworkMax, midterm, midtermMax].some((v) => v.trim() === "") ||
      [cw, cwMax, mt, mtMax].some(Number.isNaN) ||
      cwMax <= 0 || mtMax <= 0 ||
      cw < 0 || cw > cwMax || mt < 0 || mt > mtMax
    ) {
      setFormError(t("predictRangeError"))
      return
    }
    if (cwMax + mtMax >= 100) {
      setFormError(t("predictMaxError"))
      return
    }
    setFormError("")
    mutate({ coursework: cw, midterm: mt, courseworkMax: cwMax, midtermMax: mtMax })
  }

  return (
    <div className="bg-card border-border border-s-2 border-s-accent rounded-lg border p-5">
      <div className="flex items-start gap-4">
        <Calculator className="text-accent mt-0.5 size-5 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-foreground font-medium">{t("predictTitle")}</p>
          <p className="text-muted-foreground mt-1 text-sm">{t("predictDesc")}</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-4 flex flex-wrap items-end gap-3">
        <div className="space-y-1">
          <label className="text-muted-foreground text-xs font-medium">
            {t("courseworkLabel")}
          </label>
          <div className="flex items-center gap-1">
            <Input
              type="number"
              min={0}
              step={0.5}
              value={coursework}
              onChange={(e) => setCoursework(e.target.value)}
              className="w-20"
            />
            <span className="text-muted-foreground text-sm">/</span>
            <Input
              type="number"
              min={1}
              step={1}
              value={courseworkMax}
              onChange={(e) => setCourseworkMax(e.target.value)}
              className="w-16"
              aria-label={t("maxMarkLabel")}
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-muted-foreground text-xs font-medium">
            {t("midtermLabel")}
          </label>
          <div className="flex items-center gap-1">
            <Input
              type="number"
              min={0}
              step={0.5}
              value={midterm}
              onChange={(e) => setMidterm(e.target.value)}
              className="w-20"
            />
            <span className="text-muted-foreground text-sm">/</span>
            <Input
              type="number"
              min={1}
              step={1}
              value={midtermMax}
              onChange={(e) => setMidtermMax(e.target.value)}
              className="w-16"
              aria-label={t("maxMarkLabel")}
            />
          </div>
        </div>
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {t("predicting")}
            </>
          ) : (
            <>
              <Brain className="size-4" />
              {t("predict")}
            </>
          )}
        </Button>
      </form>

      {(formError || isError) && (
        <p className="text-destructive mt-3 text-sm">
          {formError ||
            (error as { response?: { data?: { msg?: string } } })?.response?.data?.msg ||
            t("predictError")}
        </p>
      )}

      {data && (
        <div className="border-border mt-4 flex flex-wrap items-center gap-6 border-t pt-4">
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wide">
              {t("predictedFinal")}
            </p>
            <p className="text-foreground font-mono text-3xl font-bold">
              {data.predictedFinal}{" "}
              <span className="text-muted-foreground text-base font-normal">
                / {data.finalMax}
              </span>
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wide">
              {t("predictedTotal")}
            </p>
            <p className="text-foreground font-mono text-xl font-semibold">
              {data.predictedTotal}{" "}
              <span className="text-muted-foreground text-sm font-normal">/ 100</span>
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wide">
              {t("predictedLetter")}
            </p>
            <p
              className={`font-mono text-xl font-semibold ${
                data.passLikely ? "text-success" : "text-destructive"
              }`}
            >
              {data.letter}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
