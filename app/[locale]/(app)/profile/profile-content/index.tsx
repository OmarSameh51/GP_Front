"use client"

import { useTranslations } from "next-intl"
import { useProfile } from "@/hooks/use-profile"
import { PageSkeleton } from "@/components/page-skeleton"
import { ErrorState } from "@/components/error-state"
import { ProfileHeader } from "./profile-header"
import { DepartmentForm } from "./department-form"
import { PasswordForm } from "./password-form"

export function ProfileContent() {
  const t = useTranslations("profile")
  const { data: profile, isLoading, isError, refetch } = useProfile()

  if (isLoading) return <PageSkeleton />
  if (isError || !profile)
    return <ErrorState onRetry={refetch} />

  return (
    <main className="mx-auto max-w-5xl px-6 py-10 space-y-6">
      <div>
        <h1 className="text-foreground text-4xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground mt-1 text-sm">{t("subtitle")}</p>
      </div>

      <ProfileHeader profile={profile} />
      <DepartmentForm profile={profile} />
      <PasswordForm />
    </main>
  )
}
