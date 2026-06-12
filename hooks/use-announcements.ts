import { useQuery, keepPreviousData } from "@tanstack/react-query"
import api from "@/lib/axios"
import type { AnnouncementsResponse } from "@/types/api"

export function useAnnouncements(limit: number) {
  return useQuery({
    queryKey: ["announcements", limit],
    queryFn: () =>
      api
        .get<AnnouncementsResponse>("/user/announcements", { params: { limit } })
        .then((r) => r.data),
    placeholderData: keepPreviousData,
  })
}
