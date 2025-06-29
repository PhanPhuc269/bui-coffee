import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// Helper function to serialize MongoDB documents
function serializeDocument(doc: any) {
  if (!doc) return null

  // Convert _id from ObjectId to string
  if (doc._id) {
    doc._id = doc._id.toString()
  }

  // Handle nested documents in arrays
  Object.keys(doc).forEach((key) => {
    if (Array.isArray(doc[key])) {
      doc[key] = doc[key].map((item: any) => {
        if (item && typeof item === "object" && item._id) {
          return serializeDocument(item)
        }
        return item
      })
    } else if (doc[key] && typeof doc[key] === "object" && doc[key]._id) {
      doc[key] = serializeDocument(doc[key])
    }
  })

  return doc
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const { db } = await connectToDatabase()

    let product

    // Check if the ID is a valid ObjectId or a slug
    if (ObjectId.isValid(id)) {
      product = await db.collection("products").findOne({ _id: new ObjectId(id) })
    } else {
      // If not a valid ObjectId, treat as slug
      product = await db.collection("products").findOne({ slug: id })
    }

    if (!product) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 })
    }

    return NextResponse.json(serializeDocument(product))
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error)
    return NextResponse.json({ error: "Không thể lấy sản phẩm" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const { db } = await connectToDatabase()
    const updatedProduct = await request.json()

    // Kiểm tra slug đã tồn tại chưa (nếu slug thay đổi)
    if (updatedProduct.slug) {
      const existingProduct = await db
        .collection("products")
        .findOne({ slug: updatedProduct.slug, _id: { $ne: new ObjectId(id) } })
      if (existingProduct) {
        return NextResponse.json({ error: "Slug đã tồn tại" }, { status: 400 })
      }
    }

    // Validate required fields
    const requiredFields = ["name", "slug", "description", "category", "price", "image"]
    for (const field of requiredFields) {
      if (!updatedProduct[field]) {
        return NextResponse.json({ error: `Thiếu trường bắt buộc: ${field}` }, { status: 400 })
      }
    }

    // Ensure all fields have proper structure
    if (!updatedProduct.sizes || !Array.isArray(updatedProduct.sizes) || updatedProduct.sizes.length === 0) {
      updatedProduct.sizes = [{ name: "Nhỏ", price: updatedProduct.price }]
    }

    if (!updatedProduct.images || !Array.isArray(updatedProduct.images)) {
      updatedProduct.images = [updatedProduct.image]
    }

    if (!updatedProduct.nutritionalInfo) {
      updatedProduct.nutritionalInfo = {
        calories: 0,
        caffeine: "0mg",
        sugar: "0g",
      }
    }

    if (!updatedProduct.tags || !Array.isArray(updatedProduct.tags)) {
      updatedProduct.tags = []
    }

    // Cập nhật thời gian
    updatedProduct.updatedAt = new Date().toISOString()

    // Remove _id if it exists to avoid MongoDB error
    if (updatedProduct._id) {
      delete updatedProduct._id
    }

    const result = await db.collection("products").updateOne({ _id: new ObjectId(id) }, { $set: updatedProduct })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 })
    }

    const product = await db.collection("products").findOne({ _id: new ObjectId(id) })
    return NextResponse.json(serializeDocument(product))
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error)
    return NextResponse.json({ error: "Không thể cập nhật sản phẩm" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const { db } = await connectToDatabase()
    const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Xóa sản phẩm thành công" })
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error)
    return NextResponse.json({ error: "Không thể xóa sản phẩm" }, { status: 500 })
  }
}
