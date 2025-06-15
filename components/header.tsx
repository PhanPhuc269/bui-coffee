"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Search, ShoppingBag } from "lucide-react"
import { CartDrawer } from "@/components/cart/cart-drawer"

const navigation = [
  { name: "Trang chủ", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Cửa hàng", href: "/locations" },
  { name: "Về chúng tôi", href: "/about" },
  { name: "Liên hệ", href: "/contact" },
]

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" className="flex items-center gap-2">
                  <Image src="/favicon-32x32.png" width={40} height={40} alt="Cà Phê Bụi Logo" />
                  <span className="text-lg font-bold">Cà Phê Bụi</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === item.href ? "text-primary" : "text-foreground",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/favicon.svg" width={40} height={40} alt="Cà Phê Bụi Logo" />
            <span className="hidden font-bold md:inline-block">Cà Phê Bụi</span>
          </Link>
        </div>
        <nav className="hidden lg:flex lg:gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="h-9 w-[200px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}
