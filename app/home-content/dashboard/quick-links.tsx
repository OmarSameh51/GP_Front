"use client"

import { Link } from "@/i18n/navigation"
import { BookOpen, TrendingUp, Brain, User } from "lucide-react"
import { useTranslations } from "next-intl"

export function QuickLinks() {
  const t = useTranslations("dashboard.quickLinks")

  const links = [
    { href: "/courses" as const, icon: BookOpen, label: t("courses"), desc: t("coursesDesc") },
    { href: "/gpa" as const, icon: TrendingUp, label: t("gpa"), desc: t("gpaDesc") },
    { href: "/ai-plan" as const, icon: Brain, label: t("aiPlan"), desc: t("aiPlanDesc"), accent: true },
    { href: "/profile" as const, icon: User, label: t("profile"), desc: t("profileDesc") },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {links.map(({ href, icon: Icon, label, desc, accent }) => (
        <Link
          key={href}
          href={href}
          className="border-border bg-card hover:border-primary/30 flex flex-col gap-2 rounded-xl border p-5 transition-colors"
        >
          <Icon className={`size-5 ${accent ? "text-accent" : "text-primary"}`} />
          <div>
            <p className="text-foreground text-sm font-semibold">{label}</p>
            <p className="text-muted-foreground text-xs">{desc}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
