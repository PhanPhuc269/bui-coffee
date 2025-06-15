"use client"

import { useState, useEffect } from "react"
import type { Store } from "@/types"

export function useStores() {
  const [stores, setStores] = useState<Store[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchStores = async () => {
      try {
        // Trong môi trường thực tế, đây sẽ là API call đến backend
        const response = await fetch("/api/stores")

        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu cửa hàng")
        }

        const data = await response.json()
        setStores(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Đã xảy ra lỗi không xác định"))

        // Dữ liệu mẫu khi có lỗi
        setStores([
          {
            _id: "1",
            name: "Cà Phê Bụi Nguyễn Huệ",
            address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
            city: "Ho Chi Minh",
            district: "Quận 1",
            phone: "028-1234-5678",
            email: "nguyen.hue@highlands.com.vn",
            coordinates: {
              lat: 10.7769,
              lng: 106.7009,
            },
            hours: {
              monday: "06:00-22:00",
              tuesday: "06:00-22:00",
              wednesday: "06:00-22:00",
              thursday: "06:00-22:00",
              friday: "06:00-23:00",
              saturday: "06:00-23:00",
              sunday: "07:00-22:00",
            },
            facilities: ["wifi", "parking", "delivery", "takeaway"],
            image: "/placeholder.svg?height=200&width=400",
            isActive: true,
          },
          {
            _id: "2",
            name: "Cà Phê Bụi Lê Lợi",
            address: "45 Đường Lê Lợi, Quận 1, TP.HCM",
            city: "Ho Chi Minh",
            district: "Quận 1",
            phone: "028-1234-5679",
            email: "le.loi@highlands.com.vn",
            coordinates: {
              lat: 10.7731,
              lng: 106.7012,
            },
            hours: {
              monday: "06:00-22:00",
              tuesday: "06:00-22:00",
              wednesday: "06:00-22:00",
              thursday: "06:00-22:00",
              friday: "06:00-23:00",
              saturday: "06:00-23:00",
              sunday: "07:00-22:00",
            },
            facilities: ["wifi", "parking", "delivery", "takeaway"],
            image: "/placeholder.svg?height=200&width=400",
            isActive: true,
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchStores()
  }, [])

  return { stores, isLoading, error }
}
