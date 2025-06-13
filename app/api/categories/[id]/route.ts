import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// Helper function to serialize MongoDB documents
function serializeDocument(doc: any) {
  if (!doc) return null
  if (doc._id) {
    doc._id = doc._id.toString()
  }
  return doc
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { db } = await connectToDatabase()
    const category = await db.collection("categories").findOne({ _id: new ObjectId(id) })

    if (!category) {
      return NextResponse.json({ error: "Không tìm thấy danh mục" }, { status: 404 })
    }

    return NextResponse.json(serializeDocument(category))
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error)
    return NextResponse.json({ error: "Không thể lấy danh mục" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { db } = await connectToDatabase()
    const updatedCategory = await request.json()

    // Remove _id if it exists to avoid MongoDB error
    if (updatedCategory._id) {
      delete updatedCategory._id
    }

    const result = await db.collection("categories").updateOne({ _id: new ObjectId(id) }, { $set: updatedCategory })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Không tìm thấy danh mục" }, { status: 404 })
    }

    const category = await db.collection("categories").findOne({ _id: new ObjectId(id) })
    return NextResponse.json(serializeDocument(category))
  } catch (error) {
    console.error("Lỗi khi cập nhật danh mục:", error)
    return NextResponse.json({ error: "Không thể cập nhật danh mục" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { db } = await connectToDatabase()
    const result = await db.collection("categories").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Không tìm thấy danh mục" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Xóa danh mục thành công" })
  } catch (error) {
    console.error("Lỗi khi xóa danh mục:", error)
    return NextResponse.json({ error: "Không thể xóa danh mục" }, { status: 500 })
  }
}
