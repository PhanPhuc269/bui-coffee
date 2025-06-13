import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type { Feature } from "@/types"

const featuresPath = path.join(process.cwd(), "data", "features.json")

export async function DELETE(request: Request, { params }: { params: { title: string } }) {
  try {
    const title = decodeURIComponent(params.title)

    // Đọc file hiện tại
    const fileContent = fs.readFileSync(featuresPath, "utf8")
    const features = JSON.parse(fileContent) as Feature[]

    // Lọc ra feature cần xóa
    const filteredFeatures = features.filter((item) => item.title !== title)

    if (filteredFeatures.length === features.length) {
      return NextResponse.json({ error: "Không tìm thấy feature" }, { status: 404 })
    }

    // Ghi file JSON
    fs.writeFileSync(featuresPath, JSON.stringify(filteredFeatures, null, 2))

    return NextResponse.json({ success: true, message: "Xóa feature thành công" })
  } catch (error) {
    console.error("Lỗi khi xóa feature:", error)
    return NextResponse.json({ error: "Không thể xóa feature" }, { status: 500 })
  }
}
