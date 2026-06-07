"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import type { Course } from "@/types/api"

type CourseSelectorProps = {
  courses: Course[]
  selected: string
  onSelect: (code: string) => void
}

export function CourseSelector({ courses, selected, onSelect }: CourseSelectorProps) {
  const [search, setSearch] = useState(selected)
  const [open, setOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return courses.filter(
      (c) => c.Code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
    ).slice(0, 8)
  }, [courses, search])

  return (
    <div className="relative max-w-xs">
      <Input
        placeholder="Search course code or name…"
        value={search}
        onChange={(e) => { setSearch(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
      />
      {open && filtered.length > 0 && (
        <div className="border-border bg-card absolute z-10 mt-1 w-full overflow-hidden rounded-lg border shadow-md">
          {filtered.map((c) => (
            <button
              key={c.Code}
              onMouseDown={() => {
                onSelect(c.Code)
                setSearch(c.Code)
                setOpen(false)
              }}
              className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-muted ${
                c.Code === selected ? "bg-primary/10 text-primary" : ""
              }`}
            >
              <span className="text-muted-foreground font-mono text-xs w-16 shrink-0">{c.Code}</span>
              <span className="text-foreground truncate">{c.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
