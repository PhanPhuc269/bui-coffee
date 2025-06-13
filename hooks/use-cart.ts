"use client"

import { useState, useEffect } from "react"
import type { CartItemType } from "@/components/cart/cart-drawer"

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  // Lấy giỏ hàng từ localStorage khi component được mount
  useEffect(() => {
    const loadCart = () => {
      setIsLoading(true)
      try {
        const storedCart = localStorage.getItem("cart")
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart) as CartItemType[]
          setCartItems(parsedCart)

          // Tính tổng số lượng sản phẩm
          const count = parsedCart.reduce((total, item) => total + item.quantity, 0)
          setCartCount(count)

          // Tính tổng tiền
          const total = parsedCart.reduce((total, item) => total + item.price * item.quantity, 0)
          setCartTotal(total)
        } else {
          setCartItems([])
          setCartCount(0)
          setCartTotal(0)
        }
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error)
        setCartItems([])
        setCartCount(0)
        setCartTotal(0)
      } finally {
        setIsLoading(false)
      }
    }

    loadCart()

    // Thêm event listener để cập nhật giỏ hàng khi có thay đổi từ tab khác
    window.addEventListener("storage", loadCart)

    return () => {
      window.removeEventListener("storage", loadCart)
    }
  }, [])

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (item: CartItemType) => {
    const updatedCart = [...cartItems]
    const existingItemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.size === item.size,
    )

    if (existingItemIndex !== -1) {
      // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
      updatedCart[existingItemIndex].quantity += item.quantity
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
      updatedCart.push(item)
    }

    setCartItems(updatedCart)

    // Cập nhật tổng số lượng và tổng tiền
    const newCount = updatedCart.reduce((total, item) => total + item.quantity, 0)
    const newTotal = updatedCart.reduce((total, item) => total + item.price * item.quantity, 0)

    setCartCount(newCount)
    setCartTotal(newTotal)

    // Lưu giỏ hàng vào localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart))

    // Kích hoạt sự kiện storage để cập nhật giỏ hàng ở các tab khác
    window.dispatchEvent(new Event("storage"))
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size)
      return
    }

    const updatedCart = cartItems.map((item) => {
      if (item.id === id && item.size === size) {
        return { ...item, quantity }
      }
      return item
    })

    setCartItems(updatedCart)

    // Cập nhật tổng số lượng và tổng tiền
    const newCount = updatedCart.reduce((total, item) => total + item.quantity, 0)
    const newTotal = updatedCart.reduce((total, item) => total + item.price * item.quantity, 0)

    setCartCount(newCount)
    setCartTotal(newTotal)

    // Lưu giỏ hàng vào localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart))

    // Kích hoạt sự kiện storage để cập nhật giỏ hàng ở các tab khác
    window.dispatchEvent(new Event("storage"))
  }

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (id: string, size: string) => {
    const updatedCart = cartItems.filter((item) => !(item.id === id && item.size === size))

    setCartItems(updatedCart)

    // Cập nhật tổng số lượng và tổng tiền
    const newCount = updatedCart.reduce((total, item) => total + item.quantity, 0)
    const newTotal = updatedCart.reduce((total, item) => total + item.price * item.quantity, 0)

    setCartCount(newCount)
    setCartTotal(newTotal)

    if (updatedCart.length === 0) {
      localStorage.removeItem("cart")
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedCart))
    }

    // Kích hoạt sự kiện storage để cập nhật giỏ hàng ở các tab khác
    window.dispatchEvent(new Event("storage"))
  }

  // Xóa tất cả sản phẩm trong giỏ hàng
  const clearCart = () => {
    setCartItems([])
    setCartCount(0)
    setCartTotal(0)
    localStorage.removeItem("cart")

    // Kích hoạt sự kiện storage để cập nhật giỏ hàng ở các tab khác
    window.dispatchEvent(new Event("storage"))
  }

  return {
    cartItems,
    cartCount,
    cartTotal,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  }
}
