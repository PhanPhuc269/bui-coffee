"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil, Trash2, Plus } from "lucide-react"
import type { Store } from "@/types"

export function StoresAdmin() {
  const [stores, setStores] = useState<Store[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentStore, setCurrentStore] = useState<Partial<Store> | null>(null)
  const [storeToDelete, setStoreToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  // Lấy danh sách cửa hàng
  const fetchStores = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/stores")
      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu cửa hàng")
      }
      const data = await response.json()
      setStores(data)
    } catch (error) {
      console.error("Lỗi khi lấy cửa hàng:", error)
      toast({
        title: "Lỗi",
        description: "Không thể lấy dữ liệu cửa hàng. Đang hiển thị dữ liệu mẫu.",
        variant: "destructive",
      })

      // Dữ liệu mẫu khi có lỗi
      setStores([
        {
          _id: "1",
          name: "Cà Phê Bụi Nguyễn Huệ",
          address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
          city: "Ho Chi Minh",
          district: "Quận 1",
          phone: "028-1234-5678",
          email: "nguyen.hue@highlands.com.vn",
          coordinates: {
            lat: 10.7769,
            lng: 106.7009,
          },
          hours: {
            monday: "06:00-22:00",
            tuesday: "06:00-22:00",
            wednesday: "06:00-22:00",
            thursday: "06:00-22:00",
            friday: "06:00-23:00",
            saturday: "06:00-23:00",
            sunday: "07:00-22:00",
          },
          facilities: ["wifi", "parking", "delivery", "takeaway"],
          image: "/placeholder.svg?height=200&width=400",
          isActive: true,
        },
        {
          _id: "2",
          name: "Cà Phê Bụi Lê Lợi",
          address: "45 Đường Lê Lợi, Quận 1, TP.HCM",
          city: "Ho Chi Minh",
          district: "Quận 1",
          phone: "028-1234-5679",
          email: "le.loi@highlands.com.vn",
          coordinates: {
            lat: 10.7731,
            lng: 106.7012,
          },
          hours: {
            monday: "06:00-22:00",
            tuesday: "06:00-22:00",
            wednesday: "06:00-22:00",
            thursday: "06:00-22:00",
            friday: "06:00-23:00",
            saturday: "06:00-23:00",
            sunday: "07:00-22:00",
          },
          facilities: ["wifi", "parking", "delivery", "takeaway"],
          image: "/placeholder.svg?height=200&width=400",
          isActive: true,
        },
        {
          _id: "3",
          name: "Cà Phê Bụi Hoàn Kiếm",
          address: "78 Đinh Tiên Hoàng, Quận Hoàn Kiếm, Hà Nội",
          city: "Ha Noi",
          district: "Quận Hoàn Kiếm",
          phone: "024-1234-5678",
          email: "hoan.kiem@highlands.com.vn",
          coordinates: {
            lat: 21.0285,
            lng: 105.8542,
          },
          hours: {
            monday: "06:00-22:00",
            tuesday: "06:00-22:00",
            wednesday: "06:00-22:00",
            thursday: "06:00-22:00",
            friday: "06:00-23:00",
            saturday: "06:00-23:00",
            sunday: "07:00-22:00",
          },
          facilities: ["wifi", "parking", "delivery", "takeaway"],
          image: "/placeholder.svg?height=200&width=400",
          isActive: true,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStores()
  }, [])

  // Lọc cửa hàng theo từ khóa tìm kiếm
  const filteredStores = stores.filter((store) => {
    const searchString = searchTerm.toLowerCase()
    return (
      store.name.toLowerCase().includes(searchString) ||
      store.address.toLowerCase().includes(searchString) ||
      store.city.toLowerCase().includes(searchString) ||
      store.district.toLowerCase().includes(searchString)
    )
  })

  // Mở dialog chỉnh sửa cửa hàng
  const handleEditStore = (store: Store) => {
    setCurrentStore(store)
    setIsDialogOpen(true)
  }

  // Mở dialog xóa cửa hàng
  const handleDeleteStore = (storeId: string) => {
    setStoreToDelete(storeId)
    setIsDeleteDialogOpen(true)
  }

  // Thêm cửa hàng mới
  const handleAddStore = () => {
    setCurrentStore({
      name: "",
      address: "",
      city: "",
      district: "",
      phone: "",
      email: "",
      coordinates: {
        lat: 0,
        lng: 0,
      },
      hours: {
        monday: "06:00-22:00",
        tuesday: "06:00-22:00",
        wednesday: "06:00-22:00",
        thursday: "06:00-22:00",
        friday: "06:00-22:00",
        saturday: "06:00-22:00",
        sunday: "06:00-22:00",
      },
      facilities: [],
      image: "/placeholder.svg?height=200&width=400",
      isActive: true,
    })
    setIsDialogOpen(true)
  }

  // Lưu cửa hàng (thêm mới hoặc cập nhật)
  const handleSaveStore = async () => {
    if (!currentStore) return

    try {
      let response
      if (currentStore._id) {
        // Cập nhật cửa hàng
        response = await fetch(`/api/stores/${currentStore._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentStore),
        })
      } else {
        // Thêm cửa hàng mới
        response = await fetch("/api/stores", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentStore),
        })
      }

      if (!response.ok) {
        throw new Error("Không thể lưu thông tin cửa hàng")
      }

      toast({
        title: "Thành công",
        description: currentStore._id ? "Đã cập nhật thông tin cửa hàng" : "Đã thêm cửa hàng mới",
      })

      setIsDialogOpen(false)
      fetchStores()
    } catch (error) {
      console.error("Lỗi khi lưu cửa hàng:", error)
      toast({
        title: "Lỗi",
        description: "Không thể lưu thông tin cửa hàng",
        variant: "destructive",
      })
    }
  }

  // Xóa cửa hàng
  const handleConfirmDelete = async () => {
    if (!storeToDelete) return

    try {
      const response = await fetch(`/api/stores/${storeToDelete}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Không thể xóa cửa hàng")
      }

      toast({
        title: "Thành công",
        description: "Đã xóa cửa hàng",
      })

      setIsDeleteDialogOpen(false)
      fetchStores()
    } catch (error) {
      console.error("Lỗi khi xóa cửa hàng:", error)
      toast({
        title: "Lỗi",
        description: "Không thể xóa cửa hàng",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Tìm kiếm cửa hàng..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
          <Button onClick={handleAddStore}>
            <Plus className="mr-2 h-4 w-4" /> Thêm cửa hàng
          </Button>
          <Button variant="outline" onClick={() => fetchStores()}>
            Làm mới
          </Button>
        </div>
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
                  <TableHead>Tên cửa hàng</TableHead>
                  <TableHead>Địa chỉ</TableHead>
                  <TableHead>Thành phố</TableHead>
                  <TableHead>Liên hệ</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStores.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Không có cửa hàng nào
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStores.map((store) => (
                    <TableRow key={store._id}>
                      <TableCell className="font-medium">{store.name}</TableCell>
                      <TableCell>{store.address}</TableCell>
                      <TableCell>{store.city}</TableCell>
                      <TableCell>
                        <div>{store.phone}</div>
                        <div className="text-sm text-gray-500">{store.email}</div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            store.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {store.isActive ? "Hoạt động" : "Tạm ngưng"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditStore(store)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteStore(store._id)}>
                            <Trash2 className="h-4 w-4" />
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

      {/* Dialog chỉnh sửa cửa hàng */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentStore?._id ? "Chỉnh sửa cửa hàng" : "Thêm cửa hàng mới"}</DialogTitle>
            <DialogDescription>Nhập thông tin chi tiết của cửa hàng và nhấn Lưu khi hoàn tất.</DialogDescription>
          </DialogHeader>
          {currentStore && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên cửa hàng</Label>
                <Input
                  id="name"
                  value={currentStore.name}
                  onChange={(e) => setCurrentStore({ ...currentStore, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input
                  id="address"
                  value={currentStore.address}
                  onChange={(e) => setCurrentStore({ ...currentStore, address: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Thành phố</Label>
                <Input
                  id="city"
                  value={currentStore.city}
                  onChange={(e) => setCurrentStore({ ...currentStore, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">Quận/Huyện</Label>
                <Input
                  id="district"
                  value={currentStore.district}
                  onChange={(e) => setCurrentStore({ ...currentStore, district: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  value={currentStore.phone}
                  onChange={(e) => setCurrentStore({ ...currentStore, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={currentStore.email}
                  onChange={(e) => setCurrentStore({ ...currentStore, email: e.target.value })}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="image">Hình ảnh URL</Label>
                <Input
                  id="image"
                  value={currentStore.image}
                  onChange={(e) => setCurrentStore({ ...currentStore, image: e.target.value })}
                />
              </div>
              <div className="space-y-2 col-span-2 flex items-center">
                <Checkbox
                  id="isActive"
                  checked={currentStore.isActive}
                  onCheckedChange={(checked) => setCurrentStore({ ...currentStore, isActive: !!checked })}
                />
                <Label htmlFor="isActive" className="ml-2">
                  Đang hoạt động
                </Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSaveStore}>Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog xác nhận xóa */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa cửa hàng này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
