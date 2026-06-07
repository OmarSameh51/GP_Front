"use client"

import { Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { buttonVariants } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"

type ConfirmDeleteDialogProps = {
  trigger: React.ReactNode
  title: string
  description: string
  onConfirm: () => void
  isPending?: boolean
}

export function ConfirmDeleteDialog({
  trigger,
  title,
  description,
  onConfirm,
  isPending,
}: ConfirmDeleteDialogProps) {
  const t = useTranslations("common")

  return (
    <AlertDialog>
      <AlertDialogTrigger className={buttonVariants({ variant: "ghost", size: "sm" })}>
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Trash2 className="text-destructive size-6" />
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onConfirm} disabled={isPending}>
            {isPending ? t("deleting") : t("delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
