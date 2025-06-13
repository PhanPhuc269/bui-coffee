import { FeaturesAdmin } from "@/components/admin/features-admin"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quản lý Tính năng - Cà Phê Bụi",
  description: "Thêm, sửa, xóa tính năng đặc biệt",
}

export default function FeaturesAdminPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Quản lý Tính năng</h1>
      <FeaturesAdmin />
    </div>
  )
}
