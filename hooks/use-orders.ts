"use client"

import { useState, useEffect } from "react"
import type { Order } from "@/types"

export function useOrders() {
  const [orders, setOrders] = useState<Order[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Trong môi trường thực tế, đây sẽ là API call đến backend
        // Hiện tại chúng ta sẽ sử dụng dữ liệu mẫu
        const response = await fetch("/api/orders")

        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu đơn hàng")
        }

        const data = await response.json()
        setOrders(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Đã xảy ra lỗi không xác định"))

        // Dữ liệu mẫu khi có lỗi
        setOrders([
          {
            _id: "1",
            orderNumber: "HL240101001",
            customerInfo: {
              name: "Nguyễn Văn A",
              phone: "0901234567",
              email: "customer@email.com",
            },
            items: [
              {
                productId: "1",
                name: "Cà Phê Phin Đen",
                size: "Vừa",
                quantity: 2,
                price: 30000,
                total: 60000,
              },
            ],
            subtotal: 60000,
            tax: 6000,
            total: 66000,
            status: "pending",
            orderType: "takeaway",
            storeId: "1",
            notes: "Ít đường",
            createdAt: "2024-01-01T10:30:00Z",
            updatedAt: "2024-01-01T10:30:00Z",
          },
          {
            _id: "2",
            orderNumber: "HL240101002",
            customerInfo: {
              name: "Trần Thị B",
              phone: "0901234568",
              email: "customer2@email.com",
            },
            items: [
              {
                productId: "2",
                name: "Cà Phê Phin Sữa",
                size: "Lớn",
                quantity: 1,
                price: 40000,
                total: 40000,
              },
            ],
            subtotal: 40000,
            tax: 4000,
            total: 44000,
            status: "completed",
            orderType: "delivery",
            storeId: "1",
            notes: "Không đường",
            createdAt: "2024-01-01T11:00:00Z",
            updatedAt: "2024-01-01T11:30:00Z",
          },
        ])
      }
    }

    fetchOrders()
    setIsLoading(false)
  }, [])

  return { orders, isLoading, error }
}
