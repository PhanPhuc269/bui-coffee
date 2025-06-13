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
import { Search, Plus, MoreHorizontal, Edit, Trash, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"
import type { Testimonial } from "@/types"

export function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<Testimonial> | null>(null)
  const [testimonialToDelete, setTestimonialToDelete] = useState<number | null>(null)
  const { toast } = useToast()

  // Fetch testimonials
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials")
        const data = await response.json()
        setTestimonials(data)
      } catch (error) {
        console.error("Error fetching testimonials:", error)
        toast({
          title: "Lỗi",
          description: "Không thể tải dữ liệu đánh giá",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [toast])

  // Filter testimonials based on search term
  const filteredTestimonials = testimonials.filter(
    (testimonial) =>
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle form submission for create/edit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentTestimonial) return

    try {
      const isEditing = currentTestimonial.id !== undefined
      const url = "/api/testimonials"
      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentTestimonial),
      })

      if (!response.ok) {
        throw new Error("Lỗi khi lưu đánh giá")
      }

      const savedTestimonial = await response.json()

      if (isEditing) {
        setTestimonials(testimonials.map((t) => (t.id === savedTestimonial.id ? savedTestimonial : t)))
      } else {
        setTestimonials([...testimonials, savedTestimonial])
      }

      setIsDialogOpen(false)
      toast({
        title: isEditing ? "Cập nhật thành công" : "Thêm mới thành công",
        description: `Đánh giá của "${savedTestimonial.name}" đã được ${isEditing ? "cập nhật" : "thêm"} thành công`,
      })
    } catch (error) {
      console.error("Error saving testimonial:", error)
      toast({
        title: "Lỗi",
        description: "Không thể lưu đánh giá",
        variant: "destructive",
      })
    }
  }

  // Handle delete testimonial
  const handleDelete = async () => {
    if (testimonialToDelete === null) return

    try {
      const response = await fetch(`/api/testimonials/${testimonialToDelete}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Lỗi khi xóa đánh giá")
      }

      setTestimonials(testimonials.filter((t) => t.id !== testimonialToDelete))
      setIsDeleteDialogOpen(false)
      toast({
        title: "Xóa thành công",
        description: "Đánh giá đã được xóa thành công",
      })
    } catch (error) {
      console.error("Error deleting testimonial:", error)
      toast({
        title: "Lỗi",
        description: "Không thể xóa đánh giá",
        variant: "destructive",
      })
    }
  }

  // Open dialog for create/edit
  const openDialog = (testimonial?: Testimonial) => {
    if (testimonial) {
      setCurrentTestimonial({ ...testimonial })
    } else {
      setCurrentTestimonial({
        name: "",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment: "",
        location: "",
      })
    }
    setIsDialogOpen(true)
  }

  // Open delete confirmation dialog
  const openDeleteDialog = (id: number) => {
    setTestimonialToDelete(id)
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
            placeholder="Tìm kiếm đánh giá..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm đánh giá
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentTestimonial?.id ? "Chỉnh sửa đánh giá" : "Thêm đánh giá mới"}</DialogTitle>
              <DialogDescription>
                Điền đầy đủ thông tin đánh giá và nhấn Lưu để {currentTestimonial?.id ? "cập nhật" : "thêm mới"}.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên khách hàng</Label>
                  <Input
                    id="name"
                    value={currentTestimonial?.name || ""}
                    onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input
                    id="avatar"
                    value={currentTestimonial?.avatar || ""}
                    onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, avatar: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Đánh giá (1-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={currentTestimonial?.rating || 5}
                    onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, rating: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comment">Nội dung đánh giá</Label>
                  <Textarea
                    id="comment"
                    value={currentTestimonial?.comment || ""}
                    onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, comment: e.target.value })}
                    rows={4}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Địa điểm</Label>
                  <Input
                    id="location"
                    value={currentTestimonial?.location || ""}
                    onChange={(e) => setCurrentTestimonial({ ...currentTestimonial, location: e.target.value })}
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
              <TableHead>Khách hàng</TableHead>
              <TableHead>Đánh giá</TableHead>
              <TableHead>Nội dung</TableHead>
              <TableHead>Địa điểm</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTestimonials.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Không tìm thấy đánh giá nào
                </TableCell>
              </TableRow>
            ) : (
              filteredTestimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell className="font-medium">{testimonial.name}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{testimonial.comment}</TableCell>
                  <TableCell>{testimonial.location}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Mở menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openDialog(testimonial)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openDeleteDialog(testimonial.id)}>
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
              Bạn có chắc chắn muốn xóa đánh giá này? Hành động này không thể hoàn tác.
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
