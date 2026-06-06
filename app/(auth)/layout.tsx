import Link from "next/link"
import { GraduationCap, BookOpen, Brain, TrendingUp, ArrowLeft } from "lucide-react"

const features = [
  { icon: BookOpen, text: "120+ CS courses mapped across 8 semesters" },
  { icon: TrendingUp, text: "Real-time GPA tracking and graduation projections" },
  { icon: Brain, text: "AI advisor tailored to the Helwan curriculum" },
]

const miniStats = [
  { value: "120+", label: "Courses" },
  { value: "144", label: "Credits" },
  { value: "8", label: "Semesters" },
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* ── Left brand panel ───────────────────────────────────────────── */}
      <div className="sticky top-0 hidden h-screen w-[460px] shrink-0 flex-col justify-between overflow-hidden border-r border-border bg-card px-10 py-10 lg:flex">
        {/* glows */}
        <div className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full bg-primary/8 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 size-64 rounded-full bg-primary/5 blur-[80px]" />

        {/* logo */}
        <Link href="/" className="relative flex items-center gap-2 text-sm font-semibold text-foreground">
          <GraduationCap className="size-5 text-primary" />
          Helwan CS
        </Link>

        {/* center content */}
        <div className="relative space-y-8">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Faculty of Computer Science
            </p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground">
              Graduate with
              <br />a plan.
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The all-in-one academic platform built specifically for Helwan CS students.
            </p>
          </div>

          {/* feature bullets */}
          <div className="space-y-3">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-3">
                <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10">
                  <Icon className="size-3.5 text-primary" />
                </div>
                <p className="text-sm text-foreground">{text}</p>
              </div>
            ))}
          </div>

          {/* mini stats widget */}
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
            {miniStats.map(({ value, label }) => (
              <div key={label} className="bg-background px-4 py-3 text-center">
                <p className="text-lg font-bold tabular-nums text-foreground">{value}</p>
                <p className="text-[10px] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* footer */}
        <p className="relative text-xs text-muted-foreground">
          © 2025 Helwan University · Faculty of Computer Science
        </p>
      </div>

      {/* ── Right form panel ───────────────────────────────────────────── */}
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-12">
        {/* subtle glow on mobile */}
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-[80px] lg:hidden" />

        <div className="w-full max-w-sm">
          {/* mobile header */}
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <GraduationCap className="size-5 text-primary" />
              Helwan CS
            </Link>
            <Link
              href="/"
              className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              Home
            </Link>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
