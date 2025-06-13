import { TestimonialsAdmin } from "@/components/admin/testimonials-admin"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quản lý Đánh giá - Cà Phê Bụi",
  description: "Thêm, sửa, xóa đánh giá khách hàng",
}

export default function TestimonialsAdminPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Quản lý Đánh giá</h1>
      <TestimonialsAdmin />
    </div>
  )
}
