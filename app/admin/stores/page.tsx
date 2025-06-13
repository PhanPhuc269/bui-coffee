import { StoresAdmin } from "@/components/admin/stores-admin"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quản lý Cửa hàng - Cà Phê Bụi",
  description: "Thêm, sửa, xóa thông tin cửa hàng",
}

export default function StoresAdminPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Quản lý Cửa hàng</h1>
      <StoresAdmin />
    </div>
  )
}
