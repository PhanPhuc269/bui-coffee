"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Eye, Download } from "lucide-react"
import type { Order } from "@/types"

export function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const { toast } = useToast()

  // Lấy danh sách đơn hàng
  const fetchOrders = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/orders")
      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu đơn hàng")
      }
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng:", error)
      toast({
        title: "Lỗi",
        description: "Không thể lấy dữ liệu đơn hàng. Đang hiển thị dữ liệu mẫu.",
        variant: "destructive",
      })

      // Dữ liệu mẫu khi có lỗi
      setOrders([
        {
          _id: "1",
          orderNumber: "HL240101001",
          customerInfo: {
            name: "Nguyễn Văn A",
            phone: "0901234567",
            email: "customer@email.com",
          },
          items: [
            {
              productId: "1",
              name: "Cà Phê Phin Đen",
              size: "Vừa",
              quantity: 2,
              price: 30000,
              total: 60000,
            },
          ],
          subtotal: 60000,
          tax: 6000,
          total: 66000,
          status: "pending",
          orderType: "takeaway",
          storeId: "1",
          notes: "Ít đường",
          createdAt: "2024-01-01T10:30:00Z",
          updatedAt: "2024-01-01T10:30:00Z",
        },
        {
          _id: "2",
          orderNumber: "HL240101002",
          customerInfo: {
            name: "Trần Thị B",
            phone: "0901234568",
            email: "customer2@email.com",
          },
          items: [
            {
              productId: "2",
              name: "Cà Phê Sữa Đá",
              size: "Lớn",
              quantity: 1,
              price: 39000,
              total: 39000,
            },
            {
              productId: "4",
              name: "Bánh Mì Thịt Nướng",
              size: "Thường",
              quantity: 1,
              price: 35000,
              total: 35000,
            },
          ],
          subtotal: 74000,
          tax: 7400,
          total: 81400,
          status: "completed",
          orderType: "dine-in",
          storeId: "1",
          notes: "",
          createdAt: "2024-01-01T11:15:00Z",
          updatedAt: "2024-01-01T11:45:00Z",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  // Cập nhật trạng thái đơn hàng
  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error("Không thể cập nhật trạng thái đơn hàng")
      }

      // Cập nhật trạng thái trong danh sách đơn hàng
      setOrders(
        orders.map((order) => {
          if (order._id === orderId) {
            return { ...order, status }
          }
          return order
        }),
      )

      toast({
        title: "Thành công",
        description: "Đã cập nhật trạng thái đơn hàng",
      })
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error)
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái đơn hàng",
        variant: "destructive",
      })
    }
  }

  // Xem chi tiết đơn hàng
  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailDialogOpen(true)
  }

  // Lọc đơn hàng theo từ khóa tìm kiếm và trạng thái
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.phone.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Format ngày giờ
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Format tiền tệ
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  // Lấy màu badge dựa trên trạng thái
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "warning"
      case "confirmed":
        return "info"
      case "preparing":
        return "secondary"
      case "ready":
        return "primary"
      case "completed":
        return "success"
      case "cancelled":
        return "destructive"
      default:
        return "default"
    }
  }

  // Lấy tên trạng thái tiếng Việt
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận"
      case "confirmed":
        return "Đã xác nhận"
      case "preparing":
        return "Đang chuẩn bị"
      case "ready":
        return "Sẵn sàng"
      case "completed":
        return "Hoàn thành"
      case "cancelled":
        return "Đã hủy"
      default:
        return status
    }
  }

  // Xuất đơn hàng ra PDF
  const handleExportOrder = (order: Order) => {
    toast({
      title: "Xuất đơn hàng",
      description: "Chức năng này sẽ được triển khai trong tương lai",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Tìm kiếm đơn hàng..."
            className="w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="pending">Chờ xác nhận</SelectItem>
              <SelectItem value="confirmed">Đã xác nhận</SelectItem>
              <SelectItem value="preparing">Đang chuẩn bị</SelectItem>
              <SelectItem value="ready">Sẵn sàng</SelectItem>
              <SelectItem value="completed">Hoàn thành</SelectItem>
              <SelectItem value="cancelled">Đã hủy</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={() => fetchOrders()}>
          Làm mới
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn hàng</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Ngày đặt</TableHead>
                  <TableHead className="text-right">Tổng tiền</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Không có đơn hàng nào
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>
                        <div>{order.customerInfo.name}</div>
                        <div className="text-sm text-gray-500">{order.customerInfo.phone}</div>
                      </TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(order.total)}</TableCell>
                      <TableCell>
                        <Select
                          defaultValue={order.status}
                          onValueChange={(value) => handleUpdateStatus(order._id, value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue>
                              <Badge variant={getStatusBadgeVariant(order.status) as any}>
                                {getStatusText(order.status)}
                              </Badge>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Chờ xác nhận</SelectItem>
                            <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                            <SelectItem value="preparing">Đang chuẩn bị</SelectItem>
                            <SelectItem value="ready">Sẵn sàng</SelectItem>
                            <SelectItem value="completed">Hoàn thành</SelectItem>
                            <SelectItem value="cancelled">Đã hủy</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewDetail(order)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleExportOrder(order)}>
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Dialog chi tiết đơn hàng */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng {selectedOrder?.orderNumber}</DialogTitle>
            <DialogDescription>Đặt lúc {selectedOrder ? formatDate(selectedOrder.createdAt) : ""}</DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Thông tin khách hàng</h3>
                  <div className="space-y-1">
                    <p>
                      <span className="font-medium">Tên:</span> {selectedOrder.customerInfo.name}
                    </p>
                    <p>
                      <span className="font-medium">Điện thoại:</span> {selectedOrder.customerInfo.phone}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {selectedOrder.customerInfo.email}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Thông tin đơn hàng</h3>
                  <div className="space-y-1">
                    <p>
                      <span className="font-medium">Loại đơn hàng:</span>{" "}
                      {selectedOrder.orderType === "takeaway"
                        ? "Mang đi"
                        : selectedOrder.orderType === "dine-in"
                          ? "Tại quán"
                          : "Giao hàng"}
                    </p>
                    <p>
                      <span className="font-medium">Trạng thái:</span>{" "}
                      <Badge variant={getStatusBadgeVariant(selectedOrder.status) as any}>
                        {getStatusText(selectedOrder.status)}
                      </Badge>
                    </p>
                    {selectedOrder.notes && (
                      <p>
                        <span className="font-medium">Ghi chú:</span> {selectedOrder.notes}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Sản phẩm</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sản phẩm</TableHead>
                      <TableHead>Kích cỡ</TableHead>
                      <TableHead className="text-center">Số lượng</TableHead>
                      <TableHead className="text-right">Đơn giá</TableHead>
                      <TableHead className="text-right">Thành tiền</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.size}</TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.total)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span>{formatCurrency(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Thuế:</span>
                  <span>{formatCurrency(selectedOrder.tax)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg">
                  <span>Tổng cộng:</span>
                  <span>{formatCurrency(selectedOrder.total)}</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => handleExportOrder(selectedOrder!)}>
              <Download className="h-4 w-4 mr-2" />
              Xuất PDF
            </Button>
            <Button onClick={() => setIsDetailDialogOpen(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
