import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { Product, Category, Store } from "@/types"

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

// Get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const { db } = await connectToDatabase()
    const products = await db
      .collection("products")
      .find({ isFeatured: true, isAvailable: true })
      .sort({ createdAt: -1 })
      .limit(8)
      .toArray()

    // Serialize MongoDB documents
    return products.map((product) => serializeDocument(product)) as Product[]
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}

// Get product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { db } = await connectToDatabase()
    const product = await db.collection("products").findOne({ slug })

    // Serialize MongoDB document
    return serializeDocument(product) as Product | null
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error)
    return null
  }
}

// Get related products
export async function getRelatedProducts(category: string, currentSlug: string): Promise<Product[]> {
  try {
    const { db } = await connectToDatabase()
    const products = await db
      .collection("products")
      .find({ category, slug: { $ne: currentSlug }, isAvailable: true })
      .limit(8)
      .toArray()

    // Serialize MongoDB documents
    return products.map((product) => serializeDocument(product)) as Product[]
  } catch (error) {
    console.error("Error fetching related products:", error)
    return []
  }
}

// Get all products
export async function getAllProducts(): Promise<Product[]> {
  try {
    const { db } = await connectToDatabase()
    const products = await db.collection("products").find({}).sort({ createdAt: -1 }).toArray()

    // Serialize MongoDB documents
    return products.map((product) => serializeDocument(product)) as Product[]
  } catch (error) {
    console.error("Error fetching all products:", error)
    return []
  }
}

// Get products by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const { db } = await connectToDatabase()
    const products = await db.collection("products").find({ category }).sort({ createdAt: -1 }).toArray()

    // Serialize MongoDB documents
    return products.map((product) => serializeDocument(product)) as Product[]
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error)
    return []
  }
}

// Get all categories
export async function getAllCategories(): Promise<Category[]> {
  try {
    const { db } = await connectToDatabase()
    const categories = await db.collection("categories").find({}).sort({ order: 1 }).toArray()

    // Serialize MongoDB documents
    return categories.map((category) => serializeDocument(category)) as Category[]
  } catch (error) {
    console.error("Error fetching all categories:", error)
    return []
  }
}

// Get all stores
export async function getAllStores(): Promise<Store[]> {
  try {
    const { db } = await connectToDatabase()
    const stores = await db.collection("stores").find({ isActive: true }).toArray()

    // Serialize MongoDB documents
    return stores.map((store) => serializeDocument(store)) as Store[]
  } catch (error) {
    console.error("Error fetching all stores:", error)
    return []
  }
}

// Get store by ID
export async function getStoreById(id: string): Promise<Store | null> {
  try {
    const { db } = await connectToDatabase()
    const store = await db.collection("stores").findOne({ _id: new ObjectId(id) })

    // Serialize MongoDB document
    return serializeDocument(store) as Store | null
  } catch (error) {
    console.error(`Error fetching store with ID ${id}:`, error)
    return null
  }
}
