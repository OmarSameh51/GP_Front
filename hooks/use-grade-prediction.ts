import { useMutation } from "@tanstack/react-query"
import api from "@/lib/axios"
import type { GradePrediction } from "@/types/api"

type Vars = {
  coursework: number
  midterm: number
  courseworkMax: number
  midtermMax: number
}

export function useGradePrediction() {
  return useMutation({
    mutationFn: (vars: Vars) =>
      api.post<GradePrediction>("/user/grade-prediction", vars).then((r) => r.data),
  })
}
