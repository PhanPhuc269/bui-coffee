"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Star, Coffee, Leaf, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/hooks/use-cart"
import { formatCurrency } from "@/lib/utils"
import type { Product, Category } from "@/types"

interface ProductDetailProps {
  product: Product
  category: Category | null
}

export function ProductDetail({ product, category }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(product.image)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: selectedSize.price,
      size: selectedSize.name,
      image: product.image,
      quantity,
    })
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">
          Trang chủ
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/menu" className="hover:text-primary transition-colors">
          Thực đơn
        </Link>
        {category && (
          <>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href={`/menu?category=${category.slug}`} className="hover:text-primary transition-colors">
              {category.name}
            </Link>
          </>
        )}
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      {/* Product Info */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={activeImage || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[product.image, ...product.images].map((img, index) => (
                <button
                  key={index}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                    activeImage === img ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setActiveImage(img)}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground mt-2">{product.description}</p>
          </div>

          <div className="flex items-center">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">(16 đánh giá)</span>
          </div>

          <div>
            <h2 className="font-medium mb-2">Kích cỡ</h2>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size.name}
                  variant={selectedSize.name === size.name ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                  className="flex-1 sm:flex-none"
                >
                  {size.name} - {formatCurrency(size.price)}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-medium mb-2">Số lượng</h2>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                +
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{formatCurrency(selectedSize.price * quantity)}</div>
            <Button size="lg" onClick={handleAddToCart} disabled={!product.isAvailable}>
              {product.isAvailable ? "Thêm vào giỏ hàng" : "Hết hàng"}
            </Button>
          </div>

          {!product.isAvailable && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
              Sản phẩm này hiện đang hết hàng. Vui lòng quay lại sau.
            </div>
          )}

          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Tabs */}
      <Tabs defaultValue="description" className="mt-8">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="description">Mô tả</TabsTrigger>
          <TabsTrigger value="nutrition">Dinh dưỡng</TabsTrigger>
          <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="p-4 border rounded-md mt-2">
          <div className="prose max-w-none">
            <p>{product.longDescription}</p>
          </div>
        </TabsContent>
        <TabsContent value="nutrition" className="p-4 border rounded-md mt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center space-x-4">
                <Coffee className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium">Calories</p>
                  <p className="text-2xl font-bold">{product.nutritionalInfo.calories}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center space-x-4">
                <Leaf className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium">Caffeine</p>
                  <p className="text-2xl font-bold">{product.nutritionalInfo.caffeine}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center space-x-4">
                <Info className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium">Đường</p>
                  <p className="text-2xl font-bold">{product.nutritionalInfo.sugar}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="p-4 border rounded-md mt-2">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium">Chưa có đánh giá nào</h3>
            <p className="text-muted-foreground mt-2">Hãy là người đầu tiên đánh giá sản phẩm này</p>
            <Button className="mt-4">Viết đánh giá</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
