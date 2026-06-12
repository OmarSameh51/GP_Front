"use client"

import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { GraduationCap, LogOut, User, BookOpen, TrendingUp, Brain, FileText, LayoutDashboard, Menu } from "lucide-react"
import { Link, useRouter } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useAuthStore } from "@/store/auth"
import { ThemeToggle } from "./theme-toggle"
import { LocaleSwitcher } from "./locale-switcher"

export function Navbar() {
  const t = useTranslations("nav")
  const router = useRouter()
  const queryClient = useQueryClient()
  const { user, isAuthenticated, clearAuth } = useAuthStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  function handleSignOut() {
    clearAuth()
    // Drop all cached queries (profile, courses, etc.) so the next user that
    // signs in never sees the previous user's data.
    queryClient.clear()
    router.push("/")
  }

  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : ""

  const isAdmin = user?.role === "admin" || user?.role === "super_admin"

  const userDropdown = (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ variant: "ghost" })}>
        <span className="bg-primary/10 text-primary flex size-7 items-center justify-center rounded-full text-xs font-semibold">
          {initials}
        </span>
        <span className="text-foreground hidden text-sm font-medium sm:inline">
          {user?.firstName}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="pb-1">
            <p className="text-foreground text-sm font-medium">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-muted-foreground font-mono text-xs font-normal capitalize">
              {user?.role ?? "student"}
            </p>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {isAdmin ? (
            <DropdownMenuItem
              onClick={() => router.push("/dashboard/students")}
              className="cursor-pointer"
            >
              <LayoutDashboard className="size-4" />
              {t("adminDashboard")}
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => router.push("/profile")}
              className="cursor-pointer"
            >
              <User className="size-4" />
              {t("profile")}
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            onClick={handleSignOut}
            className="cursor-pointer"
          >
            <LogOut className="size-4" />
            {t("signOut")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <header className="bg-background/80 border-border sticky top-0 z-40 border-b backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        {/* Brand */}
        <Link href="/" className="text-primary flex items-center gap-2 text-base font-semibold">
          <GraduationCap className="size-5" />
          {t("brand")}
        </Link>

        {/* Desktop student nav links */}
        {isAuthenticated && user && !isAdmin && (
          <nav className="hidden items-center gap-1 sm:flex">
            <Link href="/courses" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              <BookOpen className="size-4" />
              {t("courses")}
            </Link>
            <Link href="/gpa" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              <TrendingUp className="size-4" />
              {t("gpa")}
            </Link>
            <Link
              href="/ai-plan"
              className={`${buttonVariants({ variant: "ghost", size: "sm" })} text-accent`}
            >
              <Brain className="size-4" />
              {t("aiPlan")}
            </Link>
            <Link href="/summaries" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              <FileText className="size-4" />
              {t("summaries")}
            </Link>
          </nav>
        )}

        {/* Right actions */}
        <nav className="flex items-center gap-1.5">
          {/* Desktop locale + theme — always visible on sm+ */}
          <div className="hidden items-center gap-1 sm:flex">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>

          {isAuthenticated && user ? (
            userDropdown
          ) : (
            <>
              {/* Desktop sign-in / register */}
              <Link
                href="/login"
                className={`${buttonVariants({ variant: "ghost" })} hidden sm:inline-flex`}
              >
                {t("signIn")}
              </Link>
              <Link
                href="/register"
                className={`${buttonVariants({ variant: "default" })} hidden sm:inline-flex`}
              >
                {t("register")}
              </Link>

              {/* Mobile hamburger → Sheet */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger
                  className={`${buttonVariants({ variant: "ghost", size: "sm" })} size-8 p-0 sm:hidden`}
                  aria-label={t("menu")}
                >
                  <Menu className="size-5" />
                </SheetTrigger>
                <SheetContent side="right" className="w-72 p-0">
                  <SheetHeader className="border-border border-b px-5 py-4">
                    <SheetTitle>
                      <Link
                        href="/"
                        onClick={() => setMobileOpen(false)}
                        className="text-primary flex items-center gap-2 text-sm font-semibold"
                      >
                        <GraduationCap className="size-5" />
                        {t("brand")}
                      </Link>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-2 p-4">
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className={buttonVariants({ variant: "ghost", size: "sm" })}
                    >
                      {t("signIn")}
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileOpen(false)}
                      className={buttonVariants({ variant: "default", size: "sm" })}
                    >
                      {t("register")}
                    </Link>
                  </div>

                  <div className="border-border flex items-center gap-2 border-t p-4">
                    <LocaleSwitcher />
                    <ThemeToggle />
                  </div>
                </SheetContent>
              </Sheet>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
