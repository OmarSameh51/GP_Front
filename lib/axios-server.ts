import axios from "axios"
import { cookies } from "next/headers"

export async function createServerApi() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const serverApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })

  return serverApi
}
