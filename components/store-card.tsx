import Image from "next/image"
import { MapPin, Phone, Clock } from "lucide-react"
import type { Store } from "@/types"

interface StoreCardProps {
  store: Store
}

export function StoreCard({ store }: StoreCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={store.image || "/placeholder.svg?height=200&width=400"}
          alt={store.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{store.name}</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-primary mt-0.5" />
            <span>{store.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0 text-primary" />
            <span>{store.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-primary" />
            <span>
              {store.hours.monday} (Thứ 2 - Thứ 6)
              <br />
              {store.hours.saturday} (Thứ 7 - Chủ nhật)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
