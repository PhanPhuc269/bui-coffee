import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type { SiteConfig } from "@/types"

const siteConfigPath = path.join(process.cwd(), "config", "site.json")

export async function GET() {
  try {
    // Đọc file JSON
    const fileContent = fs.readFileSync(siteConfigPath, "utf8")
    const siteConfig = JSON.parse(fileContent) as SiteConfig

    return NextResponse.json(siteConfig)
  } catch (error) {
    console.error("Lỗi khi đọc file cấu hình:", error)
    return NextResponse.json({ error: "Không thể đọc file cấu hình" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const newConfig = await request.json()

    // Kiểm tra dữ liệu
    if (!newConfig.name || !newConfig.description) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 })
    }

    // Ghi file JSON
    fs.writeFileSync(siteConfigPath, JSON.stringify(newConfig, null, 2))

    return NextResponse.json({ success: true, message: "Cập nhật cấu hình thành công" })
  } catch (error) {
    console.error("Lỗi khi cập nhật file cấu hình:", error)
    return NextResponse.json({ error: "Không thể cập nhật file cấu hình" }, { status: 500 })
  }
}
