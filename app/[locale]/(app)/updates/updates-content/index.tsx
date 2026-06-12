"use client"

import { useState } from "react"
import { Megaphone } from "lucide-react"
import { useTranslations } from "next-intl"
import { useAnnouncements } from "@/hooks/use-announcements"
import { PageSkeleton } from "@/components/page-skeleton"
import { ErrorState } from "@/components/error-state"
import { Button } from "@/components/ui/button"
import { AnnouncementItem } from "./announcement-item"

const PAGE = 20

export function UpdatesContent() {
  const t = useTranslations("updates")
  const [limit, setLimit] = useState(PAGE)
  const { data, isLoading, isError, refetch, isFetching } = useAnnouncements(limit)

  if (isLoading) return <PageSkeleton />
  if (isError || !data) return <ErrorState onRetry={refetch} />

  const { announcements, count } = data
  const canLoadMore = count === limit

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 space-y-6">
      <div>
        <h1 className="text-foreground text-4xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mt-1 text-sm">{t("subtitle")}</p>
      </div>

      {announcements.length === 0 ? (
        <div className="border-border bg-card flex flex-col items-center justify-center gap-4 rounded-xl border py-16 text-center">
          <div className="bg-accent/10 rounded-full p-4">
            <Megaphone className="text-accent size-6" />
          </div>
          <div className="space-y-1">
            <p className="text-foreground font-medium">{t("emptyTitle")}</p>
            <p className="text-muted-foreground max-w-sm text-sm">{t("emptyDesc")}</p>
          </div>
        </div>
      ) : (
        <>
          <ul className="space-y-3">
            {announcements.map((a) => (
              <AnnouncementItem key={a.id} announcement={a} />
            ))}
          </ul>

          {canLoadMore && (
            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                size="sm"
                disabled={isFetching}
                onClick={() => setLimit((l) => l + PAGE)}
              >
                {isFetching ? t("loading") : t("loadMore")}
              </Button>
            </div>
          )}
        </>
      )}
    </main>
  )
}
