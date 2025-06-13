import { OrdersAdmin } from "@/components/admin/orders-admin"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quản lý Đơn hàng - Cà Phê Bụi",
  description: "Xem và cập nhật trạng thái đơn hàng",
}

export default function OrdersAdminPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Quản lý Đơn hàng</h1>
      <OrdersAdmin />
    </div>
  )
}
