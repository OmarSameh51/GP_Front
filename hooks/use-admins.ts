import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"
import type { AdminUser } from "@/types/api"

export function useAdmins() {
  return useQuery({
    queryKey: ["super-admin", "admins"],
    queryFn: () => api.get<AdminUser[]>("/super-admin/admins").then((r) => r.data),
    staleTime: 30 * 1000,
  })
}

type CreateAdminBody = {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  phoneNumber: string
}

type UpdateAdminBody = {
  username?: string
  phoneNumber?: string
}

export function useCreateAdmin() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: CreateAdminBody) => api.post("/super-admin/create-admin", body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["super-admin", "admins"] }),
  })
}

export function useUpdateAdmin() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ username, body }: { username: string; body: UpdateAdminBody }) =>
      api.put(`/super-admin/admin/${username}`, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["super-admin", "admins"] }),
  })
}

export function useDeleteAdmin() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (username: string) => api.delete(`/super-admin/admin/${username}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["super-admin", "admins"] }),
  })
}
