"use client"

import { useLocale } from "next-intl"
import { NotFoundView } from "@/components/not-found-view"

export default function NotFound() {
  const locale = useLocale()

  return <NotFoundView homeHref={`/${locale}`} />
}
