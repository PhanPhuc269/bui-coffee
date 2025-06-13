"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
import { Switch } from "@/components/ui/switch"
import { Pencil, Trash2, Plus, MoveUp, MoveDown } from "lucide-react"
import type { Category } from "@/types"

export function CategoriesAdmin() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<Partial<Category> | null>(null)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  // Lấy danh sách danh mục
  const fetchCategories = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/categories")
      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu danh mục")
      }
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error)
      toast({
        title: "Lỗi",
        description: "Không thể lấy dữ liệu danh mục. Đang hiển thị dữ liệu mẫu.",
        variant: "destructive",
      })

      // Dữ liệu mẫu khi có lỗi
      setCategories([
        {
          _id: "1",
          name: "Cà Phê",
          slug: "coffee",
          description: "Các loại cà phê truyền thống và hiện đại",
          image: "/placeholder.svg?height=200&width=200",
          order: 1,
          isActive: true,
        },
        {
          _id: "2",
          name: "Trà",
          slug: "tea",
          description: "Các loại trà thơm ngon, thanh mát",
          image: "/placeholder.svg?height=200&width=200",
          order: 2,
          isActive: true,
        },
        {
          _id: "3",
          name: "Bánh & Snack",
          slug: "food",
          description: "Các loại bánh và đồ ăn nhẹ",
          image: "/placeholder.svg?height=200&width=200",
          order: 3,
          isActive: true,
        },
        {
          _id: "4",
          name: "Đồ uống khác",
          slug: "others",
          description: "Các loại đồ uống đặc biệt khác",
          image: "/placeholder.svg?height=200&width=200",
          order: 4,
          isActive: true,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  // Lọc danh mục theo từ khóa tìm kiếm
  const filteredCategories = categories.filter((category) => {
    const searchString = searchTerm.toLowerCase()
    return (
      category.name.toLowerCase().includes(searchString) ||
      category.slug.toLowerCase().includes(searchString) ||
      category.description.toLowerCase().includes(searchString)
    )
  })

  // Mở dialog chỉnh sửa danh mục
  const handleEditCategory = (category: Category) => {
    setCurrentCategory(category)
    setIsDialogOpen(true)
  }

  // Mở dialog xóa danh mục
  const handleDeleteCategory = (categoryId: string) => {
    setCategoryToDelete(categoryId)
    setIsDeleteDialogOpen(true)
  }

  // Thêm danh mục mới
  const handleAddCategory = () => {
    const maxOrder = categories.reduce((max, category) => Math.max(max, category.order), 0)
    setCurrentCategory({
      name: "",
      slug: "",
      description: "",
      image: "/placeholder.svg?height=200&width=200",
      order: maxOrder + 1,
      isActive: true,
    })
    setIsDialogOpen(true)
  }

  // Lưu danh mục (thêm mới hoặc cập nhật)
  const handleSaveCategory = async () => {
    if (!currentCategory) return

    try {
      let response
      if (currentCategory._id) {
        // Cập nhật danh mục
        response = await fetch(`/api/categories/${currentCategory._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentCategory),
        })
      } else {
        // Thêm danh mục mới
        response = await fetch("/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentCategory),
        })
      }

      if (!response.ok) {
        throw new Error("Không thể lưu thông tin danh mục")
      }

      toast({
        title: "Thành công",
        description: currentCategory._id ? "Đã cập nhật thông tin danh mục" : "Đã thêm danh mục mới",
      })

      setIsDialogOpen(false)
      fetchCategories()
    } catch (error) {
      console.error("Lỗi khi lưu danh mục:", error)
      toast({
        title: "Lỗi",
        description: "Không thể lưu thông tin danh mục",
        variant: "destructive",
      })
    }
  }

  // Xóa danh mục
  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return

    try {
      const response = await fetch(`/api/categories/${categoryToDelete}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Không thể xóa danh mục")
      }

      toast({
        title: "Thành công",
        description: "Đã xóa danh mục",
      })

      setIsDeleteDialogOpen(false)
      fetchCategories()
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error)
      toast({
        title: "Lỗi",
        description: "Không thể xóa danh mục",
        variant: "destructive",
      })
    }
  }

  // Di chuyển danh mục lên
  const handleMoveUp = async (index: number) => {
    if (index <= 0) return

    try {
      const updatedCategories = [...categories]
      const currentCategory = { ...updatedCategories[index] }
      const previousCategory = { ...updatedCategories[index - 1] }

      // Đổi thứ tự
      const tempOrder = currentCategory.order
      currentCategory.order = previousCategory.order
      previousCategory.order = tempOrder

      // Cập nhật danh mục hiện tại
      await fetch(`/api/categories/${currentCategory._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentCategory),
      })

      // Cập nhật danh mục trước đó
      await fetch(`/api/categories/${previousCategory._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(previousCategory),
      })

      // Cập nhật UI
      updatedCategories[index] = previousCategory
      updatedCategories[index - 1] = currentCategory
      setCategories(updatedCategories)

      toast({
        title: "Thành công",
        description: "Đã di chuyển danh mục lên",
      })
    } catch (error) {
      console.error("Lỗi khi di chuyển danh mục:", error)
      toast({
        title: "Lỗi",
        description: "Không thể di chuyển danh mục",
        variant: "destructive",
      })
    }
  }

  // Di chuyển danh mục xuống
  const handleMoveDown = async (index: number) => {
    if (index >= categories.length - 1) return

    try {
      const updatedCategories = [...categories]
      const currentCategory = { ...updatedCategories[index] }
      const nextCategory = { ...updatedCategories[index + 1] }

      // Đổi thứ tự
      const tempOrder = currentCategory.order
      currentCategory.order = nextCategory.order
      nextCategory.order = tempOrder

      // Cập nhật danh mục hiện tại
      await fetch(`/api/categories/${currentCategory._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentCategory),
      })

      // Cập nhật danh mục tiếp theo
      await fetch(`/api/categories/${nextCategory._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nextCategory),
      })

      // Cập nhật UI
      updatedCategories[index] = nextCategory
      updatedCategories[index + 1] = currentCategory
      setCategories(updatedCategories)

      toast({
        title: "Thành công",
        description: "Đã di chuyển danh mục xuống",
      })
    } catch (error) {
      console.error("Lỗi khi di chuyển danh mục:", error)
      toast({
        title: "Lỗi",
        description: "Không thể di chuyển danh mục",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Tìm kiếm danh mục..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
          <Button onClick={handleAddCategory}>
            <Plus className="mr-2 h-4 w-4" /> Thêm danh mục
          </Button>
          <Button variant="outline" onClick={() => fetchCategories()}>
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
                  <TableHead>Thứ tự</TableHead>
                  <TableHead>Tên danh mục</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Không có danh mục nào
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((category, index) => (
                    <TableRow key={category._id}>
                      <TableCell className="text-center">{category.order}</TableCell>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.slug}</TableCell>
                      <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            category.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {category.isActive ? "Hoạt động" : "Ẩn"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleMoveUp(index)} disabled={index === 0}>
                            <MoveUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMoveDown(index)}
                            disabled={index === filteredCategories.length - 1}
                          >
                            <MoveDown className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(category._id)}>
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

      {/* Dialog chỉnh sửa danh mục */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentCategory?._id ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}</DialogTitle>
            <DialogDescription>Nhập thông tin chi tiết của danh mục và nhấn Lưu khi hoàn tất.</DialogDescription>
          </DialogHeader>
          {currentCategory && (
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên danh mục</Label>
                <Input
                  id="name"
                  value={currentCategory.name}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={currentCategory.slug}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, slug: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={currentCategory.description}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Hình ảnh URL</Label>
                <Input
                  id="image"
                  value={currentCategory.image}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, image: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Thứ tự</Label>
                <Input
                  id="order"
                  type="number"
                  value={currentCategory.order}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, order: Number(e.target.value) })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={currentCategory.isActive}
                  onCheckedChange={(checked) => setCurrentCategory({ ...currentCategory, isActive: checked })}
                />
                <Label htmlFor="isActive">Hiển thị danh mục</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSaveCategory}>Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog xác nhận xóa */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa danh mục này? Hành động này không thể hoàn tác.
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
