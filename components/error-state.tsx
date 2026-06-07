"use client"

import { AlertCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

type ErrorStateProps = {
  message?: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const t = useTranslations("common")

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="bg-destructive/10 rounded-full p-3">
        <AlertCircle className="text-destructive size-6" />
      </div>
      <div className="space-y-1">
        <p className="text-foreground font-medium">{t("error")}</p>
        {message && <p className="text-muted-foreground text-sm">{message}</p>}
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          {t("retry")}
        </Button>
      )}
    </div>
  )
}
