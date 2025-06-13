"use client"

import Link from "next/link"
import Image from "next/image"
import { siteConfig } from "@/config/site"
import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function AdminHeader() {
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    // Xóa trạng thái đăng nhập
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminAuth")
    }
    toast({
      title: "Đăng xuất thành công",
    })
    router.push("/admin/login")
  }

  return (
    <header className="h-16 border-b bg-white flex items-center px-6">
      <div className="flex-1 flex items-center">
        <Link href="/admin" className="flex items-center gap-2">
          <Image src={siteConfig.logo || "/placeholder.svg"} alt={siteConfig.name} width={32} height={32} />
          <span className="font-bold text-lg">{siteConfig.name} Admin</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Admin</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Hồ sơ</DropdownMenuItem>
            <DropdownMenuItem>Cài đặt tài khoản</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
