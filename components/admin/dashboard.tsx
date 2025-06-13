"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductsTable } from "@/components/admin/products-table"
import { OrdersTable } from "@/components/admin/orders-table"
import { StoresTable } from "@/components/admin/stores-table"
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products")

  return (
    <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid grid-cols-4 w-full max-w-2xl">
        <TabsTrigger value="products">Sản phẩm</TabsTrigger>
        <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
        <TabsTrigger value="stores">Cửa hàng</TabsTrigger>
        <TabsTrigger value="analytics">Thống kê</TabsTrigger>
      </TabsList>
      <TabsContent value="products" className="space-y-4">
        <ProductsTable />
      </TabsContent>
      <TabsContent value="orders" className="space-y-4">
        <OrdersTable />
      </TabsContent>
      <TabsContent value="stores" className="space-y-4">
        <StoresTable />
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        <AnalyticsDashboard />
      </TabsContent>
    </Tabs>
  )
}
