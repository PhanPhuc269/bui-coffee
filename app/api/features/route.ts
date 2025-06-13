import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type { Feature } from "@/types"

const featuresPath = path.join(process.cwd(), "data", "features.json")

export async function GET() {
  try {
    // Đọc file JSON
    const fileContent = fs.readFileSync(featuresPath, "utf8")
    const features = JSON.parse(fileContent) as Feature[]

    return NextResponse.json(features)
  } catch (error) {
    console.error("Lỗi khi đọc file features:", error)
    return NextResponse.json({ error: "Không thể đọc file features" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const newFeature = await request.json()

    // Đọc file hiện tại
    const fileContent = fs.readFileSync(featuresPath, "utf8")
    const features = JSON.parse(fileContent) as Feature[]

    // Kiểm tra xem feature đã tồn tại chưa
    if (features.some((item) => item.title === newFeature.title)) {
      return NextResponse.json({ error: "Tính năng đã tồn tại" }, { status: 400 })
    }

    // Thêm feature mới
    features.push(newFeature)

    // Ghi file JSON
    fs.writeFileSync(featuresPath, JSON.stringify(features, null, 2))

    return NextResponse.json(newFeature)
  } catch (error) {
    console.error("Lỗi khi thêm feature:", error)
    return NextResponse.json({ error: "Không thể thêm feature" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const updatedFeature = await request.json()

    // Đọc file hiện tại
    const fileContent = fs.readFileSync(featuresPath, "utf8")
    const features = JSON.parse(fileContent) as Feature[]

    // Tìm và cập nhật feature
    const index = features.findIndex((item) => item.title === updatedFeature.title)
    if (index === -1) {
      return NextResponse.json({ error: "Không tìm thấy feature" }, { status: 404 })
    }

    features[index] = updatedFeature

    // Ghi file JSON
    fs.writeFileSync(featuresPath, JSON.stringify(features, null, 2))

    return NextResponse.json(updatedFeature)
  } catch (error) {
    console.error("Lỗi khi cập nhật feature:", error)
    return NextResponse.json({ error: "Không thể cập nhật feature" }, { status: 500 })
  }
}
