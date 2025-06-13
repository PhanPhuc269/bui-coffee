import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const order = await db.collection("orders").findOne({ _id: new ObjectId(params.id) })

    if (!order) {
      return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng:", error)
    return NextResponse.json({ error: "Không thể lấy đơn hàng" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const updatedOrder = await request.json()

    // Cập nhật thời gian
    updatedOrder.updatedAt = new Date().toISOString()

    const result = await db.collection("orders").updateOne({ _id: new ObjectId(params.id) }, { $set: updatedOrder })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 })
    }

    const order = await db.collection("orders").findOne({ _id: new ObjectId(params.id) })
    return NextResponse.json(order)
  } catch (error) {
    console.error("Lỗi khi cập nhật đơn hàng:", error)
    return NextResponse.json({ error: "Không thể cập nhật đơn hàng" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const { status } = await request.json()

    const result = await db
      .collection("orders")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: { status, updatedAt: new Date().toISOString() } })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Cập nhật trạng thái thành công" })
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error)
    return NextResponse.json({ error: "Không thể cập nhật trạng thái đơn hàng" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const result = await db.collection("orders").deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Xóa đơn hàng thành công" })
  } catch (error) {
    console.error("Lỗi khi xóa đơn hàng:", error)
    return NextResponse.json({ error: "Không thể xóa đơn hàng" }, { status: 500 })
  }
}
