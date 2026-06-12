import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"
import type { Summary, SummaryListItem } from "@/types/api"

export function useSummaries() {
  return useQuery({
    queryKey: ["summaries"],
    queryFn: () => api.get<SummaryListItem[]>("/user/summaries").then((r) => r.data),
  })
}

export function useSummary(id: string | null) {
  return useQuery({
    queryKey: ["summaries", id],
    queryFn: () => api.get<Summary>(`/user/summaries/${id}`).then((r) => r.data),
    enabled: !!id,
  })
}

export function useCreateSummary() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: { title: string; text: string }) =>
      api.post<Summary>("/user/summaries", body).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["summaries"] }),
  })
}

export function useDeleteSummary() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/user/summaries/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["summaries"] }),
  })
}
