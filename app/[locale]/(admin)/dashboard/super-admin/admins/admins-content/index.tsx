"use client"

import { Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useAdmins, useDeleteAdmin } from "@/hooks/use-admins"
import { useAuthStore } from "@/store/auth"
import { RoleGuard } from "@/components/role-guard"
import { PageSkeleton } from "@/components/page-skeleton"
import { ErrorState } from "@/components/error-state"
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog"
import { CreateAdminDialog } from "./create-admin-dialog"
import { EditAdminDialog } from "./edit-admin-dialog"

function AdminsTable() {
  const t = useTranslations("admin")
  const { data: admins, isLoading, isError, refetch } = useAdmins()
  const { mutate: deleteAdmin, isPending } = useDeleteAdmin()
  const currentUsername = useAuthStore((s) => s.user?.username)

  if (isLoading) return <PageSkeleton />
  if (isError) return <ErrorState onRetry={refetch} />

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">{t("admins")}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {t("adminsTotal", { count: admins?.length ?? 0, plural: (admins?.length ?? 0) !== 1 ? "s" : "" })}
          </p>
        </div>
        <CreateAdminDialog />
      </div>

      <div className="border-border overflow-hidden rounded-xl border">
        {!admins?.length ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground text-sm">{t("noAdmins")}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="border-border border-b">
              <tr className="text-muted-foreground text-xs uppercase tracking-widest">
                <th className="px-5 py-3 text-start font-normal">{t("colName")}</th>
                <th className="px-5 py-3 text-start font-mono font-normal">{t("colUsername")}</th>
                <th className="px-5 py-3 text-start font-normal">{t("colEmail")}</th>
                <th className="px-5 py-3 text-start font-normal">{t("colRole")}</th>
                <th className="px-5 py-3 text-start font-normal">{t("colPhone")}</th>
                <th className="px-5 py-3 text-end font-normal">{t("colActions")}</th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {admins.map((admin) => {
                const isSelf = admin.username === currentUsername
                const isSuperAdmin = admin.role === "super_admin"
                // The backend rejects editing/deleting yourself or any super admin,
                // so only surface the actions when they can actually succeed.
                const canManage = !isSelf && !isSuperAdmin

                return (
                  <tr key={admin._id} className="bg-card hover:bg-muted/30 transition-colors">
                    <td className="text-foreground px-5 py-4 font-medium">
                      {admin.firstName} {admin.lastName}
                    </td>
                    <td className="text-muted-foreground px-5 py-4 font-mono text-xs">
                      {admin.username}
                    </td>
                    <td className="text-muted-foreground px-5 py-4 text-sm">{admin.email}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                          admin.role === "super_admin"
                            ? "bg-accent/15 text-amber-700 dark:text-accent"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {admin.role.replace("_", " ")}
                      </span>
                    </td>
                    <td className="text-muted-foreground px-5 py-4 text-sm">
                      {admin.phoneNumber ?? "—"}
                    </td>
                    <td className="px-5 py-4 text-end">
                      <div className="flex items-center justify-end gap-1">
                        {canManage && <EditAdminDialog admin={admin} />}
                        {canManage && (
                          <ConfirmDeleteDialog
                            trigger={<Trash2 className="size-4" />}
                            title={t("deleteAdminTitle")}
                            description={t("deleteAdminDesc", { name: `${admin.firstName} ${admin.lastName}` })}
                            onConfirm={() => deleteAdmin(admin.username)}
                            isPending={isPending}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          </div>
        )}
      </div>
    </div>
  )
}

export function AdminsContent() {
  return (
    <RoleGuard requiredRole="super_admin">
      <AdminsTable />
    </RoleGuard>
  )
}
