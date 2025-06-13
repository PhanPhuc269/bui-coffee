import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

// Helper function to serialize MongoDB documents
function serializeDocument(doc: any) {
  if (!doc) return null

  // Convert _id from ObjectId to string
  if (doc._id) {
    doc._id = doc._id.toString()
  }

  // Handle nested documents in arrays
  Object.keys(doc).forEach((key) => {
    if (Array.isArray(doc[key])) {
      doc[key] = doc[key].map((item: any) => {
        if (item && typeof item === "object" && item._id) {
          return serializeDocument(item)
        }
        return item
      })
    } else if (doc[key] && typeof doc[key] === "object" && doc[key]._id) {
      doc[key] = serializeDocument(doc[key])
    }
  })

  return doc
}

export async function GET(request: Request) {
  try {
    const { db } = await connectToDatabase()
    const categories = await db.collection("categories").find({}).sort({ order: 1 }).toArray()

    // Serialize MongoDB documents
    const serializedCategories = categories.map((category) => serializeDocument(category))

    return NextResponse.json(serializedCategories)
  } catch (error) {
    console.error("Lỗi khi lấy danh sách danh mục:", error)
    return NextResponse.json({ error: "Không thể lấy danh sách danh mục" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase()
    const newCategory = await request.json()

    // Kiểm tra slug đã tồn tại chưa
    if (newCategory.slug) {
      const existingCategory = await db.collection("categories").findOne({ slug: newCategory.slug })
      if (existingCategory) {
        return NextResponse.json({ error: "Slug đã tồn tại" }, { status: 400 })
      }
    }

    // Tìm order cao nhất để thêm vào cuối
    const lastCategory = await db.collection("categories").find({}).sort({ order: -1 }).limit(1).toArray()
    const highestOrder = lastCategory.length > 0 ? lastCategory[0].order : 0
    newCategory.order = highestOrder + 1

    const result = await db.collection("categories").insertOne(newCategory)
    const insertedCategory = await db.collection("categories").findOne({ _id: result.insertedId })

    return NextResponse.json(serializeDocument(insertedCategory))
  } catch (error) {
    console.error("Lỗi khi tạo danh mục mới:", error)
    return NextResponse.json({ error: "Không thể tạo danh mục mới" }, { status: 500 })
  }
}
