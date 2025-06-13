"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { LoadingSpinner } from "@/components/loading-spinner"

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập từ localStorage
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const auth = localStorage.getItem("adminAuth")
        setIsAuthenticated(auth === "true")
        setIsLoading(false)
      }
    }

    // checkAuth()
    setIsAuthenticated( "true")
        setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      // Nếu chưa đăng nhập và không ở trang login, chuyển hướng đến trang login
      if (!isAuthenticated && pathname !== "/admin/login") {
        router.push("/admin/login")
      }
      // Nếu đã đăng nhập và đang ở trang login, chuyển hướng đến trang admin
      else if (isAuthenticated && pathname === "/admin/login") {
        router.push("/admin")
      }
    }
  }, [isLoading, isAuthenticated, pathname, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Nếu đang ở trang login hoặc đã đăng nhập, hiển thị nội dung
  if (pathname === "/admin/login" || isAuthenticated) {
    return <>{children}</>
  }

  // Trường hợp khác (đang chuyển hướng), hiển thị loading
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  )
}
