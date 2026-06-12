"use client"

import {
  Plus,
  Pencil,
  CheckCircle2,
  XCircle,
  Link2,
  Link2Off,
  type LucideIcon,
} from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import type { Announcement, AnnouncementType } from "@/types/api"

const META: Record<AnnouncementType, { icon: LucideIcon; tone: string }> = {
  COURSE_CREATED: { icon: Plus, tone: "bg-success/10 text-success" },
  COURSE_UPDATED: { icon: Pencil, tone: "bg-primary/10 text-primary" },
  COURSE_ACTIVATED: { icon: CheckCircle2, tone: "bg-success/10 text-success" },
  COURSE_DEACTIVATED: { icon: XCircle, tone: "bg-destructive/10 text-destructive" },
  PREREQUISITE_ADDED: { icon: Link2, tone: "bg-primary/10 text-primary" },
  PREREQUISITE_REMOVED: { icon: Link2Off, tone: "bg-accent/15 text-accent" },
}

export function AnnouncementItem({ announcement }: { announcement: Announcement }) {
  const t = useTranslations("updates")
  const locale = useLocale()
  const { icon: Icon, tone } = META[announcement.type]

  const when = new Date(announcement.createdAt).toLocaleString(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  })

  return (
    <li className="border-border bg-card flex items-start gap-4 rounded-xl border p-4">
      <div className={`shrink-0 rounded-full p-2.5 ${tone}`}>
        <Icon className="size-5" />
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-foreground font-medium">{t(`type.${announcement.type}`)}</span>
          <span className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 font-mono text-xs">
            {announcement.courseCode}
          </span>
        </div>

        {announcement.summary && (
          <p className="text-muted-foreground text-sm">{announcement.summary}</p>
        )}

        <p className="text-muted-foreground/80 text-xs">
          {announcement.adminUsername
            ? t("byAdminAt", { admin: announcement.adminUsername, when })
            : when}
        </p>
      </div>
    </li>
  )
}
