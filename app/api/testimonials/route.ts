import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type { Testimonial } from "@/types"

const testimonialsPath = path.join(process.cwd(), "data", "testimonials.json")

export async function GET() {
  try {
    // Đọc file JSON
    const fileContent = fs.readFileSync(testimonialsPath, "utf8")
    const testimonials = JSON.parse(fileContent) as Testimonial[]

    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("Lỗi khi đọc file testimonials:", error)
    return NextResponse.json({ error: "Không thể đọc file testimonials" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const newTestimonial = await request.json()

    // Đọc file hiện tại
    const fileContent = fs.readFileSync(testimonialsPath, "utf8")
    const testimonials = JSON.parse(fileContent) as Testimonial[]

    // Tạo ID mới
    const maxId = testimonials.reduce((max, item) => Math.max(max, item.id), 0)
    const testimonialWithId = { ...newTestimonial, id: maxId + 1 }

    // Thêm testimonial mới
    testimonials.push(testimonialWithId)

    // Ghi file JSON
    fs.writeFileSync(testimonialsPath, JSON.stringify(testimonials, null, 2))

    return NextResponse.json(testimonialWithId)
  } catch (error) {
    console.error("Lỗi khi thêm testimonial:", error)
    return NextResponse.json({ error: "Không thể thêm testimonial" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const updatedTestimonial = await request.json()

    // Đọc file hiện tại
    const fileContent = fs.readFileSync(testimonialsPath, "utf8")
    const testimonials = JSON.parse(fileContent) as Testimonial[]

    // Tìm và cập nhật testimonial
    const index = testimonials.findIndex((item) => item.id === updatedTestimonial.id)
    if (index === -1) {
      return NextResponse.json({ error: "Không tìm thấy testimonial" }, { status: 404 })
    }

    testimonials[index] = updatedTestimonial

    // Ghi file JSON
    fs.writeFileSync(testimonialsPath, JSON.stringify(testimonials, null, 2))

    return NextResponse.json(updatedTestimonial)
  } catch (error) {
    console.error("Lỗi khi cập nhật testimonial:", error)
    return NextResponse.json({ error: "Không thể cập nhật testimonial" }, { status: 500 })
  }
}
