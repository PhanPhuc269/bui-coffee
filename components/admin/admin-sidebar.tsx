"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Coffee,
  FolderTree,
  Store,
  ShoppingCart,
  MessageSquare,
  Star,
  Settings,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const navItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Sản phẩm",
    href: "/admin/products",
    icon: Coffee,
  },
  {
    name: "Danh mục",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    name: "Cửa hàng",
    href: "/admin/stores",
    icon: Store,
  },
  {
    name: "Đơn hàng",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Đánh giá",
    href: "/admin/testimonials",
    icon: MessageSquare,
  },
  {
    name: "Tính năng",
    href: "/admin/features",
    icon: Star,
  },
  {
    name: "Cài đặt",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    // Xóa trạng thái đăng nhập
    localStorage.removeItem("adminAuth")
    toast({
      title: "Đăng xuất thành công",
    })
    router.push("/admin/login")
  }

  return (
    <div className="w-64 bg-white shadow-sm h-[calc(100vh-64px)] p-4 flex flex-col">
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-gray-100",
              pathname === item.href ? "bg-gray-100 text-primary font-medium" : "text-gray-500",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-4 px-4">
        <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Đăng xuất
        </Button>
      </div>
    </div>
  )
}
