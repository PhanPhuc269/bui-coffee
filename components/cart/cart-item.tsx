"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Minus, Plus, X } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { CartItemType } from "@/components/cart/cart-drawer"

interface CartItemProps {
  item: CartItemType
  onRemove: () => void
  onUpdateQuantity: (quantity: number) => void
}

export function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  return (
    <div className="flex gap-4">
      <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-100">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <h4 className="font-medium">{item.name}</h4>
            <p className="text-sm text-muted-foreground">Size: {item.size}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onRemove} className="h-8 w-8">
            <X className="h-4 w-4" />
            <span className="sr-only">Xóa</span>
          </Button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => onUpdateQuantity(item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Giảm</span>
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => onUpdateQuantity(item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Tăng</span>
            </Button>
          </div>
          <div className="font-medium">{formatCurrency(item.price * item.quantity)}</div>
        </div>
      </div>
    </div>
  )
}
