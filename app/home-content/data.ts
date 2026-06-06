import { BookOpen, Target, Calendar, Brain } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type SemStatus = "done" | "active" | "upcoming"

export type Semester = {
  num: number
  label: string
  gpa: string | null
  credits: number
  status: SemStatus
  courses: { code: string; name: string; credits: number }[]
}

export const METRICS: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "120+", label: "Courses Available", icon: BookOpen },
  { value: "144", label: "Credit Hours Tracked", icon: Target },
  { value: "8", label: "Semesters Visualized", icon: Calendar },
  { value: "AI", label: "Powered Advisor", icon: Brain },
]

export const SEMESTERS: Semester[] = [
  {
    num: 1,
    label: "Semester 1",
    gpa: "3.80",
    credits: 18,
    status: "done",
    courses: [
      { code: "CS 101", name: "Intro to Programming", credits: 3 },
      { code: "MATH 101", name: "Calculus I", credits: 3 },
      { code: "CS 102", name: "Computer Architecture", credits: 3 },
      { code: "MATH 102", name: "Linear Algebra", credits: 3 },
      { code: "ENG 101", name: "Technical Writing", credits: 3 },
      { code: "PHY 101", name: "Physics I", credits: 3 },
    ],
  },
  {
    num: 2,
    label: "Semester 2",
    gpa: "3.50",
    credits: 18,
    status: "done",
    courses: [
      { code: "CS 201", name: "Data Structures", credits: 3 },
      { code: "MATH 201", name: "Calculus II", credits: 3 },
      { code: "CS 202", name: "Discrete Mathematics", credits: 3 },
      { code: "CS 203", name: "Digital Logic", credits: 3 },
      { code: "CS 204", name: "Numerical Analysis", credits: 3 },
      { code: "PHY 201", name: "Physics II", credits: 3 },
    ],
  },
  {
    num: 3,
    label: "Semester 3",
    gpa: null,
    credits: 18,
    status: "active",
    courses: [
      { code: "CS 301", name: "Algorithms", credits: 3 },
      { code: "CS 302", name: "Object-Oriented Prog", credits: 3 },
      { code: "MATH 301", name: "Probability & Stats", credits: 3 },
      { code: "CS 303", name: "Operating Systems", credits: 3 },
      { code: "CS 304", name: "Database Systems", credits: 3 },
      { code: "CS 305", name: "Computer Networks", credits: 3 },
    ],
  },
  {
    num: 4,
    label: "Semester 4",
    gpa: null,
    credits: 18,
    status: "upcoming",
    courses: [
      { code: "CS 401", name: "Software Engineering", credits: 3 },
      { code: "CS 402", name: "Compiler Design", credits: 3 },
      { code: "CS 403", name: "AI Fundamentals", credits: 3 },
      { code: "CS 404", name: "Distributed Systems", credits: 3 },
      { code: "CS 405", name: "Computer Security", credits: 3 },
      { code: "MATH 401", name: "Operations Research", credits: 3 },
    ],
  },
]

export const semStyle: Record<SemStatus, { badge: string; dot: string; bar: string; ring: string }> = {
  done: {
    badge: "bg-success/10 text-success",
    dot: "bg-success",
    bar: "bg-success",
    ring: "border-success/30",
  },
  active: {
    badge: "bg-primary/10 text-primary",
    dot: "bg-primary animate-pulse",
    bar: "bg-primary",
    ring: "border-primary/40",
  },
  upcoming: {
    badge: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground/30",
    bar: "bg-muted-foreground/20",
    ring: "border-border",
  },
}

export const dashStats = [
  { value: "—", label: "GPA", colorClass: "text-primary" },
  { value: "—", label: "Credits Earned", colorClass: "text-success" },
  { value: "—", label: "Enrolled", colorClass: "text-info" },
  { value: "—", label: "Remaining", colorClass: "text-muted-foreground" },
]
