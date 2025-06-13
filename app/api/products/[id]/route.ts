import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const product = await db.collection("products").findOne({ _id: new ObjectId(params.id) })

    if (!product) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error)
    return NextResponse.json({ error: "Không thể lấy sản phẩm" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const updatedProduct = await request.json()

    // Kiểm tra slug đã tồn tại chưa (nếu slug thay đổi)
    if (updatedProduct.slug) {
      const existingProduct = await db
        .collection("products")
        .findOne({ slug: updatedProduct.slug, _id: { $ne: new ObjectId(params.id) } })
      if (existingProduct) {
        return NextResponse.json({ error: "Slug đã tồn tại" }, { status: 400 })
      }
    }

    // Cập nhật thời gian
    updatedProduct.updatedAt = new Date().toISOString()

    const result = await db.collection("products").updateOne({ _id: new ObjectId(params.id) }, { $set: updatedProduct })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 })
    }

    const product = await db.collection("products").findOne({ _id: new ObjectId(params.id) })
    return NextResponse.json(product)
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error)
    return NextResponse.json({ error: "Không thể cập nhật sản phẩm" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const result = await db.collection("products").deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Xóa sản phẩm thành công" })
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error)
    return NextResponse.json({ error: "Không thể xóa sản phẩm" }, { status: 500 })
  }
}
