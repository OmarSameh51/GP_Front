"use client"

import { BookOpen, AlertTriangle, Brain, Lock, GraduationCap, CheckCircle } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

// ─── Dialog — Course Registration ────────────────────────────────────────────

function RegisterDialog() {
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: "outline" })}>
        <BookOpen className="size-4" />
        Open Dialog
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Register for CS401</DialogTitle>
          <DialogDescription>
            Machine Learning Fundamentals · 3 credit hours · Dr. Khalid Hassan
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-1">
          <div className="bg-success/10 border-success/20 flex items-center gap-3 rounded-lg border p-3">
            <CheckCircle className="text-success size-4 shrink-0" />
            <p className="text-foreground text-sm">All prerequisites met</p>
          </div>

          <div className="space-y-2">
            {[
              ["Available seats", "12 / 40"],
              ["Schedule", "Sun / Tue · 10:00–11:30"],
              ["Credits after adding", "18 cr"],
            ].map(([label, val]) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="text-foreground font-medium">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter showCloseButton>
          <Button>Confirm Registration</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ─── Alert Dialog — Drop Course ───────────────────────────────────────────────

function DropCourseAlert() {
  return (
    <AlertDialog>
      <AlertDialogTrigger className={buttonVariants({ variant: "outline" })}>
        <AlertTriangle className="size-4" />
        Open Alert Dialog
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10">
            <AlertTriangle className="text-destructive size-5" />
          </AlertDialogMedia>
          <AlertDialogTitle>Drop CS350?</AlertDialogTitle>
          <AlertDialogDescription>
            Dropping Operating Systems after the add/drop deadline will appear on your transcript
            as a W grade and may affect your GPA standing.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Drop Course</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// ─── Sheet — Course Detail Panel ──────────────────────────────────────────────

function CourseDetailSheet() {
  return (
    <Sheet>
      <SheetTrigger className={buttonVariants({ variant: "outline" })}>
        <GraduationCap className="size-4" />
        Open Sheet
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Machine Learning Fundamentals</SheetTitle>
          <SheetDescription>CS401 · Computer Science · 3 credit hours</SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">AI / ML</Badge>
            <Badge variant="secondary">Elective</Badge>
            <Badge variant="outline">3rd Year+</Badge>
          </div>

          <div>
            <p className="text-foreground mb-1 text-sm font-medium">Description</p>
            <p className="text-muted-foreground text-sm">
              Covers supervised and unsupervised learning, neural networks, model evaluation, and
              hands-on projects using Python and scikit-learn.
            </p>
          </div>

          <div>
            <p className="text-foreground mb-2 text-sm font-medium">Prerequisites</p>
            <div className="space-y-1.5">
              {[
                { code: "MATH302", name: "Linear Algebra", met: true },
                { code: "CS301", name: "Data Structures", met: true },
                { code: "STAT201", name: "Probability & Stats", met: false },
              ].map(({ code, name, met }) => (
                <div key={code} className="flex items-center gap-2 text-sm">
                  {met ? (
                    <CheckCircle className="text-success size-4 shrink-0" />
                  ) : (
                    <Lock className="text-muted-foreground size-4 shrink-0" />
                  )}
                  <span className={met ? "text-foreground" : "text-muted-foreground"}>
                    {code} — {name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-foreground mb-2 text-sm font-medium">Schedule</p>
            <div className="bg-muted rounded-lg p-3 text-sm">
              <p className="text-foreground font-medium">Section A</p>
              <p className="text-muted-foreground">Sun / Tue / Thu · 10:00 – 11:30 AM</p>
              <p className="text-muted-foreground">Room B204 · Dr. Khalid Hassan</p>
            </div>
          </div>

          <div className="from-accent/10 to-accent/5 border-accent/20 rounded-lg border bg-gradient-to-r p-3">
            <div className="flex items-center gap-2">
              <Brain className="size-4 text-amber-600 dark:text-amber-400" />
              <p className="text-foreground text-sm font-medium">AI Recommended</p>
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              Based on your major and completed credits, this course is on your recommended path.
            </p>
          </div>
        </div>

        <SheetFooter>
          <SheetClose className={buttonVariants({ variant: "outline" })}>Close</SheetClose>
          <Button>Register</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

// ─── Drawer — Mobile / Bottom Sheet ───────────────────────────────────────────

const drawerCourses = [
  { code: "CS401", name: "Machine Learning", credits: 3, recommended: true },
  { code: "CS410", name: "Computer Networks", credits: 3, recommended: false },
  { code: "MATH401", name: "Numerical Methods", credits: 3, recommended: false },
]

function CourseDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <BookOpen className="size-4" />
          Open Drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Suggested Next Semester</DrawerTitle>
          <DrawerDescription>
            3 courses recommended based on your academic path
          </DrawerDescription>
        </DrawerHeader>

        <div className="space-y-2 px-4 py-2">
          {drawerCourses.map((c) => (
            <div
              key={c.code}
              className="bg-card border-border flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <p className="text-foreground text-sm font-medium">{c.name}</p>
                <p className="text-muted-foreground font-mono text-xs">
                  {c.code} · {c.credits} cr
                </p>
              </div>
              {c.recommended ? (
                <Brain className="size-4 text-amber-500" />
              ) : (
                <BookOpen className="text-primary size-4" />
              )}
            </div>
          ))}
        </div>

        <DrawerFooter>
          <Button>Register for All</Button>
          <DrawerClose asChild>
            <Button variant="outline">Dismiss</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

// ─── Tooltips ─────────────────────────────────────────────────────────────────

function TooltipShowcase() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tooltip>
        <TooltipTrigger className={buttonVariants({ variant: "outline" })}>
          Hover me (top)
        </TooltipTrigger>
        <TooltipContent side="top">Registered for Spring 2025</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger className={buttonVariants({ variant: "outline" })}>
          Hover me (bottom)
        </TooltipTrigger>
        <TooltipContent side="bottom">3 credit hours · Elective</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          className={buttonVariants({ variant: "ghost" })}
        >
          <Lock className="size-4" />
          Locked course
        </TooltipTrigger>
        <TooltipContent side="top">Complete STAT201 to unlock this course</TooltipContent>
      </Tooltip>
    </div>
  )
}

// ─── Badges ───────────────────────────────────────────────────────────────────

function BadgeShowcase() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  )
}

export {
  RegisterDialog,
  DropCourseAlert,
  CourseDetailSheet,
  CourseDrawer,
  TooltipShowcase,
  BadgeShowcase,
}
