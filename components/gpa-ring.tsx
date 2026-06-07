"use client"

import { useEffect, useState } from "react"

export function GpaRing({ gpa }: { gpa: number }) {
  const r = 36
  const circ = 2 * Math.PI * r
  const [offset, setOffset] = useState(circ)

  useEffect(() => {
    const t = setTimeout(() => setOffset(circ - (gpa / 4) * circ), 50)
    return () => clearTimeout(t)
  }, [gpa, circ])

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
