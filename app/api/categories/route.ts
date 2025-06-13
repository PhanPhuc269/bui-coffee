import { connectToDatabase } from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const dbConnection = await connectToDatabase()

    // Nếu không kết nối được đến MongoDB
    if (!dbConnection) {
      // Trả về dữ liệu mẫu
      return NextResponse.json([
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
    }

    const { db } = dbConnection
    const categories = await db.collection("categories").find({}).sort({ order: 1 }).toArray()
    return NextResponse.json(categories)
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error)
    return NextResponse.json({ error: "Không thể lấy dữ liệu danh mục" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const category = await request.json()
    const dbConnection = await connectToDatabase()

    if (!dbConnection) {
      return NextResponse.json({ error: "Không thể kết nối đến cơ sở dữ liệu" }, { status: 500 })
    }

    const { db } = dbConnection
    const result = await db.collection("categories").insertOne(category)

    return NextResponse.json({ id: result.insertedId })
  } catch (error) {
    console.error("Lỗi khi thêm danh mục:", error)
    return NextResponse.json({ error: "Không thể thêm danh mục" }, { status: 500 })
  }
}
