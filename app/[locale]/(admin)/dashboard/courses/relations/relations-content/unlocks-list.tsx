import type { Course } from "@/types/api"

export function UnlocksList({ unlocks }: { unlocks: Course[] }) {
  if (unlocks.length === 0) {
    return <p className="text-muted-foreground text-sm">No courses unlocked.</p>
  }

  return (
    <div className="space-y-2">
      {unlocks.map((c) => (
        <div
          key={c.Code}
          className="border-border rounded-lg border px-4 py-3"
        >
          <p className="text-muted-foreground font-mono text-xs">{c.Code}</p>
          <p className="text-foreground text-sm font-medium">{c.name}</p>
        </div>
      ))}
    </div>
  )
}
