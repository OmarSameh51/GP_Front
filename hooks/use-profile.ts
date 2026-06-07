import { useQuery } from "@tanstack/react-query"
import api from "@/lib/axios"
import type { UserProfile } from "@/types/api"

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => api.get<UserProfile>("/user/profile").then((r) => r.data),
    staleTime: 2 * 60 * 1000,
  })
}
