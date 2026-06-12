"use client"

import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { GraduationCap, Users, BookOpen, Network, ShieldCheck, LogOut, Menu, X } from "lucide-react"
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
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  function handleSignOut() {
    clearAuth()
    // Drop all cached queries (profile, courses, etc.) so the next user that
    // signs in never sees the previous user's data.
    queryClient.clear()
    router.push("/")
  }

  const isSuperAdmin = profile?.role === "super_admin"

  const navLinks = [
    { href: "/dashboard/students" as const, icon: Users, label: t("students") },
    { href: "/dashboard/courses" as const, icon: BookOpen, label: t("courses") },
    { href: "/dashboard/courses/relations" as const, icon: Network, label: t("relations") },
  ]

  const linkClass = (active: boolean) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      active
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`

  const navMenu = (
    <nav className="flex-1 space-y-1 overflow-y-auto p-3">
      {navLinks.map(({ href, icon: Icon, label }) => {
        const active = pathname === href || pathname.startsWith(href + "/")
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={linkClass(active)}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        )
      })}

      {isSuperAdmin && (
        <Link
          href="/dashboard/super-admin/admins"
          onClick={() => setOpen(false)}
          className={linkClass(pathname.startsWith("/dashboard/super-admin"))}
        >
          <ShieldCheck className="size-4" />
          {t("admins")}
        </Link>
      )}
    </nav>
  )

  const navFooter = (
    <div className="border-border border-t p-3">
      <div className="flex items-center gap-3 rounded-lg px-3 py-2">
        <div className="bg-primary/10 text-primary flex size-7 items-center justify-center rounded-full text-xs font-semibold">
          {profile?.firstName?.[0]}
          {profile?.lastName?.[0]}
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
  )

  return (
    <>
      {/* Mobile top bar */}
      <header className="bg-card border-border fixed inset-x-0 top-0 z-40 flex h-14 items-center gap-3 border-b px-4 md:hidden">
        <button
          onClick={() => setOpen(true)}
          aria-label={t("openMenu")}
          className="text-muted-foreground hover:text-foreground -ms-1 p-1"
        >
          <Menu className="size-5" />
        </button>
        <GraduationCap className="text-primary size-5" />
        <span className="text-foreground text-sm font-semibold">{t("brand")}</span>
        <span className="bg-primary/10 text-primary ms-auto rounded px-1.5 py-0.5 font-mono text-[10px] uppercase">
          {t("adminBadge")}
        </span>
      </header>

      {/* Desktop sidebar */}
      <aside className="bg-card border-border hidden h-screen w-60 flex-col border-e md:flex">
        <div className="border-border flex h-14 items-center gap-2 border-b px-5">
          <GraduationCap className="text-primary size-5" />
          <span className="text-foreground text-sm font-semibold">{t("brand")}</span>
          <span className="bg-primary/10 text-primary ms-auto rounded px-1.5 py-0.5 font-mono text-[10px] uppercase">
            {t("adminBadge")}
          </span>
        </div>
        {navMenu}
        {navFooter}
      </aside>

      {/* Mobile drawer + overlay */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside className="bg-card border-border absolute inset-y-0 start-0 flex w-64 max-w-[80%] flex-col border-e shadow-xl">
            <div className="border-border flex h-14 items-center gap-2 border-b px-4">
              <GraduationCap className="text-primary size-5" />
              <span className="text-foreground text-sm font-semibold">{t("brand")}</span>
              <button
                onClick={() => setOpen(false)}
                aria-label={t("closeMenu")}
                className="text-muted-foreground hover:text-foreground ms-auto p-1"
              >
                <X className="size-5" />
              </button>
            </div>
            {navMenu}
            {navFooter}
          </aside>
        </div>
      )}
    </>
  )
}
