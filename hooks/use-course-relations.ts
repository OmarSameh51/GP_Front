import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"
import type { CourseRelations } from "@/types/api"

export function useCourseRelations(courseCode: string) {
  return useQuery({
    queryKey: ["admin", "course-relations", courseCode],
    queryFn: () =>
      api.get<CourseRelations>(`/admin/course/${courseCode}/relations`).then((r) => r.data),
    staleTime: 60 * 1000,
    enabled: !!courseCode,
  })
}

export function useAddPrerequisite(courseCode: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (prerequisiteCode: string) =>
      api.post(`/admin/course/${courseCode}/prerequisite`, { prerequisiteCode }),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["admin", "course-relations", courseCode] }),
  })
}

export function useRemovePrerequisite(courseCode: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (prerequisiteCode: string) =>
      api.delete(`/admin/course/${courseCode}/prerequisite/${prerequisiteCode}`),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["admin", "course-relations", courseCode] }),
  })
}
