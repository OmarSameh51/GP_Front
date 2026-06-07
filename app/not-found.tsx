"use client"

import { NotFoundView } from "@/components/not-found-view"

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <NotFoundView homeHref="/en" />
      </body>
    </html>
  )
}
