import Cookies from "js-cookie"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export type User = {
  id: string
  studentId: string
  email: string
  firstName: string
  lastName: string
}

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
}

const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        Cookies.set("token", token, { expires: 7 })
        set({ user, isAuthenticated: true })
      },

      clearAuth: () => {
        Cookies.remove("token")
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : noopStorage
      ),
    }
  )
)
