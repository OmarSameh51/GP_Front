"use client"

import { GraduationCap, Users, BookOpen, Network, ShieldCheck, LogOut } from "lucide-react"
import { Link, useRouter, usePathname } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { useAuthStore } from "@/store/auth"
import { useProfile } from "@/hooks/use-profile"

export function AdminNav() {
  const t = useTranslations("admin")
  const pathname = usePathname()
  const router = useRouter()
  const { clearAuth } = useAuthStore()
  const { data: profile } = useProfile()

  function handleSignOut() {
    clearAuth()
    router.push("/")
  }

  const isSuperAdmin = profile?.role === "super_admin"

  const navLinks = [
    { href: "/dashboard/students" as const, icon: Users, label: t("students") },
    { href: "/dashboard/courses" as const, icon: BookOpen, label: t("courses") },
    { href: "/dashboard/courses/relations" as const, icon: Network, label: t("relations") },
  ]

  return (
    <aside className="bg-card border-border flex h-screen w-60 flex-col border-e">
      <div className="border-border flex h-14 items-center gap-2 border-b px-5">
        <GraduationCap className="text-primary size-5" />
        <span className="text-foreground text-sm font-semibold">{t("brand")}</span>
        <span className="bg-primary/10 text-primary ms-auto rounded px-1.5 py-0.5 font-mono text-[10px] uppercase">
          {t("adminBadge")}
        </span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navLinks.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/")
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          )
        })}

        {isSuperAdmin && (
          <Link
            href="/dashboard/super-admin/admins"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname.startsWith("/dashboard/super-admin")
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <ShieldCheck className="size-4" />
            {t("admins")}
          </Link>
        )}
      </nav>

      <div className="border-border border-t p-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="bg-primary/10 text-primary flex size-7 items-center justify-center rounded-full text-xs font-semibold">
            {profile?.firstName?.[0]}{profile?.lastName?.[0]}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-foreground truncate text-xs font-medium">
              {profile?.firstName} {profile?.lastName}
            </p>
            <p className="text-muted-foreground font-mono text-[10px] capitalize">{profile?.role}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
