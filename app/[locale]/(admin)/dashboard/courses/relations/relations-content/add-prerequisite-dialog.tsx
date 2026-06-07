"use client"

import { useState } from "react"
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
import { useAddPrerequisite } from "@/hooks/use-course-relations"

export function AddPrerequisiteDialog({ courseCode }: { courseCode: string }) {
  const [open, setOpen] = useState(false)
  const [prereqCode, setPrereqCode] = useState("")
  const [serverError, setServerError] = useState("")
  const { mutate: addPrerequisite, isPending } = useAddPrerequisite(courseCode)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setServerError("")
    addPrerequisite(prereqCode.toUpperCase(), {
      onSuccess: () => { setPrereqCode(""); setOpen(false) },
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
      <DialogTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>
        <Plus className="size-4" />
        Add prerequisite
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add prerequisite to {courseCode}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          {serverError && (
            <div className="bg-destructive/10 border-destructive/20 flex items-center gap-2 rounded-lg border p-3 text-sm">
              <AlertCircle className="text-destructive size-4 shrink-0" />
              <span className="text-destructive">{serverError}</span>
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="prereq-code">Prerequisite Course Code</Label>
            <Input
              id="prereq-code"
              placeholder="CS201"
              value={prereqCode}
              onChange={(e) => setPrereqCode(e.target.value)}
            />
          </div>
          <DialogFooter showCloseButton>
            <Button type="submit" disabled={isPending || !prereqCode.trim()}>
              {isPending ? "Adding…" : "Add prerequisite"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
