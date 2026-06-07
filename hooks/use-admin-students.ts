import { useQuery } from "@tanstack/react-query"
import api from "@/lib/axios"
import type { UserProfile } from "@/types/api"

type StudentsResponse = {
  count: number
  students: UserProfile[]
}

export function useAdminStudents() {
  return useQuery({
    queryKey: ["admin", "students"],
    queryFn: () => api.get<StudentsResponse>("/admin/students").then((r) => r.data),
    staleTime: 30 * 1000,
  })
}

export function useAdminStudent(studentId: string) {
  return useQuery({
    queryKey: ["admin", "student", studentId],
    queryFn: () => api.get<UserProfile>(`/admin/student/${studentId}`).then((r) => r.data),
    staleTime: 60 * 1000,
    enabled: !!studentId,
  })
}
