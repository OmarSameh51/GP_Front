"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { UserPlus, AlertCircle } from "lucide-react"
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
import { useCreateAdmin } from "@/hooks/use-admins"

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  username: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
  phoneNumber: z.string().min(1, "Required"),
})

type FormValues = z.infer<typeof schema>

export function CreateAdminDialog() {
  const [open, setOpen] = useState(false)
  const [serverError, setServerError] = useState("")
  const { mutate: createAdmin, isPending } = useCreateAdmin()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  function onSubmit(values: FormValues) {
    setServerError("")
    createAdmin(values, {
      onSuccess: () => { reset(); setOpen(false) },
      onError: (err) => {
        const msg =
          (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg ??
          "Something went wrong."
        setServerError(msg)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ variant: "default", size: "sm" })}>
        <UserPlus className="size-4" />
        Create admin
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create admin account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {serverError && (
            <div className="bg-destructive/10 border-destructive/20 flex items-center gap-2 rounded-lg border p-3 text-sm">
              <AlertCircle className="text-destructive size-4 shrink-0" />
              <span className="text-destructive">{serverError}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...register("firstName")} aria-invalid={!!errors.firstName} />
              {errors.firstName && <p className="text-destructive text-xs">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...register("lastName")} aria-invalid={!!errors.lastName} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="admin-username">Username</Label>
              <Input id="admin-username" {...register("username")} aria-invalid={!!errors.username} />
              {errors.username && <p className="text-destructive text-xs">{errors.username.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="admin-phone">Phone</Label>
              <Input id="admin-phone" {...register("phoneNumber")} aria-invalid={!!errors.phoneNumber} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="admin-email">Email</Label>
            <Input id="admin-email" type="email" {...register("email")} aria-invalid={!!errors.email} />
            {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="admin-password">Password</Label>
            <Input id="admin-password" type="password" {...register("password")} aria-invalid={!!errors.password} />
            {errors.password && <p className="text-destructive text-xs">{errors.password.message}</p>}
          </div>

          <DialogFooter showCloseButton>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating…" : "Create admin"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
