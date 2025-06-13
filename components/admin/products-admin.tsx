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
import { Switch } from "@/components/ui/switch"
import { Search, Plus, MoreHorizontal, Edit, Trash, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"
import type { Product, Category } from "@/types"
import { formatCurrency } from "@/lib/utils"

export function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsResponse = await fetch("/api/products")
        const productsData = await productsResponse.json()
        setProducts(productsData)

        // Fetch categories
        const categoriesResponse = await fetch("/api/categories")
        const categoriesData = await categoriesResponse.json()
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Lỗi",
          description: "Không thể tải dữ liệu sản phẩm",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle form submission for create/edit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentProduct) return

    try {
      const isEditing = !!currentProduct._id
      const url = isEditing ? `/api/products/${currentProduct._id}` : "/api/products"
      const method = isEditing ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentProduct),
      })

      if (!response.ok) {
        throw new Error("Lỗi khi lưu sản phẩm")
      }

      const savedProduct = await response.json()

      if (isEditing) {
        setProducts(products.map((p) => (p._id === savedProduct._id ? savedProduct : p)))
      } else {
        setProducts([...products, savedProduct])
      }

      setIsDialogOpen(false)
      toast({
        title: isEditing ? "Cập nhật thành công" : "Thêm mới thành công",
        description: `Sản phẩm "${savedProduct.name}" đã được ${isEditing ? "cập nhật" : "thêm"} thành công`,
      })
    } catch (error) {
      console.error("Error saving product:", error)
      toast({
        title: "Lỗi",
        description: "Không thể lưu sản phẩm",
        variant: "destructive",
      })
    }
  }

  // Handle delete product
  const handleDelete = async () => {
    if (!productToDelete) return

    try {
      const response = await fetch(`/api/products/${productToDelete}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Lỗi khi xóa sản phẩm")
      }

      setProducts(products.filter((p) => p._id !== productToDelete))
      setIsDeleteDialogOpen(false)
      toast({
        title: "Xóa thành công",
        description: "Sản phẩm đã được xóa thành công",
      })
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({
        title: "Lỗi",
        description: "Không thể xóa sản phẩm",
        variant: "destructive",
      })
    }
  }

  // Open dialog for create/edit
  const openDialog = (product?: Product) => {
    if (product) {
      setCurrentProduct({ ...product })
    } else {
      setCurrentProduct({
        name: "",
        slug: "",
        description: "",
        longDescription: "",
        category: categories[0]?.slug || "",
        price: 0,
        sizes: [{ name: "Nhỏ", price: 0 }],
        image: "/placeholder.svg?height=300&width=300",
        images: ["/placeholder.svg?height=600&width=600"],
        isAvailable: true,
        isFeatured: false,
        nutritionalInfo: {
          calories: 0,
          caffeine: "0mg",
          sugar: "0g",
        },
        tags: [],
      })
    }
    setIsDialogOpen(true)
  }

  // Open delete confirmation dialog
  const openDeleteDialog = (id: string) => {
    setProductToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  // Handle size changes
  const handleSizeChange = (index: number, field: "name" | "price", value: string | number) => {
    if (!currentProduct?.sizes) return

    const newSizes = [...currentProduct.sizes]
    newSizes[index] = { ...newSizes[index], [field]: value }
    setCurrentProduct({ ...currentProduct, sizes: newSizes })
  }

  // Add new size
  const addSize = () => {
    if (!currentProduct) return

    const newSizes = [...(currentProduct.sizes || []), { name: "", price: 0 }]
    setCurrentProduct({ ...currentProduct, sizes: newSizes })
  }

  // Remove size
  const removeSize = (index: number) => {
    if (!currentProduct?.sizes) return

    const newSizes = currentProduct.sizes.filter((_, i) => i !== index)
    setCurrentProduct({ ...currentProduct, sizes: newSizes })
  }

  // Handle tags changes
  const handleTagsChange = (value: string) => {
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
    setCurrentProduct({ ...currentProduct, tags })
  }

  // Handle images changes
  const handleImagesChange = (value: string) => {
    const images = value
      .split("\n")
      .map((img) => img.trim())
      .filter((img) => img.length > 0)
    setCurrentProduct({ ...currentProduct, images })
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
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm sản phẩm
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{currentProduct?._id ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</DialogTitle>
              <DialogDescription>
                Điền đầy đủ thông tin sản phẩm và nhấn Lưu để {currentProduct?._id ? "cập nhật" : "thêm mới"}.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tên sản phẩm *</Label>
                    <Input
                      id="name"
                      value={currentProduct?.name || ""}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={currentProduct?.slug || ""}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, slug: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả ngắn *</Label>
                  <Input
                    id="description"
                    value={currentProduct?.description || ""}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longDescription">Mô tả chi tiết *</Label>
                  <Textarea
                    id="longDescription"
                    value={currentProduct?.longDescription || ""}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, longDescription: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                {/* Category and Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Danh mục *</Label>
                    <Select
                      value={currentProduct?.category || ""}
                      onValueChange={(value) => setCurrentProduct({ ...currentProduct, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.slug} value={category.slug}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Giá cơ bản *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={currentProduct?.price || 0}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, price: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>

                {/* Sizes */}
                <div className="space-y-2">
                  <Label>Kích cỡ và giá</Label>
                  <div className="space-y-2">
                    {currentProduct?.sizes?.map((size, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Input
                          placeholder="Tên kích cỡ"
                          value={size.name}
                          onChange={(e) => handleSizeChange(index, "name", e.target.value)}
                        />
                        <Input
                          type="number"
                          placeholder="Giá"
                          value={size.price}
                          onChange={(e) => handleSizeChange(index, "price", Number(e.target.value))}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeSize(index)}
                          disabled={(currentProduct?.sizes?.length || 0) <= 1}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addSize}>
                      Thêm kích cỡ
                    </Button>
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-2">
                  <Label htmlFor="image">Hình ảnh chính *</Label>
                  <Input
                    id="image"
                    value={currentProduct?.image || ""}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Hình ảnh phụ (mỗi URL một dòng)</Label>
                  <Textarea
                    id="images"
                    value={currentProduct?.images?.join("\n") || ""}
                    onChange={(e) => handleImagesChange(e.target.value)}
                    rows={3}
                    placeholder="/placeholder.svg?height=600&width=600"
                  />
                </div>

                {/* Nutritional Info */}
                <div className="space-y-2">
                  <Label>Thông tin dinh dưỡng</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label htmlFor="calories">Calories</Label>
                      <Input
                        id="calories"
                        type="number"
                        value={currentProduct?.nutritionalInfo?.calories || 0}
                        onChange={(e) =>
                          setCurrentProduct({
                            ...currentProduct,
                            nutritionalInfo: {
                              ...currentProduct?.nutritionalInfo,
                              calories: Number(e.target.value),
                            },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="caffeine">Caffeine</Label>
                      <Input
                        id="caffeine"
                        value={currentProduct?.nutritionalInfo?.caffeine || ""}
                        onChange={(e) =>
                          setCurrentProduct({
                            ...currentProduct,
                            nutritionalInfo: {
                              ...currentProduct?.nutritionalInfo,
                              caffeine: e.target.value,
                            },
                          })
                        }
                        placeholder="95mg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sugar">Đường</Label>
                      <Input
                        id="sugar"
                        value={currentProduct?.nutritionalInfo?.sugar || ""}
                        onChange={(e) =>
                          setCurrentProduct({
                            ...currentProduct,
                            nutritionalInfo: {
                              ...currentProduct?.nutritionalInfo,
                              sugar: e.target.value,
                            },
                          })
                        }
                        placeholder="15g"
                      />
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (phân cách bằng dấu phẩy)</Label>
                  <Input
                    id="tags"
                    value={currentProduct?.tags?.join(", ") || ""}
                    onChange={(e) => handleTagsChange(e.target.value)}
                    placeholder="hot, traditional, popular"
                  />
                </div>

                {/* Switches */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isAvailable"
                      checked={currentProduct?.isAvailable || false}
                      onCheckedChange={(checked) => setCurrentProduct({ ...currentProduct, isAvailable: checked })}
                    />
                    <Label htmlFor="isAvailable">Còn hàng</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isFeatured"
                      checked={currentProduct?.isFeatured || false}
                      onCheckedChange={(checked) => setCurrentProduct({ ...currentProduct, isFeatured: checked })}
                    />
                    <Label htmlFor="isFeatured">Sản phẩm nổi bật</Label>
                  </div>
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
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead className="text-right">Giá</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Nổi bật</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Không tìm thấy sản phẩm nào
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{categories.find((c) => c.slug === product.category)?.name || product.category}</TableCell>
                  <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.isAvailable ? "Còn hàng" : "Hết hàng"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.isFeatured ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {product.isFeatured ? "Nổi bật" : "Thường"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Mở menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openDialog(product)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openDeleteDialog(product._id)}>
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
              Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác.
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
