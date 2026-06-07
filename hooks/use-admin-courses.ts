import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"
import type { Course } from "@/types/api"

type CoursesResponse = { count: number; courses: Course[] } | Course[]

export function useAdminCourses() {
  return useQuery({
    queryKey: ["admin", "courses"],
    queryFn: () =>
      api.get<CoursesResponse>("/admin/courses").then((r) => {
        const data = r.data
        return Array.isArray(data) ? data : data.courses
      }),
    staleTime: 60 * 1000,
  })
}

type CreateCourseBody = {
  Code: string
  name: string
  Credits: number
  Semester: number
  Required_level: number
  Required_Hours: number
  isActive: boolean
}

type UpdateCourseBody = Partial<{
  isActive: boolean
  Required_level: number
  Required_Hours: number
  Semester: number
}>

export function useCreateCourse() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: CreateCourseBody) => api.post("/admin/course", body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "courses"] }),
  })
}

export function useUpdateCourse() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ courseCode, body }: { courseCode: string; body: UpdateCourseBody }) =>
      api.patch(`/admin/course/${courseCode}`, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "courses"] }),
  })
}

export function useDeleteAdminStudent() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (studentId: string) => api.delete(`/admin/student/${studentId}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "students"] }),
  })
}
