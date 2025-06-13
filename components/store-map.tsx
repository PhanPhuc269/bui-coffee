"use client"

import { useState, useEffect } from "react"
import type { Store } from "@/types"

interface StoreMapProps {
  stores: Store[]
}

export function StoreMap({ stores }: StoreMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden h-[600px] relative">
      {!mapLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">Bản đồ cửa hàng sẽ được hiển thị ở đây (Tích hợp Google Maps)</p>
        </div>
      )}
    </div>
  )
}
