"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Pencil, AlertCircle } from "lucide-react"
import { buttonVariants, Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useUpdateAdmin } from "@/hooks/use-admins"
import type { AdminUser } from "@/types/api"

const schema = z.object({
  username: z.string().min(1, "Required"),
  phoneNumber: z.string().min(1, "Required"),
})

type FormValues = z.infer<typeof schema>

export function EditAdminDialog({ admin }: { admin: AdminUser }) {
  const [open, setOpen] = useState(false)
  const [serverError, setServerError] = useState("")
  const { mutate: updateAdmin, isPending } = useUpdateAdmin()

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { username: admin.username, phoneNumber: admin.phoneNumber ?? "" },
  })

  function onSubmit(values: FormValues) {
    setServerError("")
    updateAdmin(
      { username: admin.username, body: values },
      {
        onSuccess: () => setOpen(false),
        onError: (err) => {
          const msg =
            (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg ??
            "Something went wrong."
          setServerError(msg)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ variant: "ghost", size: "sm" })}>
        <Pencil className="size-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {admin.username}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {serverError && (
            <div className="bg-destructive/10 border-destructive/20 flex items-center gap-2 rounded-lg border p-3 text-sm">
              <AlertCircle className="text-destructive size-4 shrink-0" />
              <span className="text-destructive">{serverError}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="edit-admin-username">Username</Label>
            <Input id="edit-admin-username" {...register("username")} aria-invalid={!!errors.username} />
            {errors.username && <p className="text-destructive text-xs">{errors.username.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-admin-phone">Phone</Label>
            <Input id="edit-admin-phone" {...register("phoneNumber")} aria-invalid={!!errors.phoneNumber} />
          </div>

          <DialogFooter showCloseButton>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving…" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
