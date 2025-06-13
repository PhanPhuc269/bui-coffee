import Link from "next/link"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/menu/${product.slug}`} className="group">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-3">
        <Image
          src={product.image || "/placeholder.svg?height=300&width=300"}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <h3 className="font-medium text-lg group-hover:text-primary transition-colors">{product.name}</h3>
      <p className="text-muted-foreground line-clamp-2 text-sm mb-2">{product.description}</p>
      <p className="font-medium text-primary">{formatCurrency(product.price)}</p>
    </Link>
  )
}
