"use client"

import { useState } from "react"
import { useForm, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus, AlertCircle } from "lucide-react"
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
import { useCreateCourse } from "@/hooks/use-admin-courses"

const schema = z.object({
  Code: z
    .string()
    .min(1)
    .regex(/^[A-Z0-9]+$/, "Uppercase letters and digits only"),
  name: z.string().min(1, "Required"),
  Credits: z.coerce.number().int().min(1),
  Semester: z.coerce.number().int().min(1).max(2),
  Required_level: z.coerce.number().int().min(1).max(4),
  Required_Hours: z.coerce.number().int().min(0),
  isActive: z.boolean(),
})

type FormValues = z.infer<typeof schema>

export function AddCourseDialog() {
  const [open, setOpen] = useState(false)
  const [serverError, setServerError] = useState("")
  const { mutate: createCourse, isPending } = useCreateCourse()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: { isActive: true, Semester: 1, Required_level: 1 },
  })

  const isActive = watch("isActive")

  function onSubmit(values: FormValues) {
    setServerError("")
    createCourse(values, {
      onSuccess: () => {
        reset()
        setOpen(false)
      },
      onError: (err) => {
        const msg =
          (err as { response?: { data?: { msg?: string } } })?.response?.data
            ?.msg ?? "Something went wrong."
        setServerError(msg)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={buttonVariants({ variant: "default", size: "sm" })}
      >
        <Plus className="size-4" />
        Add course
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {serverError && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm">
              <AlertCircle className="size-4 shrink-0 text-destructive" />
              <span className="text-destructive">{serverError}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="Code">Course Code</Label>
              <Input
                id="Code"
                placeholder="CS301"
                {...register("Code")}
                aria-invalid={!!errors.Code}
              />
              {errors.Code && (
                <p className="text-xs text-destructive">
                  {errors.Code.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="Credits">Credits</Label>
              <Input
                id="Credits"
                type="number"
                min={1}
                {...register("Credits")}
                aria-invalid={!!errors.Credits}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="name">Course Name</Label>
            <Input
              id="name"
              placeholder="Algorithms"
              {...register("name")}
              aria-invalid={!!errors.name}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="Semester">Semester</Label>
              <select
                id="Semester"
                {...register("Semester")}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="Required_level">Level</Label>
              <select
                id="Required_level"
                {...register("Required_level")}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
              >
                {[1, 2, 3, 4].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="Required_Hours">Req. Hours</Label>
              <Input
                id="Required_Hours"
                type="number"
                min={0}
                {...register("Required_Hours")}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              dir="ltr"
              onClick={() => setValue("isActive", !isActive)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${isActive ? "bg-success" : "bg-muted"}`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${isActive ? "translate-x-5" : "translate-x-0.5"}`}
              />
            </button>
            <Label>Active</Label>
          </div>

          <DialogFooter showCloseButton>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating…" : "Create course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
