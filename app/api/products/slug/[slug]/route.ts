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

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug
    const { db } = await connectToDatabase()

    const product = await db.collection("products").findOne({ slug })

    if (!product) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 })
    }

    return NextResponse.json(serializeDocument(product))
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm theo slug:", error)
    return NextResponse.json({ error: "Không thể lấy sản phẩm" }, { status: 500 })
  }
}
