"use client"

import { useState } from "react"
import { Plus, AlertCircle, Loader2, Brain } from "lucide-react"
import { useTranslations } from "next-intl"
import { buttonVariants, Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useCreateSummary } from "@/hooks/use-summaries"

export function CreateSummaryDialog() {
  const t = useTranslations("summaries")
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [serverError, setServerError] = useState("")
  const { mutateAsync: createSummary, isPending } = useCreateSummary()

  function onOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setTitle("")
      setText("")
      setServerError("")
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !text.trim()) {
      setServerError(t("requiredFields"))
      return
    }
    setServerError("")
    try {
      await createSummary({ title: title.trim(), text: text.trim() })
      onOpenChange(false)
    } catch (err) {
      const msg =
        (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg ??
        t("generateError")
      setServerError(msg)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className={buttonVariants({ variant: "default", size: "sm" })}>
        <Plus className="size-4" />
        {t("newSummary")}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("newSummary")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          {serverError && (
            <div className="bg-destructive/10 border-destructive/20 flex items-center gap-2 rounded-lg border p-3 text-sm">
              <AlertCircle className="text-destructive size-4 shrink-0" />
              <span className="text-destructive">{serverError}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <Input
              placeholder={t("titlePlaceholder")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <textarea
              placeholder={t("textPlaceholder")}
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              className="border-input bg-transparent placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 w-full resize-none rounded-lg border px-2.5 py-2 text-sm outline-none transition-colors dark:bg-input/30"
            />
          </div>

          <DialogFooter showCloseButton>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {t("generating")}
                </>
              ) : (
                <>
                  <Brain className="size-4" />
                  {t("summarize")}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
