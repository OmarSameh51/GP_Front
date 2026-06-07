type Stat = {
  value: string
  label: string
  colorClass: string
}

export function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <div className="border-border bg-card grid grid-cols-2 divide-x divide-y overflow-hidden rounded-xl border sm:grid-cols-4 sm:divide-y-0">
      {stats.map(({ value, label, colorClass }) => (
        <div key={label} className="px-6 py-5">
          <p className={`font-mono text-5xl font-bold tabular-nums ${colorClass}`}>{value}</p>
          <p className="text-muted-foreground mt-2 text-xs uppercase tracking-wider">{label}</p>
        </div>
      ))}
    </div>
  )
}
