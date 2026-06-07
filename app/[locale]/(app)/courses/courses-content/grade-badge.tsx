import { gradeToLetter } from "@/lib/grade"

export function GradeBadge({ grade, isPassed }: { grade: number; isPassed: boolean }) {
  return (
    <span
      className={`font-mono text-sm tabular-nums ${isPassed ? "text-success" : "text-destructive"}`}
    >
      {grade} / {gradeToLetter(grade)}
    </span>
  )
}
