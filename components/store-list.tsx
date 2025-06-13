"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Store } from "@/types"
import { useState } from "react"
import { Search } from "lucide-react"

interface StoreListProps {
  stores: Store[]
  cities: string[]
  selectedCity: string
}

export function StoreList({ stores, cities, selectedCity }: StoreListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")

  const handleCityChange = (city: string) => {
    const params = new URLSearchParams(searchParams)
    if (city === "all") {
      params.delete("city")
    } else {
      params.set("city", city)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm cửa hàng..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <h3 className="font-medium mb-2">Lọc theo thành phố</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCity === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => handleCityChange("all")}
          >
            Tất cả
          </Button>
          {cities.map((city) => (
            <Button
              key={city}
              variant={selectedCity === city ? "default" : "outline"}
              size="sm"
              onClick={() => handleCityChange(city)}
            >
              {city}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {filteredStores.length === 0 ? (
          <p className="text-center py-4 text-muted-foreground">Không tìm thấy cửa hàng nào</p>
        ) : (
          filteredStores.map((store) => (
            <div key={store._id} className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium">{store.name}</h4>
              <p className="text-sm text-muted-foreground mb-2">{store.address}</p>
              <p className="text-sm">
                <span className="font-medium">Điện thoại:</span> {store.phone}
              </p>
              <p className="text-sm">
                <span className="font-medium">Giờ mở cửa:</span> {store.hours.monday}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
