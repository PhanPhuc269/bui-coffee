import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const { db } = await connectToDatabase()

    // Tìm cấu hình trong database
    const settings = await db.collection("settings").findOne({ _id: "site-config" })

    if (!settings) {
      // Nếu không tìm thấy, trả về cấu hình mặc định từ file
      const defaultConfig = {
        name: "Highlands Coffee",
        description:
          "Highlands Coffee là thương hiệu cà phê Việt Nam với hơn 20 năm kinh nghiệm, mang đến những trải nghiệm cà phê đậm đà hương vị Việt.",
        logo: "/logo.png",
        contact: {
          hotline: "1900 1755",
          email: "customerservice@highlandscoffee.com.vn",
          address: "Tầng 20, Tòa nhà Viettel, 285 Cách Mạng Tháng 8, Phường 12, Quận 10, Thành phố Hồ Chí Minh",
        },
        socialMedia: {
          facebook: "https://www.facebook.com/highlandscoffeevietnam",
          instagram: "https://www.instagram.com/highlandscoffeevietnam",
          youtube: "https://www.youtube.com/channel/UCq6WR0-w7c4ByOkV2Z9-HgQ",
        },
        businessHours: {
          weekdays: "07:00 - 22:00",
          weekend: "07:00 - 23:00",
        },
      }

      // Lưu cấu hình mặc định vào database
      await db.collection("settings").insertOne({
        _id: "site-config",
        ...defaultConfig,
      })

      return NextResponse.json(defaultConfig)
    }

    // Loại bỏ _id từ kết quả trả về
    const { _id, ...siteConfig } = settings

    return NextResponse.json(siteConfig)
  } catch (error) {
    console.error("Lỗi khi đọc cấu hình:", error)
    return NextResponse.json({ error: "Không thể đọc cấu hình" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const newConfig = await request.json()

    // Kiểm tra dữ liệu
    if (!newConfig.name || !newConfig.description) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Cập nhật hoặc tạo mới cấu hình
    const result = await db
      .collection("settings")
      .updateOne({ _id: "site-config" }, { $set: newConfig }, { upsert: true })

    if (result.acknowledged) {
      return NextResponse.json({
        success: true,
        message: "Cập nhật cấu hình thành công",
        modifiedCount: result.modifiedCount,
      })
    } else {
      throw new Error("Không thể cập nhật cấu hình")
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật cấu hình:", error)
    return NextResponse.json(
      {
        error: "Không thể cập nhật cấu hình",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
