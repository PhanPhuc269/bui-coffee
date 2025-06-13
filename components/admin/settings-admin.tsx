"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"
import type { SiteConfig } from "@/types"

export function SettingsAdmin() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  // Fetch site config
  useEffect(() => {
    const fetchSiteConfig = async () => {
      try {
        const response = await fetch("/api/settings")
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        const data = await response.json()
        setSiteConfig(data)
      } catch (error) {
        console.error("Error fetching site config:", error)
        toast({
          title: "Lỗi",
          description: "Không thể tải cấu hình trang web",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSiteConfig()
  }, [toast])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!siteConfig) return

    setIsSaving(true)
    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(siteConfig),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Lỗi khi lưu cấu hình")
      }

      toast({
        title: "Lưu thành công",
        description: "Cấu hình trang web đã được cập nhật",
      })
    } catch (error) {
      console.error("Error saving site config:", error)
      toast({
        title: "Lỗi",
        description:
          typeof error === "object" && error !== null && "message" in error
            ? (error as Error).message
            : "Không thể lưu cấu hình trang web",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Handle input change
  const handleChange = (section: keyof SiteConfig, field: string, value: string) => {
    if (!siteConfig) return

    if (section === "name" || section === "description" || section === "logo") {
      setSiteConfig({
        ...siteConfig,
        [section]: value,
      })
    } else {
      setSiteConfig({
        ...siteConfig,
        [section]: {
          ...siteConfig[section],
          [field]: value,
        },
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!siteConfig) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Không thể tải cấu hình trang web</p>
      </div>
    )
  }

  return (
    <Tabs defaultValue="general">
      <TabsList className="mb-6">
        <TabsTrigger value="general">Thông tin chung</TabsTrigger>
        <TabsTrigger value="contact">Liên hệ</TabsTrigger>
        <TabsTrigger value="social">Mạng xã hội</TabsTrigger>
        <TabsTrigger value="hours">Giờ mở cửa</TabsTrigger>
      </TabsList>

      <form onSubmit={handleSubmit}>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin chung</CardTitle>
              <CardDescription>Cấu hình thông tin cơ bản của trang web</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên quán cà phê</Label>
                <Input
                  id="name"
                  value={siteConfig.name}
                  onChange={(e) => handleChange("name", "", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={siteConfig.description}
                  onChange={(e) => handleChange("description", "", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  value={siteConfig.logo}
                  onChange={(e) => handleChange("logo", "", e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin liên hệ</CardTitle>
              <CardDescription>Cấu hình thông tin liên hệ của quán cà phê</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hotline">Hotline</Label>
                <Input
                  id="hotline"
                  value={siteConfig.contact.hotline}
                  onChange={(e) => handleChange("contact", "hotline", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={siteConfig.contact.email}
                  onChange={(e) => handleChange("contact", "email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Textarea
                  id="address"
                  value={siteConfig.contact.address}
                  onChange={(e) => handleChange("contact", "address", e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Mạng xã hội</CardTitle>
              <CardDescription>Cấu hình liên kết mạng xã hội</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={siteConfig.socialMedia.facebook}
                  onChange={(e) => handleChange("socialMedia", "facebook", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={siteConfig.socialMedia.instagram}
                  onChange={(e) => handleChange("socialMedia", "instagram", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube</Label>
                <Input
                  id="youtube"
                  value={siteConfig.socialMedia.youtube}
                  onChange={(e) => handleChange("socialMedia", "youtube", e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="hours">
          <Card>
            <CardHeader>
              <CardTitle>Giờ mở cửa</CardTitle>
              <CardDescription>Cấu hình giờ mở cửa của quán cà phê</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="weekdays">Thứ 2 - Thứ 6</Label>
                <Input
                  id="weekdays"
                  value={siteConfig.businessHours.weekdays}
                  onChange={(e) => handleChange("businessHours", "weekdays", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weekend">Thứ 7 - Chủ nhật</Label>
                <Input
                  id="weekend"
                  value={siteConfig.businessHours.weekend}
                  onChange={(e) => handleChange("businessHours", "weekend", e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </form>
    </Tabs>
  )
}
