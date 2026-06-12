"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Loader2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAllCourses } from "@/hooks/use-all-courses"
import type { CourseSearchResult } from "@/types/api"
import { cn } from "@/lib/utils"

type Props = {
  placeholder?: string
  noResultsText?: string
  onSelect: (course: CourseSearchResult) => void
  excludeCodes?: string[]
  className?: string
}

/** Matches if every whitespace-separated word in the query is a substring of
 *  the course's code or name, regardless of order (e.g. "language programming"
 *  matches "Programming Language 1"). */
function matchesQuery(course: CourseSearchResult, query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  const haystack = `${course.Code} ${course.name}`.toLowerCase()
  return words.every((word) => haystack.includes(word))
}

export function CourseSearchSelect({ placeholder, noResultsText, onSelect, excludeCodes, className }: Props) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { data: courses, isLoading } = useAllCourses()

  const results = useMemo(() => {
    if (!courses) return []
    const trimmed = query.trim()
    if (!trimmed) return []
    const excluded = new Set(excludeCodes ?? [])
    return courses.filter((c) => !excluded.has(c.Code) && matchesQuery(c, trimmed)).slice(0, 20)
  }, [courses, query, excludeCodes])

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  const showDropdown = open && query.trim().length > 0

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="relative">
        <Search className="text-muted-foreground pointer-events-none absolute start-2.5 top-1/2 size-4 -translate-y-1/2" />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="h-9 ps-8"
        />
        {isLoading && (
          <Loader2 className="text-muted-foreground absolute end-2.5 top-1/2 size-3.5 -translate-y-1/2 animate-spin" />
        )}
      </div>

      {showDropdown && (
        <div className="bg-popover text-popover-foreground border-border absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-md border shadow-md">
          {results.length > 0 ? (
            results.map((course) => (
              <button
                key={course.Code}
                type="button"
                onClick={() => {
                  onSelect(course)
                  setQuery("")
                  setOpen(false)
                }}
                className="hover:bg-muted flex w-full items-center justify-between gap-3 px-3 py-2 text-start text-sm"
              >
                <span className="truncate">{course.name}</span>
                <span className="text-muted-foreground shrink-0 font-mono text-xs">{course.Code}</span>
              </button>
            ))
          ) : !isLoading ? (
            <p className="text-muted-foreground px-3 py-2 text-sm">{noResultsText}</p>
          ) : null}
        </div>
      )}
    </div>
  )
}
