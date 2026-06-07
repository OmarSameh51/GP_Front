import axios from "axios"
import Cookies from "js-cookie"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use((config) => {
  const token = Cookies.get("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      Cookies.remove("token")
      localStorage.removeItem("auth-storage")
      const locale =
        document.cookie
          .split("; ")
          .find((r) => r.startsWith("NEXT_LOCALE="))
          ?.split("=")?.[1] ?? "en"
      window.location.href = `/${locale}/login`
    }
    return Promise.reject(error)
  }
)

export default api
