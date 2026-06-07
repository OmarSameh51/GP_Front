"use client"

import { Link } from "@/i18n/navigation"
import { Brain } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export function AIBanner({ planCount }: { planCount: number }) {
  const t = useTranslations("dashboard.aiPlan")

  if (planCount === 0) {
    return (
      <div className="bg-card border-border border-s-2 border-s-accent rounded-lg border p-5">
        <div className="flex items-start gap-4">
          <Brain className="text-accent mt-0.5 size-5 shrink-0" />
          <div className="flex-1">
            <p className="text-foreground font-medium">{t("noPlan")}</p>
            <p className="text-muted-foreground mt-1 text-sm">{t("noPlanDesc")}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card border-border border-s-2 border-s-accent rounded-lg border p-5">
      <div className="flex items-start gap-4">
        <Brain className="text-accent mt-0.5 size-5 shrink-0" />
        <div className="flex-1">
          <p className="text-foreground font-medium">{t("planAvailable")}</p>
          <p className="text-muted-foreground mt-1 text-sm">
            {planCount} {t("planDesc", { count: planCount, plural: planCount !== 1 ? "s" : "" })}
          </p>
        </div>
        <Link href="/ai-plan" className={`${buttonVariants({ variant: "outline", size: "sm" })} shrink-0`}>
          {t("viewPlan")}
        </Link>
      </div>
    </div>
  )
}
