import { BookOpen, CheckCircle, Clock, Lock, Brain, GraduationCap, Star, ChevronRight } from "lucide-react"
import {
  RegisterDialog,
  DropCourseAlert,
  CourseDetailSheet,
  CourseDrawer,
  TooltipShowcase,
  BadgeShowcase,
} from "./overlay-showcase"

// ─── Helpers ────────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-6">
      <h2 className="font-heading border-border text-foreground border-b pb-3 text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground mt-2 font-mono text-xs">{children}</p>
}

// ─── Color Swatch ────────────────────────────────────────────────────────────

function Swatch({
  bg,
  label,
  textClass = "text-white",
  border = false,
}: {
  bg: string
  label: string
  textClass?: string
  border?: boolean
}) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={`flex h-16 w-full items-end rounded-lg p-2 ${bg} ${border ? "border-border border" : ""}`}
      >
        <span className={`font-mono text-[10px] font-medium ${textClass}`}>{label}</span>
      </div>
    </div>
  )
}

// ─── Course Status Badge ─────────────────────────────────────────────────────

type CourseStatus = "available" | "enrolled" | "completed" | "locked" | "recommended"

const statusConfig: Record<
  CourseStatus,
  { label: string; icon: React.ReactNode; classes: string }
> = {
  available: {
    label: "Available",
    icon: <BookOpen className="size-3" />,
    classes: "bg-secondary text-secondary-foreground",
  },
  enrolled: {
    label: "Enrolled",
    icon: <Clock className="size-3" />,
    classes: "bg-info/15 text-info",
  },
  completed: {
    label: "Completed",
    icon: <CheckCircle className="size-3" />,
    classes: "bg-success/15 text-success",
  },
  locked: {
    label: "Locked",
    icon: <Lock className="size-3" />,
    classes: "bg-muted text-muted-foreground",
  },
  recommended: {
    label: "Recommended",
    icon: <Brain className="size-3" />,
    classes: "bg-accent/15 text-amber-700 dark:text-accent",
  },
}

