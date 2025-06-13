import { StoreMap } from "@/components/store-map"
import { StoreList } from "@/components/store-list"
import { getStores } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cửa hàng - Bụi Coffee",
  description: "Tìm cửa hàng Bụi Coffee gần bạn nhất",
}

export default async function LocationsPage({
  searchParams,
}: {
  searchParams: { city?: string }
}) {
  const selectedCity = searchParams.city || "all"
  const stores = await getStores(selectedCity !== "all" ? selectedCity : undefined)
  const cities = [...new Set(stores.map((store) => store.city))]

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Cửa hàng</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <StoreList stores={stores} cities={cities} selectedCity={selectedCity} />
        </div>
        <div className="lg:col-span-2">
          <StoreMap stores={stores} />
        </div>
      </div>
    </div>
  )
}
