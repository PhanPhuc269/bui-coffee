import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const store = await db.collection("stores").findOne({ _id: new ObjectId(params.id) })

    if (!store) {
      return NextResponse.json({ error: "Không tìm thấy cửa hàng" }, { status: 404 })
    }

    return NextResponse.json(store)
  } catch (error) {
    console.error("Lỗi khi lấy cửa hàng:", error)
    return NextResponse.json({ error: "Không thể lấy cửa hàng" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const updatedStore = await request.json()

    const result = await db.collection("stores").updateOne({ _id: new ObjectId(params.id) }, { $set: updatedStore })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Không tìm thấy cửa hàng" }, { status: 404 })
    }

    const store = await db.collection("stores").findOne({ _id: new ObjectId(params.id) })
    return NextResponse.json(store)
  } catch (error) {
    console.error("Lỗi khi cập nhật cửa hàng:", error)
    return NextResponse.json({ error: "Không thể cập nhật cửa hàng" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const result = await db.collection("stores").deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Không tìm thấy cửa hàng" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Xóa cửa hàng thành công" })
  } catch (error) {
    console.error("Lỗi khi xóa cửa hàng:", error)
    return NextResponse.json({ error: "Không thể xóa cửa hàng" }, { status: 500 })
  }
}
