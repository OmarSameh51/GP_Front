"use client"

import { useUpdateCourse } from "@/hooks/use-admin-courses"

export function ActiveToggle({
  courseCode,
  isActive,
}: {
  courseCode: string
  isActive: boolean
}) {
  const { mutate: updateCourse, isPending } = useUpdateCourse()

  function toggle() {
    updateCourse({ courseCode, body: { isActive: !isActive } })
  }

  return (
    <button
      dir="ltr"
      onClick={toggle}
      disabled={isPending}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus-visible:outline-none ${
        isActive ? "bg-success" : "bg-muted"
      } ${isPending ? "opacity-50" : ""}`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
          isActive ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  )
}
