import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const category = await db.collection("categories").findOne({ _id: new ObjectId(params.id) })

    if (!category) {
      return NextResponse.json({ error: "Không tìm thấy danh mục" }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error)
    return NextResponse.json({ error: "Không thể lấy danh mục" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const updatedCategory = await request.json()

    // Kiểm tra slug đã tồn tại chưa (nếu slug thay đổi)
    if (updatedCategory.slug) {
      const existingCategory = await db
        .collection("categories")
        .findOne({ slug: updatedCategory.slug, _id: { $ne: new ObjectId(params.id) } })
      if (existingCategory) {
        return NextResponse.json({ error: "Slug đã tồn tại" }, { status: 400 })
      }
    }

    const result = await db
      .collection("categories")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: updatedCategory })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Không tìm thấy danh mục" }, { status: 404 })
    }

    const category = await db.collection("categories").findOne({ _id: new ObjectId(params.id) })
    return NextResponse.json(category)
  } catch (error) {
    console.error("Lỗi khi cập nhật danh mục:", error)
    return NextResponse.json({ error: "Không thể cập nhật danh mục" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const result = await db.collection("categories").deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Không tìm thấy danh mục" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Xóa danh mục thành công" })
  } catch (error) {
    console.error("Lỗi khi xóa danh mục:", error)
    return NextResponse.json({ error: "Không thể xóa danh mục" }, { status: 500 })
  }
}
