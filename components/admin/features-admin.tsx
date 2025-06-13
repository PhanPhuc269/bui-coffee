"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, MoreHorizontal, Edit, Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"
import type { Feature } from "@/types"

const availableIcons = ["Coffee", "Clock", "MapPin", "Wifi", "Star", "Heart", "Award", "Gift", "Smile", "ThumbsUp"]

export function FeaturesAdmin() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentFeature, setCurrentFeature] = useState<Partial<Feature> | null>(null)
  const [featureToDelete, setFeatureToDelete] = useState<number | null>(null)
  const { toast } = useToast()

  // Fetch features
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch("/api/features")
        const data = await response.json()
        setFeatures(data)
      } catch (error) {
        console.error("Error fetching features:", error)
        toast({
          title: "Lỗi",
          description: "Không thể tải dữ liệu tính năng",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeatures()
  }, [toast])

  // Filter features based on search term
  const filteredFeatures = features.filter(
    (feature) =>
      feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle form submission for create/edit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentFeature) return

    try {
      const isEditing = currentFeature.title !== undefined && features.some((f) => f.title === currentFeature.title)
      const url = "/api/features"
      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentFeature),
      })

      if (!response.ok) {
        throw new Error("Lỗi khi lưu tính năng")
      }

      const savedFeature = await response.json()

      if (isEditing) {
        setFeatures(features.map((f) => (f.title === savedFeature.title ? savedFeature : f)))
      } else {
        setFeatures([...features, savedFeature])
      }

      setIsDialogOpen(false)
      toast({
        title: isEditing ? "Cập nhật thành công" : "Thêm mới thành công",
        description: `Tính năng "${savedFeature.title}" đã được ${isEditing ? "cập nhật" : "thêm"} thành công`,
      })
    } catch (error) {
      console.error("Error saving feature:", error)
      toast({
        title: "Lỗi",
        description: "Không thể lưu tính năng",
        variant: "destructive",
      })
    }
  }

  // Handle delete feature
  const handleDelete = async () => {
    if (featureToDelete === null) return

    try {
      const featureTitle = features[featureToDelete].title
      const response = await fetch(`/api/features/${encodeURIComponent(featureTitle)}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Lỗi khi xóa tính năng")
      }

      setFeatures(features.filter((_, index) => index !== featureToDelete))
      setIsDeleteDialogOpen(false)
      toast({
        title: "Xóa thành công",
        description: "Tính năng đã được xóa thành công",
      })
    } catch (error) {
      console.error("Error deleting feature:", error)
      toast({
        title: "Lỗi",
        description: "Không thể xóa tính năng",
        variant: "destructive",
      })
    }
  }

  // Open dialog for create/edit
  const openDialog = (feature?: Feature, index?: number) => {
    if (feature) {
      setCurrentFeature({ ...feature })
    } else {
      setCurrentFeature({
        icon: "Coffee",
        title: "",
        description: "",
      })
    }
    setIsDialogOpen(true)
  }

  // Open delete confirmation dialog
  const openDeleteDialog = (index: number) => {
    setFeatureToDelete(index)
    setIsDeleteDialogOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm tính năng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm tính năng
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {currentFeature?.title && features.some((f) => f.title === currentFeature.title)
                  ? "Chỉnh sửa tính năng"
                  : "Thêm tính năng mới"}
              </DialogTitle>
              <DialogDescription>
                Điền đầy đủ thông tin tính năng và nhấn Lưu để{" "}
                {currentFeature?.title && features.some((f) => f.title === currentFeature.title)
                  ? "cập nhật"
                  : "thêm mới"}
                .
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="icon">Icon</Label>
                  <Select
                    value={currentFeature?.icon || "Coffee"}
                    onValueChange={(value) => setCurrentFeature({ ...currentFeature, icon: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableIcons.map((icon) => (
                        <SelectItem key={icon} value={icon}>
                          {icon}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề</Label>
                  <Input
                    id="title"
                    value={currentFeature?.title || ""}
                    onChange={(e) => setCurrentFeature({ ...currentFeature, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    value={currentFeature?.description || ""}
                    onChange={(e) => setCurrentFeature({ ...currentFeature, description: e.target.value })}
                    rows={3}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit">Lưu</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFeatures.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  Không tìm thấy tính năng nào
                </TableCell>
              </TableRow>
            ) : (
              filteredFeatures.map((feature, index) => (
                <TableRow key={index}>
                  <TableCell>{feature.icon}</TableCell>
                  <TableCell className="font-medium">{feature.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{feature.description}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Mở menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openDialog(feature, index)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openDeleteDialog(index)}>
                          <Trash className="h-4 w-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa tính năng này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
