"use client"

import { AlertCircle, TrendingUp, Zap, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"

export function AdvisorPreview() {
  const t = useTranslations("home")

  const recs = [
    {
      icon: AlertCircle,
      color: "text-warning",
      bg: "bg-warning/10",
      title: t("advisorRec1Title"),
      msg: t("advisorRec1Msg"),
      action: t("advisorRec1Action"),
    },
    {
      icon: TrendingUp,
      color: "text-success",
      bg: "bg-success/10",
      title: t("advisorRec2Title"),
      msg: t("advisorRec2Msg"),
      action: t("advisorRec2Action"),
    },
    {
      icon: Zap,
      color: "text-primary",
      bg: "bg-primary/10",
      title: t("advisorRec3Title"),
      msg: t("advisorRec3Msg"),
      action: t("advisorRec3Action"),
    },
  ]

  return (
    <div className="space-y-2 rounded-xl border border-border bg-background p-3">
      {recs.map(({ icon: Icon, color, bg, title, msg, action }) => (
        <div key={title} className={`rounded-lg ${bg} p-3`}>
          <div className="flex items-start gap-2.5">
            <Icon className={`mt-0.5 size-3.5 shrink-0 ${color}`} />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold text-foreground">{title}</p>
              <p className="mt-0.5 text-[10px] leading-relaxed text-muted-foreground">{msg}</p>
            </div>
          </div>
          <button className={`mt-2 flex items-center gap-0.5 text-[9px] font-medium ${color}`}>
            {action} <ChevronRight className="size-2.5 rtl:rotate-180" />
          </button>
        </div>
      ))}
    </div>
  )
}
