"use client"

import { useState } from "react"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Product } from "@/types"
import { useToast } from "@/hooks/use-toast"
import type { CartItemType } from "@/components/cart/cart-drawer"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()

  const handleAddToCart = () => {
    const cartItem: CartItemType = {
      id: product._id,
      name: product.name,
      price: selectedSize.price,
      quantity: quantity,
      size: selectedSize.name,
      image: product.image,
    }

    // Lấy giỏ hàng hiện tại từ localStorage
    let cart: CartItemType[] = []
    try {
      const storedCart = localStorage.getItem("cart")
      if (storedCart) {
        cart = JSON.parse(storedCart)
      }
    } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error)
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingItemIndex = cart.findIndex((item) => item.id === cartItem.id && item.size === cartItem.size)

    if (existingItemIndex !== -1) {
      // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
      cart[existingItemIndex].quantity += cartItem.quantity
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
      cart.push(cartItem)
    }

    // Lưu giỏ hàng vào localStorage
    localStorage.setItem("cart", JSON.stringify(cart))

    toast({
      title: "Thêm vào giỏ hàng thành công",
      description: `${quantity} ${product.name} (${selectedSize.name}) đã được thêm vào giỏ hàng.`,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={product.image || "/placeholder.svg?height=600&width=600"}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-2xl font-medium text-primary mb-4">{formatCurrency(selectedSize.price)}</p>
        <p className="text-gray-700 mb-6">{product.longDescription}</p>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Kích cỡ</h3>
          <div className="flex gap-3">
            {product.sizes.map((size) => (
              <Button
                key={size.name}
                variant={selectedSize.name === size.name ? "default" : "outline"}
                onClick={() => setSelectedSize(size)}
              >
                {size.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Số lượng</h3>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              -
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
              +
            </Button>
          </div>
        </div>

        <Button className="w-full" size="lg" onClick={handleAddToCart}>
          Thêm vào giỏ hàng
        </Button>

        <Tabs defaultValue="description" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Mô tả</TabsTrigger>
            <TabsTrigger value="nutrition">Dinh dưỡng</TabsTrigger>
            <TabsTrigger value="ingredients">Thành phần</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-4">
            <p className="text-gray-700">{product.longDescription}</p>
          </TabsContent>
          <TabsContent value="nutrition" className="pt-4">
            <div className="space-y-2">
              <p className="flex justify-between border-b pb-1">
                <span>Calories</span>
                <span>{product.nutritionalInfo.calories}</span>
              </p>
              <p className="flex justify-between border-b pb-1">
                <span>Caffeine</span>
                <span>{product.nutritionalInfo.caffeine}</span>
              </p>
              <p className="flex justify-between border-b pb-1">
                <span>Đường</span>
                <span>{product.nutritionalInfo.sugar}</span>
              </p>
            </div>
          </TabsContent>
          <TabsContent value="ingredients" className="pt-4">
            <p className="text-gray-700">Cà phê Arabica, đường, sữa đặc, nước.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
