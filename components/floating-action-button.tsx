"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, MapPin, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      icon: Phone,
      label: "Gọi điện",
      href: "tel:18006936",
      className: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: MessageCircle,
      label: "Chat",
      href: "#",
      className: "bg-blue-500 hover:bg-blue-600",
    },
    {
      icon: MapPin,
      label: "Tìm cửa hàng",
      href: "/locations",
      className: "bg-purple-500 hover:bg-purple-600",
    },
  ]

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="flex flex-col-reverse items-start gap-3">
        {isOpen &&
          actions.map((action, index) => (
            <div
              key={index}
              className={cn(
                "transform transition-all duration-300 ease-out",
                isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95",
              )}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <Button
                asChild
                size="icon"
                className={cn("rounded-full shadow-lg text-white", action.className)}
                title={action.label}
              >
                <a href={action.href}>
                  <action.icon className="h-5 w-5" />
                  <span className="sr-only">{action.label}</span>
                </a>
              </Button>
            </div>
          ))}

        <Button
          size="icon"
          className="rounded-full shadow-lg bg-primary hover:bg-primary/90"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Đóng menu" : "Mở menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  )
}
