"use client"

import { useEffect } from "react"
import { useRouter } from "@/i18n/navigation"
import { useProfile } from "@/hooks/use-profile"
import { useAuthStore } from "@/store/auth"
import { PageSkeleton } from "@/components/page-skeleton"
import type { Role } from "@/types/api"

type RoleGuardProps = {
  requiredRole: "admin" | "super_admin"
  children: React.ReactNode
}

const roleRank: Record<Role, number> = {
  student: 0,
  admin: 1,
  super_admin: 2,
}

export function RoleGuard({ requiredRole, children }: RoleGuardProps) {
  const router = useRouter()
  const setRole = useAuthStore((s) => s.setRole)
  const { data: profile, isLoading, isError } = useProfile()

  useEffect(() => {
    if (profile) {
      setRole(profile.role)
      if (roleRank[profile.role] < roleRank[requiredRole]) {
        router.replace("/")
      }
    }
    if (isError) router.replace("/login")
  }, [profile, isError, requiredRole, router, setRole])

  if (isLoading || !profile) return <PageSkeleton />
  if (roleRank[profile.role] < roleRank[requiredRole]) return null

  return <>{children}</>
}
