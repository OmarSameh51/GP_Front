import { AlertCircle, TrendingUp, Zap, ChevronRight } from "lucide-react"

const recs = [
  {
    icon: AlertCircle,
    color: "text-warning",
    bg: "bg-warning/10",
    title: "Prerequisite Warning",
    msg: "Enroll in OS (CS 303) before Distributed Systems opens for you next semester.",
    action: "View path",
  },
  {
    icon: TrendingUp,
    color: "text-success",
    bg: "bg-success/10",
    title: "Dean's List Track",
    msg: "Maintain a 3.5+ this semester and you qualify for the Dean's List.",
    action: "See courses",
  },
  {
    icon: Zap,
    color: "text-primary",
    bg: "bg-primary/10",
    title: "Elective Suggestion",
    msg: "You have 2 free elective slots — AI Fundamentals aligns with your track.",
    action: "Explore",
  },
]

export function AdvisorPreview() {
  return (
    <div className="space-y-2 rounded-xl border border-border bg-background p-3">
      {recs.map(({ icon: Icon, color, bg, title, msg, action }) => (
        <div key={title} className={`rounded-lg ${bg} p-3`}>
          <div className="flex items-start gap-2.5">
            <Icon className={`mt-0.5 size-3.5 shrink-0 ${color}`} />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold text-foreground">{title}</p>
              <p className="mt-0.5 text-[10px] leading-relaxed text-muted-foreground">{msg}</p>
            </div>
          </div>
          <button className={`mt-2 flex items-center gap-0.5 text-[9px] font-medium ${color}`}>
            {action} <ChevronRight className="size-2.5" />
          </button>
        </div>
      ))}
    </div>
  )
}
