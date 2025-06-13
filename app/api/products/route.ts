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
    const products = await db.collection("products").find({}).sort({ createdAt: -1 }).toArray()

    // Serialize MongoDB documents
    const serializedProducts = products.map((product) => serializeDocument(product))

    return NextResponse.json(serializedProducts)
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error)
    return NextResponse.json({ error: "Không thể lấy danh sách sản phẩm" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase()
    const newProduct = await request.json()

    // Kiểm tra slug đã tồn tại chưa
    if (newProduct.slug) {
      const existingProduct = await db.collection("products").findOne({ slug: newProduct.slug })
      if (existingProduct) {
        return NextResponse.json({ error: "Slug đã tồn tại" }, { status: 400 })
      }
    }

    // Thêm thời gian tạo và cập nhật
    const now = new Date().toISOString()
    newProduct.createdAt = now
    newProduct.updatedAt = now

    const result = await db.collection("products").insertOne(newProduct)
    const insertedProduct = await db.collection("products").findOne({ _id: result.insertedId })

    return NextResponse.json(serializeDocument(insertedProduct))
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm mới:", error)
    return NextResponse.json({ error: "Không thể tạo sản phẩm mới" }, { status: 500 })
  }
}
