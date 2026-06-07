export function PageSkeleton() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse space-y-6 px-6 py-10">
      <div className="space-y-2">
        <div className="bg-muted h-3 w-24 rounded" />
        <div className="bg-muted h-8 w-48 rounded" />
        <div className="bg-muted h-3 w-36 rounded" />
      </div>

      <div className="border-border grid grid-cols-2 overflow-hidden rounded-xl border sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border-border border-r px-6 py-5 last:border-r-0">
            <div className="bg-muted h-12 w-16 rounded" />
            <div className="bg-muted mt-2 h-3 w-20 rounded" />
          </div>
        ))}
      </div>

      <div className="border-border space-y-3 rounded-xl border p-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-muted h-10 rounded" />
        ))}
      </div>
    </div>
  )
}
