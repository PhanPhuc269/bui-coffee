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
          name: "Bụi Coffee Nguyễn Huệ",
          address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
          city: "Ho Chi Minh",
          district: "Quận 1",
          phone: "028-1234-5678",
          email: "nguyen.hue@highlands.com.vn",
          coordinates: {
            lat: 10.7769,
            lng: 106.7009,
          },
          hours: {
            monday: "06:00-22:00",
            tuesday: "06:00-22:00",
            wednesday: "06:00-22:00",
            thursday: "06:00-22:00",
            friday: "06:00-23:00",
            saturday: "06:00-23:00",
            sunday: "07:00-22:00",
          },
          facilities: ["wifi", "parking", "delivery", "takeaway"],
          image: "/placeholder.svg?height=200&width=400",
          isActive: true,
        },
        {
          _id: "2",
          name: "Bụi Coffee Lê Lợi",
          address: "45 Đường Lê Lợi, Quận 1, TP.HCM",
          city: "Ho Chi Minh",
          district: "Quận 1",
          phone: "028-1234-5679",
          email: "le.loi@highlands.com.vn",
          coordinates: {
            lat: 10.7731,
            lng: 106.7012,
          },
          hours: {
            monday: "06:00-22:00",
            tuesday: "06:00-22:00",
            wednesday: "06:00-22:00",
            thursday: "06:00-22:00",
            friday: "06:00-23:00",
            saturday: "06:00-23:00",
            sunday: "07:00-22:00",
          },
          facilities: ["wifi", "parking", "delivery", "takeaway"],
          image: "/placeholder.svg?height=200&width=400",
          isActive: true,
        },
        {
          _id: "3",
          name: "Bụi Coffee Hoàn Kiếm",
          address: "78 Đinh Tiên Hoàng, Quận Hoàn Kiếm, Hà Nội",
          city: "Ha Noi",
          district: "Quận Hoàn Kiếm",
          phone: "024-1234-5678",
          email: "hoan.kiem@highlands.com.vn",
          coordinates: {
            lat: 21.0285,
            lng: 105.8542,
          },
          hours: {
            monday: "06:00-22:00",
            tuesday: "06:00-22:00",
            wednesday: "06:00-22:00",
            thursday: "06:00-22:00",
            friday: "06:00-23:00",
            saturday: "06:00-23:00",
            sunday: "07:00-22:00",
          },
          facilities: ["wifi", "parking", "delivery", "takeaway"],
          image: "/placeholder.svg?height=200&width=400",
          isActive: true,
        },
      ])
    }

    const { db } = dbConnection
    const stores = await db.collection("stores").find({}).toArray()
    return NextResponse.json(stores)
  } catch (error) {
    console.error("Lỗi khi lấy cửa hàng:", error)
    return NextResponse.json({ error: "Không thể lấy dữ liệu cửa hàng" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const store = await request.json()
    const dbConnection = await connectToDatabase()

    if (!dbConnection) {
      return NextResponse.json({ error: "Không thể kết nối đến cơ sở dữ liệu" }, { status: 500 })
    }

    const { db } = dbConnection
    const result = await db.collection("stores").insertOne(store)

    return NextResponse.json({ id: result.insertedId })
  } catch (error) {
    console.error("Lỗi khi thêm cửa hàng:", error)
    return NextResponse.json({ error: "Không thể thêm cửa hàng" }, { status: 500 })
  }
}
