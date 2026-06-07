"use client"

import { useState } from "react"
import { useForm, type Resolver } from "react-hook-form"
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
import { useUpdateCourse } from "@/hooks/use-admin-courses"
import type { Course } from "@/types/api"

const schema = z.object({
  isActive: z.boolean(),
  Required_level: z.coerce.number().int().min(1).max(4),
  Required_Hours: z.coerce.number().int().min(0),
  Semester: z.coerce.number().int().min(1).max(2),
})

type FormValues = z.infer<typeof schema>

export function EditCourseDialog({ course }: { course: Course }) {
  const [open, setOpen] = useState(false)
  const [serverError, setServerError] = useState("")
  const { mutate: updateCourse, isPending } = useUpdateCourse()

  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      isActive: course.isActive,
      Required_level: course.Required_level,
      Required_Hours: course.Required_Hours,
      Semester: course.Semester,
    },
  })

  const isActive = watch("isActive")

  function onSubmit(values: FormValues) {
    setServerError("")
    updateCourse(
      { courseCode: course.Code, body: values },
      {
        onSuccess: () => setOpen(false),
        onError: (err) => {
          const msg =
            (err as { response?: { data?: { msg?: string } } })?.response?.data
              ?.msg ?? "Something went wrong."
          setServerError(msg)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={buttonVariants({ variant: "ghost", size: "sm" })}
      >
        <Pencil className="size-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {course.Code}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {serverError && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm">
              <AlertCircle className="size-4 shrink-0 text-destructive" />
              <span className="text-destructive">{serverError}</span>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-semester">Semester</Label>
              <select
                id="edit-semester"
                {...register("Semester")}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-level">Level</Label>
              <select
                id="edit-level"
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
              <Label htmlFor="edit-hours">Req. Hours</Label>
              <Input
                id="edit-hours"
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
              {isPending ? "Saving…" : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
