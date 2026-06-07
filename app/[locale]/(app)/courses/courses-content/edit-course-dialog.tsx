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
import { useEditCourse } from "@/hooks/use-courses"
import type { EnrolledCourse } from "@/types/api"

const schema = z.object({
  grade: z.coerce.number().min(0).max(100),
  isPassed: z.boolean(),
})

type FormValues = z.infer<typeof schema>

export function EditCourseDialog({ course }: { course: EnrolledCourse }) {
  const [open, setOpen] = useState(false)
  const [serverError, setServerError] = useState("")
  const { mutate: editCourse, isPending } = useEditCourse()

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: { grade: course.grade, isPassed: course.isPassed },
  })

  const isPassed = watch("isPassed")

  function onSubmit(values: FormValues) {
    setServerError("")
    editCourse(
      { courseId: course._id, body: values },
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
          <DialogTitle>Edit {course.courseCode}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {serverError && (
            <div className="bg-destructive/10 border-destructive/20 flex items-center gap-2 rounded-lg border p-3 text-sm">
              <AlertCircle className="text-destructive size-4 shrink-0" />
              <span className="text-destructive">{serverError}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="edit-grade">Grade (0–100)</Label>
            <Input
              id="edit-grade"
              type="number"
              min={0}
              max={100}
              {...register("grade")}
              aria-invalid={!!errors.grade}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Status</Label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setValue("isPassed", true)}
                className={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  isPassed
                    ? "bg-success/15 border-success/30 text-success"
                    : "border-border text-muted-foreground hover:border-primary/30"
                }`}
              >
                Passed
              </button>
              <button
                type="button"
                onClick={() => setValue("isPassed", false)}
                className={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  !isPassed
                    ? "bg-destructive/15 border-destructive/30 text-destructive"
                    : "border-border text-muted-foreground hover:border-primary/30"
                }`}
              >
                Failed
              </button>
            </div>
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
