"use client"

import { useState, useEffect } from "react"
import type { Product } from "@/types"

export function useProducts() {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Trong môi trường thực tế, đây sẽ là API call đến backend
        // Hiện tại chúng ta sẽ sử dụng dữ liệu mẫu
        const response = await fetch("/api/products")

        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu sản phẩm")
        }

        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Đã xảy ra lỗi không xác định"))

        // Dữ liệu mẫu khi có lỗi
        setProducts([
          {
            _id: "1",
            name: "Cà Phê Phin Đen",
            slug: "ca-phe-phin-den",
            description: "Cà phê phin truyền thống với hương vị đậm đà, thơm ngon",
            longDescription:
              "Được pha chế từ những hạt cà phê Robusta chất lượng cao, rang vừa tới để giữ nguyên hương vị đặc trưng của cà phê Việt Nam.",
            category: "coffee",
            price: 25000,
            sizes: [
              { name: "Nhỏ", price: 25000 },
              { name: "Vừa", price: 30000 },
              { name: "Lớn", price: 35000 },
            ],
            image: "/placeholder.svg?height=300&width=300",
            images: ["/placeholder.svg?height=600&width=600"],
            isAvailable: true,
            isFeatured: true,
            nutritionalInfo: {
              calories: 5,
              caffeine: "95mg",
              sugar: "0g",
            },
            tags: ["hot", "traditional", "strong"],
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
          },
          {
            _id: "2",
            name: "Cà Phê Sữa Đá",
            slug: "ca-phe-sua-da",
            description: "Cà phê sữa đá thơm béo, đậm đà hương vị Việt Nam",
            longDescription:
              "Cà phê sữa đá là sự kết hợp hoàn hảo giữa cà phê đậm đà và sữa đặc ngọt ngào, được phục vụ cùng đá viên mát lạnh.",
            category: "coffee",
            price: 29000,
            sizes: [
              { name: "Nhỏ", price: 29000 },
              { name: "Vừa", price: 35000 },
              { name: "Lớn", price: 39000 },
            ],
            image: "/placeholder.svg?height=300&width=300",
            images: ["/placeholder.svg?height=600&width=600"],
            isAvailable: true,
            isFeatured: true,
            nutritionalInfo: {
              calories: 120,
              caffeine: "95mg",
              sugar: "15g",
            },
            tags: ["cold", "traditional", "popular"],
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, isLoading, error }
}
