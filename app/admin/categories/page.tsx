import { CategoriesAdmin } from "@/components/admin/categories-admin"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quản lý Danh mục - Cà Phê Bụi",
  description: "Thêm, sửa, xóa danh mục sản phẩm",
}

export default function CategoriesAdminPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Quản lý Danh mục</h1>
      <CategoriesAdmin />
    </div>
  )
}
