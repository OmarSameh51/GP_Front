import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"

type AddCourseBody = {
  courseCode: string
  grade: number
  isPassed: boolean
}

type EditCourseBody = {
  grade: number
  isPassed: boolean
}

export function useAddCourse() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: AddCourseBody) => api.post("/user/course", body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }),
  })
}

export function useEditCourse() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ courseId, body }: { courseId: string; body: EditCourseBody }) =>
      api.patch(`/user/course/${courseId}`, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }),
  })
}

export function useDeleteCourse() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (courseId: string) => api.delete(`/user/course/${courseId}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }),
  })
}
