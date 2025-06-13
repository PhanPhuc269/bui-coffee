import Link from "next/link"
import { StoreCard } from "@/components/store-card"
import { getFeaturedStores } from "@/lib/data"

export async function StoreLocations() {
  const stores = await getFeaturedStores()

  return (
    <section className="container">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Cửa hàng</h2>
          <p className="text-muted-foreground">Tìm cửa hàng Bụi Coffee gần bạn nhất</p>
        </div>
        <Link
          href="/locations"
          className="inline-flex items-center mt-4 md:mt-0 text-primary font-medium hover:underline"
        >
          Xem tất cả cửa hàng
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <StoreCard key={store._id} store={store} />
        ))}
      </div>
    </section>
  )
}
