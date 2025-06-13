import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type { Testimonial } from "@/types"

const testimonialsPath = path.join(process.cwd(), "data", "testimonials.json")

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    // Đọc file hiện tại
    const fileContent = fs.readFileSync(testimonialsPath, "utf8")
    const testimonials = JSON.parse(fileContent) as Testimonial[]

    // Lọc ra testimonial cần xóa
    const filteredTestimonials = testimonials.filter((item) => item.id !== id)

    if (filteredTestimonials.length === testimonials.length) {
      return NextResponse.json({ error: "Không tìm thấy testimonial" }, { status: 404 })
    }

    // Ghi file JSON
    fs.writeFileSync(testimonialsPath, JSON.stringify(filteredTestimonials, null, 2))

    return NextResponse.json({ success: true, message: "Xóa testimonial thành công" })
  } catch (error) {
    console.error("Lỗi khi xóa testimonial:", error)
    return NextResponse.json({ error: "Không thể xóa testimonial" }, { status: 500 })
  }
}
