import { Badge } from "@/components/ui/badge"

type Status = "available" | "enrolled" | "completed" | "locked" | "recommended"

const styles: Record<Status, string> = {
  available: "bg-secondary text-secondary-foreground",
  enrolled: "bg-info/15 text-info",
  completed: "bg-success/15 text-success",
  locked: "bg-muted text-muted-foreground",
  recommended: "bg-accent/15 text-amber-700 dark:text-accent",
}

const labels: Record<Status, string> = {
  available: "Available",
  enrolled: "Enrolled",
  completed: "Completed",
  locked: "Locked",
  recommended: "Recommended",
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge variant="outline" className={`border-0 text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </Badge>
  )
}
