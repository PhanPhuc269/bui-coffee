"use client"

import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CartItem } from "@/components/cart/cart-item"
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ShoppingBag } from "lucide-react"

export type CartItemType = {
  id: string
  name: string
  price: number
  quantity: number
  size: string
  image: string
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [cartItems, setCartItems] = useState<CartItemType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  // Lấy giỏ hàng từ localStorage khi component được mount
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      try {
        const storedCart = localStorage.getItem("cart")
        if (storedCart) {
          setCartItems(JSON.parse(storedCart))
        }
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }, [isOpen])

  // Lưu giỏ hàng vào localStorage khi có thay đổi
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems])

  // Tính tổng tiền
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = subtotal * 0.1 // 10% thuế
  const total = subtotal + tax

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = (id: string, size: string) => {
    const updatedCart = cartItems.filter((item) => !(item.id === id && item.size === size))
    setCartItems(updatedCart)

    if (updatedCart.length === 0) {
      localStorage.removeItem("cart")
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedCart))
    }

    toast({
      title: "Đã xóa sản phẩm",
      description: "Sản phẩm đã được xóa khỏi giỏ hàng",
    })
  }

  // Cập nhật số lượng sản phẩm
  const handleUpdateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id, size)
      return
    }

    const updatedCart = cartItems.map((item) => {
      if (item.id === id && item.size === size) {
        return { ...item, quantity }
      }
      return item
    })

    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  // Xử lý thanh toán
  const handleCheckout = () => {
    // Trong thực tế, đây sẽ chuyển hướng đến trang thanh toán
    toast({
      title: "Đang chuyển đến thanh toán",
      description: "Chức năng này sẽ được triển khai trong tương lai",
    })
    onClose()
    // router.push("/checkout")
  }

  // Xóa tất cả sản phẩm trong giỏ hàng
  const handleClearCart = () => {
    setCartItems([])
    localStorage.removeItem("cart")
    toast({
      title: "Đã xóa giỏ hàng",
      description: "Tất cả sản phẩm đã được xóa khỏi giỏ hàng",
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Giỏ hàng của bạn</SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Giỏ hàng trống</h3>
            <p className="text-muted-foreground mt-1">Bạn chưa thêm sản phẩm nào vào giỏ hàng</p>
            <Button className="mt-6" onClick={onClose}>
              Tiếp tục mua sắm
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-6">
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <CartItem
                    key={`${item.id}-${item.size}-${index}`}
                    item={item}
                    onRemove={() => handleRemoveItem(item.id, item.size)}
                    onUpdateQuantity={(quantity) => handleUpdateQuantity(item.id, item.size, quantity)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <Separator />
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Thuế (10%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Tổng cộng</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <SheetFooter className="flex-col gap-2 sm:flex-col">
                <Button className="w-full" onClick={handleCheckout}>
                  Thanh toán
                </Button>
                <Button variant="outline" className="w-full" onClick={handleClearCart}>
                  Xóa giỏ hàng
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
