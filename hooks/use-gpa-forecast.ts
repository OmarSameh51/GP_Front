import { useMutation } from "@tanstack/react-query"
import api from "@/lib/axios"
import type { GpaForecast } from "@/types/api"

export function useGpaForecast() {
  return useMutation({
    mutationFn: () =>
      api.post<GpaForecast>("/user/gpa-forecast").then((r) => r.data),
  })
}
