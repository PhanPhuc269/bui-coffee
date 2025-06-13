import { AdminDashboard } from "@/components/admin/dashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - Cà Phê Bụi",
  description: "Quản lý sản phẩm, đơn hàng và cửa hàng",
}

export default function AdminPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <AdminDashboard />
    </div>
  )
}
