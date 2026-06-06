"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { GraduationCap, LogOut, User } from "lucide-react"
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
import { useAuthStore } from "@/store/auth"

export function Navbar() {
  const router = useRouter()
  const { user, isAuthenticated, clearAuth } = useAuthStore()

  function handleSignOut() {
    clearAuth()
    router.push("/")
  }

  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : ""

  return (
    <header className="bg-background/80 border-border sticky top-0 z-40 border-b backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-primary flex items-center gap-2 text-base font-semibold"
        >
          <GraduationCap className="size-5" />
          Helwan CS
        </Link>

        <nav className="flex items-center gap-2">
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className={buttonVariants({ variant: "ghost" })}
              >
                <span className="bg-primary/10 text-primary flex size-6 items-center justify-center rounded-full text-xs font-semibold">
                  {initials}
                </span>
                <span className="text-foreground text-sm font-medium">
                  {user.firstName}
                </span>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="pb-1">
                    <p className="text-foreground text-sm font-medium">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-muted-foreground font-mono text-xs font-normal">
                      {user.studentId}
                    </p>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => router.push("/profile")}
                    className="cursor-pointer"
                  >
                    <User className="size-4" />
                    Profile
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={handleSignOut}
                    className="cursor-pointer"
                  >
                    <LogOut className="size-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link
                href="/login"
                className={buttonVariants({ variant: "ghost" })}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className={buttonVariants({ variant: "default" })}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
