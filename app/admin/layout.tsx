import type React from "react"
import type { Metadata } from "next"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminAuthProvider } from "@/components/admin/admin-auth-provider"

export const metadata: Metadata = {
  title: "Admin Dashboard - Cà Phê Bụi",
  description: "Quản lý thông tin và dữ liệu cho Cà Phê Bụi",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>
        <AdminAuthProvider>
          <div className="min-h-screen bg-gray-100">
            <AdminHeader />
            <div className="flex">
              <AdminSidebar />
              <main className="flex-1 p-6">{children}</main>
            </div>
          </div>
        </AdminAuthProvider>
      </body>
    </html>
  )
}
