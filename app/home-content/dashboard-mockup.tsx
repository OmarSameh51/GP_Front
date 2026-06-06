import { Brain } from "lucide-react"

export function DashboardMockup() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-[0_32px_80px_-12px_oklch(0_0_0/0.15)]">
      {/* chrome */}
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-red-400/70" />
        <span className="size-2.5 rounded-full bg-yellow-400/70" />
        <span className="size-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 font-mono text-[10px] text-muted-foreground">
          helwancs.edu/dashboard
        </span>
      </div>

      {/* top bar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            20211234 · Spring 2025
          </p>
          <p className="text-sm font-semibold text-foreground">Ahmed Hassan</p>
        </div>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
          Year 3
        </span>
      </div>

      <div className="space-y-3 p-4">
        {/* stat cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-border bg-background p-3">
            <p className="mb-1 text-[10px] text-muted-foreground">Current GPA</p>
            <p className="text-2xl font-bold tabular-nums text-foreground">3.42</p>
            <p className="mt-0.5 text-[10px] text-success">↑ +0.12</p>
          </div>
          <div className="rounded-xl border border-border bg-background p-3">
            <p className="mb-1 text-[10px] text-muted-foreground">Credits</p>
            <p className="text-2xl font-bold tabular-nums text-foreground">80</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">of 132</p>
          </div>
          <div className="rounded-xl border border-border bg-background p-3">
            <p className="mb-1 text-[10px] text-muted-foreground">Progress</p>
            <p className="text-2xl font-bold tabular-nums text-foreground">61%</p>
            <div className="mt-1.5 h-1 rounded-full bg-muted">
              <div className="h-full w-[61%] rounded-full bg-primary" />
            </div>
          </div>
        </div>

        {/* course list */}
        <div className="rounded-xl border border-border bg-background p-3">
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
            Current Semester
          </p>
          <div className="space-y-1.5">
            {[
              { name: "Algorithms", code: "CS 301", grade: "A", done: true },
              { name: "Database Systems", code: "CS 304", grade: "B+", done: true },
              { name: "OS", code: "CS 303", grade: "—", done: false },
              { name: "Networks", code: "CS 305", grade: "—", done: false },
            ].map((c) => (
              <div key={c.code} className="flex items-center justify-between">
                <div className="flex min-w-0 items-center gap-2">
                  <span className={`size-1.5 shrink-0 rounded-full ${c.done ? "bg-success" : "bg-primary"}`} />
                  <span className="truncate text-[11px] text-foreground">{c.name}</span>
                  <span className="font-mono text-[9px] text-muted-foreground">{c.code}</span>
                </div>
                <span className={`font-mono text-[11px] font-semibold tabular-nums ${c.done ? "text-success" : "text-muted-foreground"}`}>
                  {c.grade}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI advisor bubble */}
        <div className="rounded-xl border border-border bg-primary/5 p-3">
          <div className="flex gap-2">
            <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
              <Brain className="size-3 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-foreground">AI Advisor</p>
              <p className="mt-0.5 text-[10px] leading-relaxed text-muted-foreground">
                Complete <span className="font-medium text-primary">CS 303 (OS)</span> this
                semester before registering for Distributed Systems — it&apos;s a hard prerequisite.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
