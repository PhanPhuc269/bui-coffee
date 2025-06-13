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
          orderNumber: "HL240101001",
          customerInfo: {
            name: "Nguyễn Văn A",
            phone: "0901234567",
            email: "customer@email.com",
          },
          items: [
            {
              productId: "1",
              name: "Cà Phê Phin Đen",
              size: "Vừa",
              quantity: 2,
              price: 30000,
              total: 60000,
            },
          ],
          subtotal: 60000,
          tax: 6000,
          total: 66000,
          status: "pending",
          orderType: "takeaway",
          storeId: "1",
          notes: "Ít đường",
          createdAt: "2024-01-01T10:30:00Z",
          updatedAt: "2024-01-01T10:30:00Z",
        },
        {
          _id: "2",
          orderNumber: "HL240101002",
          customerInfo: {
            name: "Trần Thị B",
            phone: "0901234568",
            email: "customer2@email.com",
          },
          items: [
            {
              productId: "2",
              name: "Cà Phê Sữa Đá",
              size: "Lớn",
              quantity: 1,
              price: 39000,
              total: 39000,
            },
            {
              productId: "4",
              name: "Bánh Mì Thịt Nướng",
              size: "Thường",
              quantity: 1,
              price: 35000,
              total: 35000,
            },
          ],
          subtotal: 74000,
          tax: 7400,
          total: 81400,
          status: "completed",
          orderType: "dine-in",
          storeId: "1",
          notes: "",
          createdAt: "2024-01-01T11:15:00Z",
          updatedAt: "2024-01-01T11:45:00Z",
        },
      ])
    }

    const { db } = dbConnection
    const orders = await db.collection("orders").find({}).sort({ createdAt: -1 }).toArray()
    return NextResponse.json(orders)
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng:", error)
    return NextResponse.json({ error: "Không thể lấy dữ liệu đơn hàng" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const order = await request.json()
    const dbConnection = await connectToDatabase()

    if (!dbConnection) {
      return NextResponse.json({ error: "Không thể kết nối đến cơ sở dữ liệu" }, { status: 500 })
    }

    const { db } = dbConnection

    // Tạo mã đơn hàng
    const date = new Date()
    const year = date.getFullYear().toString().slice(-2)
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")

    // Lấy số đơn hàng tiếp theo
    const lastOrder = await db.collection("orders").find({}).sort({ createdAt: -1 }).limit(1).toArray()

    let orderNumber = 1
    if (lastOrder.length > 0 && lastOrder[0].orderNumber) {
      const lastOrderNumber = lastOrder[0].orderNumber
      const lastNumber = Number.parseInt(lastOrderNumber.slice(-3))
      orderNumber = lastNumber + 1
    }

    const orderNumberString = `HL${year}${month}${day}${orderNumber.toString().padStart(3, "0")}`

    const result = await db.collection("orders").insertOne({
      ...order,
      orderNumber: orderNumberString,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ id: result.insertedId, orderNumber: orderNumberString })
  } catch (error) {
    console.error("Lỗi khi thêm đơn hàng:", error)
    return NextResponse.json({ error: "Không thể thêm đơn hàng" }, { status: 500 })
  }
}
