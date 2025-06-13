import { ProductsAdmin } from "@/components/admin/products-admin"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quản lý Sản phẩm - Cà Phê Bụi",
  description: "Thêm, sửa, xóa sản phẩm",
}

export default function ProductsAdminPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Quản lý Sản phẩm</h1>
      <ProductsAdmin />
    </div>
  )
}
