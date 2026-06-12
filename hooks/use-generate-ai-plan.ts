import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"
import type { AIAdviceResponse } from "@/types/api"

type Vars = { semester?: 1 | 2 }

export function useGenerateAIPlan() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (vars: Vars = {}) =>
      api
        .post<AIAdviceResponse>("/user/ai-plan/generate", vars)
        .then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] })
    },
  })
}
