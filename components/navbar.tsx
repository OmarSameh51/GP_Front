"use client"

import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import {
  GraduationCap,
  LogOut,
  User,
  BookOpen,
  TrendingUp,
  Brain,
  FileText,
  LayoutDashboard,
  Menu,
  Compass,
  Megaphone,
} from "lucide-react"
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

  const studentLinks = [
    { href: "/courses", icon: BookOpen, label: t("courses"), accent: false },
    { href: "/gpa", icon: TrendingUp, label: t("gpa"), accent: false },
    { href: "/ai-plan", icon: Brain, label: t("aiPlan"), accent: true },
    { href: "/summaries", icon: FileText, label: t("summaries"), accent: false },
    { href: "/updates", icon: Megaphone, label: t("updates"), accent: false },
  ] as const

  const userDropdown = (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ variant: "ghost" })}>
        <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
          {initials}
        </span>
        <span className="hidden text-sm font-medium text-foreground md:inline">
          {user?.firstName}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="pb-1">
            <p className="text-sm font-medium text-foreground">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="font-mono text-xs font-normal text-muted-foreground capitalize">
              {user?.role ?? "student"}
            </p>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Mobile-only student nav links (desktop shows them in the top bar) */}
        {!isAdmin && (
          <>
            <DropdownMenuGroup className="md:hidden">
              {studentLinks.map(({ href, icon: Icon, label, accent }) => (
                <DropdownMenuItem
                  key={href}
                  onClick={() => router.push(href)}
                  className="cursor-pointer"
                >
                  <Icon className={`size-4 ${accent ? "text-accent" : ""}`} />
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="md:hidden" />
          </>
        )}

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

        {/* Mobile-only language + theme (desktop shows them in the top bar) */}
        <DropdownMenuSeparator className="md:hidden" />
        <div className="flex items-center justify-between px-2 py-1 md:hidden">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-2 px-3 sm:px-6">
        {/* Brand */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-sm font-semibold whitespace-nowrap text-primary sm:text-base"
        >
          <GraduationCap className="size-5" />
          {t("brand")}
        </Link>

        {/* Desktop student nav links */}
        {isAuthenticated && user && !isAdmin && (
          <nav className="hidden items-center gap-1 md:flex">
            {studentLinks.map(({ href, icon: Icon, label, accent }) => (
              <Link
                key={href}
                href={href}
                className={`${buttonVariants({ variant: "ghost", size: "sm" })} ${accent ? "text-accent" : ""}`}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right actions */}
        <nav className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          {isAuthenticated && user ? (
            <>
              {/* Desktop locale + theme */}
              <div className="hidden items-center gap-1 md:flex">
                <LocaleSwitcher />
                <ThemeToggle />
              </div>
              <span className="mx-1 hidden h-5 w-px bg-border md:block" aria-hidden="true" />
              {userDropdown}
            </>
          ) : (
            <>
              {/* Desktop cluster: guest advisor · utilities · auth */}
              <div className="hidden items-center gap-1 md:flex">
                <Link
                  href="/advise"
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                  <Compass className="size-4" />
                  {t("advise")}
                </Link>
                <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
                <LocaleSwitcher />
                <ThemeToggle />
                <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "ghost", size: "sm" })}
                >
                  {t("signIn")}
                </Link>
                <Link
                  href="/register"
                  className={buttonVariants({ variant: "default", size: "sm" })}
                >
                  {t("register")}
                </Link>
              </div>

              {/* Mobile hamburger → Sheet */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger
                  className={`${buttonVariants({ variant: "ghost", size: "sm" })} size-8 p-0 md:hidden`}
                  aria-label={t("menu")}
                >
                  <Menu className="size-5" />
                </SheetTrigger>
                <SheetContent side="right" className="w-72 p-0">
                  <SheetHeader className="border-b border-border px-5 py-4">
                    <SheetTitle>
                      <Link
                        href="/"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 text-sm font-semibold text-primary"
                      >
                        <GraduationCap className="size-5" />
                        {t("brand")}
                      </Link>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-2 p-4">
                    <Link
                      href="/advise"
                      onClick={() => setMobileOpen(false)}
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                    >
                      <Compass className="size-4" />
                      {t("advise")}
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                    >
                      {t("signIn")}
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileOpen(false)}
                      className={buttonVariants({
                        variant: "default",
                        size: "sm",
                      })}
                    >
                      {t("register")}
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 border-t border-border p-4">
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
