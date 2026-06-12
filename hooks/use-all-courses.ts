import { useQuery } from "@tanstack/react-query"
import api from "@/lib/axios"
import type { CourseSearchResult } from "@/types/api"

export function useAllCourses() {
  return useQuery({
    queryKey: ["all-courses"],
    queryFn: () =>
      api
        .get<{ count: number; courses: CourseSearchResult[] }>("/public/courses")
        .then((r) => r.data.courses),
    staleTime: 10 * 60_000,
  })
}
