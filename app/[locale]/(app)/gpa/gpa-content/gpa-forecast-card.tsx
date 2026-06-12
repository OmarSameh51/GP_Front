"use client"

import { Brain, Loader2, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { useGpaForecast } from "@/hooks/use-gpa-forecast"

export function GpaForecastCard() {
  const t = useTranslations("gpa")
  const { mutate, isPending, isError, error, data } = useGpaForecast()

  const delta = data ? data.forecastGPA - data.currentGPA : 0
  const TrendIcon = delta > 0.005 ? TrendingUp : delta < -0.005 ? TrendingDown : Minus
  const trendColor =
    delta > 0.005 ? "text-success" : delta < -0.005 ? "text-destructive" : "text-muted-foreground"

  return (
    <div className="bg-card border-border border-s-2 border-s-accent rounded-lg border p-5">
      <div className="flex flex-wrap items-start gap-4">
        <Brain className="text-accent mt-0.5 size-5 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-foreground font-medium">{t("forecastTitle")}</p>
          <p className="text-muted-foreground mt-1 text-sm">{t("forecastDesc")}</p>
        </div>
        <Button type="button" size="sm" disabled={isPending} onClick={() => mutate()}>
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {t("forecasting")}
            </>
          ) : (
            <>
              <Brain className="size-4" />
              {t("forecast")}
            </>
          )}
        </Button>
      </div>

      {data && (
        <div className="border-border mt-4 flex flex-wrap items-center gap-6 border-t pt-4">
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wide">
              {t("forecastGpa")}
            </p>
            <p className="text-foreground flex items-center gap-2 font-mono text-3xl font-bold">
              {data.forecastGPA.toFixed(2)}
              <TrendIcon className={`size-5 ${trendColor}`} />
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wide">
              {t("currentGpa")}
            </p>
            <p className="text-foreground font-mono text-xl font-semibold">
              {data.currentGPA.toFixed(2)}
            </p>
          </div>
          <p className="text-muted-foreground text-sm">
            {t("forecastDetail", {
              completed: data.completedCredits,
              remaining: data.remainingCredits,
            })}
          </p>
        </div>
      )}

      {isError && (
        <p className="text-destructive mt-3 text-sm">
          {(error as { response?: { data?: { error?: string } } })?.response?.data?.error ||
            t("forecastError")}
        </p>
      )}
    </div>
  )
}
