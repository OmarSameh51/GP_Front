import { RoleGuard } from "@/components/role-guard"
import { AdminNav } from "./admin-nav"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard requiredRole="admin">
      <div className="flex h-screen overflow-hidden">
        <AdminNav />
        <main className="flex-1 overflow-auto pt-14 md:pt-0">{children}</main>
      </div>
    </RoleGuard>
  )
}
