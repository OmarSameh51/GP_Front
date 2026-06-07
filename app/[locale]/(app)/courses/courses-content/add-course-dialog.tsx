"use client"

import { useState } from "react"
import { useForm, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus, AlertCircle } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Button } from "@/components/ui/button"
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
import { useAddCourse } from "@/hooks/use-courses"

const schema = z.object({
  courseCode: z.string().min(1, "Required"),
  grade: z.coerce.number().min(0, "Min 0").max(100, "Max 100"),
  isPassed: z.boolean(),
})

type FormValues = z.infer<typeof schema>

export function AddCourseDialog() {
  const [open, setOpen] = useState(false)
  const [serverError, setServerError] = useState("")
  const { mutate: addCourse, isPending } = useAddCourse()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
    defaultValues: { isPassed: true },
  })

  const isPassed = watch("isPassed")

  function onSubmit(values: FormValues) {
    setServerError("")
    addCourse(
      { ...values, courseCode: values.courseCode.toUpperCase() },
      {
        onSuccess: () => {
          reset()
          setOpen(false)
        },
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
      <DialogTrigger className={buttonVariants({ variant: "default", size: "sm" })}>
        <Plus className="size-4" />
        Add course
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add course</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {serverError && (
            <div className="bg-destructive/10 border-destructive/20 flex items-center gap-2 rounded-lg border p-3 text-sm">
              <AlertCircle className="text-destructive size-4 shrink-0" />
              <span className="text-destructive">{serverError}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="courseCode">Course Code</Label>
            <Input
              id="courseCode"
              placeholder="e.g. CS301"
              {...register("courseCode")}
              aria-invalid={!!errors.courseCode}
            />
            {errors.courseCode && (
              <p className="text-destructive text-xs">{errors.courseCode.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="grade">Grade (0–100)</Label>
            <Input
              id="grade"
              type="number"
              min={0}
              max={100}
              placeholder="85"
              {...register("grade")}
              aria-invalid={!!errors.grade}
            />
            {errors.grade && (
              <p className="text-destructive text-xs">{errors.grade.message}</p>
            )}
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
              {isPending ? "Adding…" : "Add course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
