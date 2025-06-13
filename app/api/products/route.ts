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
          name: "Cà Phê Phin Đen",
          slug: "ca-phe-phin-den",
          description: "Cà phê phin truyền thống với hương vị đậm đà, thơm ngon",
          longDescription:
            "Được pha chế từ những hạt cà phê Robusta chất lượng cao, rang vừa tới để giữ nguyên hương vị đặc trưng của cà phê Việt Nam. Thưởng thức cà phê phin đen sẽ mang đến cho bạn trải nghiệm tuyệt vời về văn hóa cà phê truyền thống.",
          category: "coffee",
          price: 25000,
          sizes: [
            { name: "Nhỏ", price: 25000 },
            { name: "Vừa", price: 30000 },
            { name: "Lớn", price: 35000 },
          ],
          image: "/placeholder.svg?height=300&width=300",
          images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
          isAvailable: true,
          isFeatured: true,
          nutritionalInfo: {
            calories: 5,
            caffeine: "95mg",
            sugar: "0g",
          },
          tags: ["hot", "traditional", "strong"],
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-01T00:00:00Z",
        },
        {
          _id: "2",
          name: "Cà Phê Sữa Đá",
          slug: "ca-phe-sua-da",
          description: "Cà phê sữa đá thơm béo, đậm đà hương vị Việt Nam",
          longDescription:
            "Cà phê sữa đá là sự kết hợp hoàn hảo giữa cà phê đậm đà và sữa đặc ngọt ngào, được phục vụ cùng đá viên mát lạnh. Đây là thức uống truyền thống và phổ biến nhất của người Việt Nam.",
          category: "coffee",
          price: 29000,
          sizes: [
            { name: "Nhỏ", price: 29000 },
            { name: "Vừa", price: 35000 },
            { name: "Lớn", price: 39000 },
          ],
          image: "/placeholder.svg?height=300&width=300",
          images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
          isAvailable: true,
          isFeatured: true,
          nutritionalInfo: {
            calories: 120,
            caffeine: "95mg",
            sugar: "15g",
          },
          tags: ["cold", "traditional", "popular"],
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-01T00:00:00Z",
        },
      ])
    }

    const { db } = dbConnection
    const products = await db.collection("products").find({}).toArray()
    return NextResponse.json(products)
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error)
    return NextResponse.json({ error: "Không thể lấy dữ liệu sản phẩm" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const product = await request.json()
    const dbConnection = await connectToDatabase()

    if (!dbConnection) {
      return NextResponse.json({ error: "Không thể kết nối đến cơ sở dữ liệu" }, { status: 500 })
    }

    const { db } = dbConnection
    const result = await db.collection("products").insertOne({
      ...product,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ id: result.insertedId })
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error)
    return NextResponse.json({ error: "Không thể thêm sản phẩm" }, { status: 500 })
  }
}
