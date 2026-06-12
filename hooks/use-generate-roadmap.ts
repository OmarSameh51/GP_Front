import { useMutation } from "@tanstack/react-query"
import api from "@/lib/axios"
import type { RoadmapResponse } from "@/types/api"

type Vars = { semester?: 1 | 2 }

export function useGenerateRoadmap() {
  return useMutation({
    mutationFn: (vars: Vars = {}) =>
      api
        .post<RoadmapResponse>("/user/ai-plan/roadmap", vars)
        .then((r) => r.data),
  })
}
