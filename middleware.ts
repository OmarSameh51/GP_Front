import createMiddleware from "next-intl/middleware"
import { type NextRequest, NextResponse } from "next/server"
import { routing } from "./i18n/routing"

const handleI18nRouting = createMiddleware(routing)

const PROTECTED = ["courses", "gpa", "ai-plan", "profile"]
const DASHBOARD = ["dashboard"]
const AUTH_ONLY = ["login", "register"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("token")?.value

  const parts = pathname.split("/").filter(Boolean)
  const locale = parts[0] ?? "en"
  const segment = parts[1] ?? ""

  const isProtected =
    [...PROTECTED, ...DASHBOARD].some(
      (s) => segment === s || segment.startsWith(s + "/")
    )

  const isAuthOnly = AUTH_ONLY.some(
    (s) => segment === s || segment.startsWith(s + "/")
  )

  if (isProtected && !token) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }

  if (isAuthOnly && token) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  return handleI18nRouting(request)
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
}