function StatusBadge({ status }: { status: CourseStatus }) {
  const { label, icon, classes } = statusConfig[status]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${classes}`}>
      {icon}
      {label}
    </span>
  )
}

// ─── Course Card ─────────────────────────────────────────────────────────────

function CourseCard({
  code,
  name,
  credits,
  department,
  status,
  description,
}: {
  code: string
  name: string
  credits: number
  department: string
  status: CourseStatus
  description: string
}) {
  return (
    <div className="bg-card border-border hover:border-primary/30 group flex flex-col gap-3 rounded-xl border p-5 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-muted-foreground font-mono text-xs">{code}</p>
          <h3 className="text-foreground mt-0.5 font-semibold leading-snug">{name}</h3>
        </div>
        <StatusBadge status={status} />
      </div>

      <p className="text-muted-foreground line-clamp-2 text-sm">{description}</p>

      <div className="border-border flex items-center justify-between border-t pt-3">
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground text-xs">{department}</span>
          <span className="bg-border h-3 w-px" />
          <span className="text-muted-foreground text-xs">{credits} cr</span>
        </div>
        <button className="text-primary group-hover:text-primary/80 flex items-center gap-0.5 text-xs font-medium transition-colors">
          Details <ChevronRight className="size-3" />
        </button>
      </div>
    </div>
  )
}

// ─── GPA Ring ────────────────────────────────────────────────────────────────

function GpaRing({ gpa }: { gpa: number }) {
  const pct = (gpa / 4) * 100
  const r = 36
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ

  return (
    <div className="relative flex size-24 items-center justify-center">
      <svg width="96" height="96" viewBox="0 0 96 96" className="absolute inset-0 -rotate-90">
        <circle cx="48" cy="48" r={r} fill="none" strokeWidth="8" className="stroke-muted" />
        <circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="stroke-primary transition-all duration-700"
        />
      </svg>
      <div className="relative flex flex-col items-center leading-tight">
        <span className="text-foreground text-xl font-bold">{gpa.toFixed(2)}</span>
        <span className="text-muted-foreground text-[10px]">GPA</span>
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <div className="from-primary/8 to-background border-border border-b bg-gradient-to-b px-8 py-14">
        <div className="mx-auto max-w-4xl">
          <div className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium">
            <GraduationCap className="size-4" />
            Academic Course System
          </div>
          <h1 className="text-foreground font-heading text-5xl font-bold tracking-tight">
            Design System
          </h1>
          <p className="text-muted-foreground mt-3 max-w-xl text-lg">
            Tokens, components, and patterns used across the platform. Press{" "}
            <kbd className="bg-muted border-border rounded-md border px-1.5 py-0.5 font-mono text-sm">D</kbd>{" "}
            to toggle dark mode.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-16 px-8 py-14">
        {/* ── Colors ── */}
        <Section title="Color Tokens">
          <div className="space-y-8">
            {/* Primary */}
            <div>
              <p className="text-foreground mb-3 text-sm font-medium">Primary — Indigo</p>
              <div className="grid grid-cols-5 gap-2">
                <Swatch bg="bg-primary/20" textClass="text-primary" label="primary/20" border />
                <Swatch bg="bg-primary/40" textClass="text-primary" label="primary/40" />
                <Swatch bg="bg-primary/60" label="primary/60" />
                <Swatch bg="bg-primary/80" label="primary/80" />
                <Swatch bg="bg-primary" label="primary" />
              </div>
            </div>

            {/* Accent */}
            <div>
              <p className="text-foreground mb-3 text-sm font-medium">Accent — Amber</p>
              <div className="grid grid-cols-5 gap-2">
                <Swatch bg="bg-accent/20" textClass="text-accent-foreground" label="accent/20" border />
                <Swatch bg="bg-accent/40" textClass="text-accent-foreground" label="accent/40" />
                <Swatch bg="bg-accent/60" textClass="text-accent-foreground" label="accent/60" />
                <Swatch bg="bg-accent/80" textClass="text-accent-foreground" label="accent/80" />
                <Swatch bg="bg-accent" textClass="text-accent-foreground" label="accent" />
              </div>
            </div>

            {/* Semantic */}
            <div>
              <p className="text-foreground mb-3 text-sm font-medium">Semantic</p>
              <div className="grid grid-cols-4 gap-2">
                <Swatch bg="bg-success" label="success" />
                <Swatch bg="bg-warning" textClass="text-accent-foreground" label="warning" />
                <Swatch bg="bg-info" label="info" />
                <Swatch bg="bg-destructive" label="destructive" />
              </div>
            </div>

            {/* Surface */}
            <div>
              <p className="text-foreground mb-3 text-sm font-medium">Surface</p>
              <div className="grid grid-cols-4 gap-2">
                <Swatch bg="bg-background" textClass="text-foreground" label="background" border />
                <Swatch bg="bg-card" textClass="text-foreground" label="card" border />
                <Swatch bg="bg-muted" textClass="text-foreground" label="muted" border />
                <Swatch bg="bg-secondary" textClass="text-secondary-foreground" label="secondary" border />
              </div>
            </div>
          </div>
        </Section>

        {/* ── Typography ── */}
        <Section title="Typography">
          <div className="bg-card border-border space-y-6 rounded-xl border p-6">
            <div>
              <h1 className="text-foreground font-heading text-5xl font-bold tracking-tight">
                Heading 1 — 5xl Bold
              </h1>
              <Label>text-5xl font-bold tracking-tight</Label>
            </div>
            <div>
              <h2 className="text-foreground font-heading text-4xl font-semibold tracking-tight">
                Heading 2 — 4xl Semibold
              </h2>
              <Label>text-4xl font-semibold tracking-tight</Label>
            </div>
            <div>
              <h3 className="text-foreground font-heading text-2xl font-semibold">
                Heading 3 — 2xl Semibold
              </h3>
              <Label>text-2xl font-semibold</Label>
            </div>
            <div>
              <h4 className="text-foreground text-lg font-medium">Heading 4 — lg Medium</h4>
              <Label>text-lg font-medium</Label>
            </div>
            <div>
              <p className="text-foreground text-base">
                Body — The student course management platform helps undergraduates plan their
                academic journey with intelligent recommendations.
              </p>
              <Label>text-base (default)</Label>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">
                Small / Muted — Use for supporting labels, timestamps, and helper text throughout
                the interface.
              </p>
              <Label>text-sm text-muted-foreground</Label>
            </div>
            <div>
              <p className="font-mono text-sm">
                Mono — CS401 · GPA 3.72 · Credit Hours: 18
              </p>
              <Label>font-mono text-sm</Label>
            </div>
            <div>
              <p className="font-mono text-6xl font-bold tabular-nums text-foreground">3.72</p>
              <Label>font-mono text-6xl font-bold tabular-nums — big stat numeral</Label>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">STU-2024-0042819</p>
              <Label>font-mono text-xs uppercase tracking-widest — course codes, student IDs</Label>
            </div>
          </div>
        </Section>

        {/* ── Buttons ── */}
        <Section title="Buttons">
          <div className="bg-card border-border rounded-xl border p-6">
            <div className="flex flex-wrap items-center gap-3">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
                Primary
              </button>
              <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
                Secondary
              </button>
              <button className="bg-accent text-accent-foreground hover:bg-accent/80 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
                Accent
              </button>
              <button className="border-border text-foreground hover:bg-muted rounded-lg border px-4 py-2 text-sm font-medium transition-colors">
                Outline
              </button>
              <button className="text-foreground hover:bg-muted rounded-lg px-4 py-2 text-sm font-medium transition-colors">
                Ghost
              </button>
              <button className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
                Destructive
              </button>
              <button
                disabled
                className="bg-muted text-muted-foreground cursor-not-allowed rounded-lg px-4 py-2 text-sm font-medium"
              >
                Disabled
              </button>
            </div>
          </div>
        </Section>

        {/* ── Border Radius ── */}
        <Section title="Border Radius">
          <div className="bg-card border-border rounded-xl border p-6">
            <div className="flex flex-wrap items-end gap-4">
              {[
                { cls: "rounded-sm", label: "sm" },
                { cls: "rounded-md", label: "md" },
                { cls: "rounded-lg", label: "lg (base)" },
                { cls: "rounded-xl", label: "xl" },
                { cls: "rounded-2xl", label: "2xl" },
                { cls: "rounded-full", label: "full" },
              ].map(({ cls, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className={`bg-primary/15 border-primary/30 size-14 border ${cls}`} />
                  <Label>{label}</Label>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Course Status Badges ── */}
        <Section title="Course Status Badges">
          <div className="bg-card border-border rounded-xl border p-6">
            <div className="flex flex-wrap gap-3">
              {(Object.keys(statusConfig) as CourseStatus[]).map((s) => (
                <StatusBadge key={s} status={s} />
              ))}
            </div>
            <div className="border-border mt-6 space-y-3 border-t pt-5">
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                Semantic meaning
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {(
                  [
                    ["available", "Course is open for registration"],
                    ["enrolled", "Student is currently taking this course"],
                    ["completed", "Course passed, credits earned"],
                    ["locked", "Prerequisites not yet met"],
                    ["recommended", "AI-suggested based on your academic path"],
                  ] as [CourseStatus, string][]
                ).map(([s, desc]) => (
                  <div key={s} className="flex items-center gap-3">
                    <StatusBadge status={s} />
                    <span className="text-muted-foreground text-xs">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── Course Cards ── */}
        <Section title="Course Cards">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <CourseCard
              code="CS401"
              name="Machine Learning Fundamentals"
              credits={3}
              department="Computer Science"
              status="recommended"
              description="Covers supervised and unsupervised learning, neural networks, and model evaluation with hands-on projects."
            />
            <CourseCard
              code="MATH302"
              name="Linear Algebra"
              credits={3}
              department="Mathematics"
              status="completed"
              description="Vectors, matrices, eigenvalues, and linear transformations with applications in engineering and data science."
            />
            <CourseCard
              code="CS350"
              name="Operating Systems"
              credits={3}
              department="Computer Science"
              status="enrolled"
              description="Processes, scheduling, memory management, file systems, and concurrency in modern operating systems."
            />
            <CourseCard
              code="CS480"
              name="Distributed Systems"
              credits={3}
              department="Computer Science"
              status="locked"
              description="Fault tolerance, consensus algorithms, and design patterns for large-scale distributed architectures."
            />
          </div>
        </Section>

        {/* ── GPA Ring ── */}
        <Section title="GPA Ring">
          <div className="bg-card border-border rounded-xl border p-6">
            <div className="flex flex-wrap items-center justify-around gap-8">
              <GpaRing gpa={3.72} />
              <GpaRing gpa={2.5} />
              <GpaRing gpa={4.0} />
            </div>
            <Label>SVG circle with stroke-dashoffset driven by (gpa / 4) × 100</Label>
          </div>
        </Section>

        {/* ── Input & Form Elements ── */}
        <Section title="Form Elements">
          <div className="bg-card border-border rounded-xl border p-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Default input */}
              <div className="space-y-1.5">
                <label className="text-foreground text-sm font-medium">Student ID</label>
                <input
                  type="text"
                  placeholder="e.g. 20220123"
                  className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring w-full rounded-lg border px-3 py-2 text-sm outline-none transition-shadow focus:ring-2"
                />
              </div>

              {/* Select */}
              <div className="space-y-1.5">
                <label className="text-foreground text-sm font-medium">Department</label>
                <select className="border-input bg-background text-foreground focus:ring-ring w-full rounded-lg border px-3 py-2 text-sm outline-none transition-shadow focus:ring-2">
                  <option>Computer Science</option>
                  <option>Mathematics</option>
                  <option>Electrical Engineering</option>
                </select>
              </div>

              {/* Error state */}
              <div className="space-y-1.5">
                <label className="text-foreground text-sm font-medium">Email</label>
                <input
                  type="email"
                  defaultValue="invalid-email"
                  className="border-destructive bg-background text-foreground focus:ring-destructive/50 w-full rounded-lg border px-3 py-2 text-sm outline-none transition-shadow focus:ring-2"
                />
                <p className="text-destructive text-xs">Enter a valid university email.</p>
              </div>

              {/* Success state */}
              <div className="space-y-1.5">
                <label className="text-foreground text-sm font-medium">Username</label>
                <input
                  type="text"
                  defaultValue="a.mostafa"
                  className="border-success bg-background text-foreground focus:ring-success/50 w-full rounded-lg border px-3 py-2 text-sm outline-none transition-shadow focus:ring-2"
                />
                <p className="text-success text-xs">Username is available.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── AI Recommendation Banner ── */}
        <Section title="AI Recommendation Banner">
          <div className="bg-card border-border border-l-accent rounded-lg border border-l-2 p-5">
            <div className="flex items-start gap-4">
              <Brain className="text-accent mt-0.5 size-5 shrink-0" />
              <div className="flex-1">
                <p className="text-foreground font-medium">
                  3 courses recommended for next semester
                </p>
                <p className="text-muted-foreground mt-1 text-sm">
                  Based on your completed credits, GPA, and declared major.
                </p>
              </div>
              <button className="border-border text-foreground hover:bg-muted shrink-0 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors">
                View
              </button>
            </div>
          </div>
        </Section>

        {/* ── Stat Strip ── */}
        <Section title="Stat Strip — Ledger">
          <div className="bg-card border-border grid grid-cols-2 divide-x divide-y sm:divide-y-0 sm:grid-cols-4 overflow-hidden rounded-xl border">
            {[
              { label: "GPA", value: "3.72", color: "text-primary" },
              { label: "Credits Earned", value: "87", color: "text-success" },
              { label: "Enrolled", value: "4", color: "text-info" },
              { label: "Remaining", value: "33 cr", color: "text-muted-foreground" },
            ].map(({ label, value, color }) => (
              <div key={label} className="px-6 py-5">
                <p className={`font-mono text-5xl font-bold tabular-nums ${color}`}>{value}</p>
                <p className="text-muted-foreground mt-2 text-xs uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>
          <Label>No icons. Numbers carry the weight. font-mono tabular-nums at text-5xl.</Label>
        </Section>

        {/* ── Badges ── */}
        <Section title="Badges">
          <div className="bg-card border-border rounded-xl border p-6">
            <BadgeShowcase />
          </div>
        </Section>

        {/* ── Tooltips ── */}
        <Section title="Tooltips">
          <div className="bg-card border-border rounded-xl border p-6">
            <TooltipShowcase />
          </div>
        </Section>

        {/* ── Dialog ── */}
        <Section title="Dialog (Modal)">
          <div className="bg-card border-border space-y-4 rounded-xl border p-6">
            <p className="text-muted-foreground text-sm">
              Use dialogs for focused actions that need confirmation or a small form — e.g. course
              registration, editing a record.
            </p>
            <div className="flex flex-wrap gap-3">
              <RegisterDialog />
              <DropCourseAlert />
            </div>
          </div>
        </Section>

        {/* ── Sheet ── */}
        <Section title="Sheet (Side Panel)">
          <div className="bg-card border-border space-y-4 rounded-xl border p-6">
            <p className="text-muted-foreground text-sm">
              Use sheets for richer detail views that don&apos;t warrant a full page — e.g. course
              details, student profile, filter panel.
            </p>
            <CourseDetailSheet />
          </div>
        </Section>

        {/* ── Drawer ── */}
        <Section title="Drawer (Bottom Sheet)">
          <div className="bg-card border-border space-y-4 rounded-xl border p-6">
            <p className="text-muted-foreground text-sm">
              Use drawers for mobile-first flows — e.g. suggested courses list, quick actions,
              swipeable course cards.
            </p>
            <CourseDrawer />
          </div>
        </Section>

        {/* ── Footer note ── */}
        <p className="text-muted-foreground border-border border-t pt-8 text-center text-sm">
          All tokens are defined in{" "}
          <code className="bg-muted rounded px-1 font-mono text-xs">globals.css</code> and consumed
          via Tailwind v4 semantic utilities.
        </p>
      </div>
    </div>
  )
}
