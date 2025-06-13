import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { Product, Category, Store, Order, Testimonial, Feature, SiteConfig } from "@/types"

// Helper function to serialize MongoDB documents
export function serializeDocument(doc: any) {
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

// Products
export async function getProducts(options: { category?: string; featured?: boolean } = {}): Promise<Product[]> {
  const { db } = await connectToDatabase()
  const query: any = {}

  if (options.category) {
    query.category = options.category
  }

  if (options.featured) {
    query.isFeatured = true
  }

  const products = await db.collection("products").find(query).sort({ createdAt: -1 }).toArray()
  return products.map((product) => serializeDocument(product)) as Product[]
}

export async function getProductById(id: string): Promise<Product | null> {
  const { db } = await connectToDatabase()

  let product

  // Check if the ID is a valid ObjectId
  if (ObjectId.isValid(id)) {
    product = await db.collection("products").findOne({ _id: new ObjectId(id) })
  } else {
    return null
  }

  return product ? (serializeDocument(product) as Product) : null
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { db } = await connectToDatabase()
  const product = await db.collection("products").findOne({ slug })
  return product ? (serializeDocument(product) as Product) : null
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const { db } = await connectToDatabase()
  const products = await db.collection("products").find({ category: categorySlug }).sort({ createdAt: -1 }).toArray()
  return products.map((product) => serializeDocument(product)) as Product[]
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { db } = await connectToDatabase()
  const products = await db.collection("products").find({ isFeatured: true }).sort({ createdAt: -1 }).toArray()
  return products.map((product) => serializeDocument(product)) as Product[]
}

// Categories
export async function getCategories(): Promise<Category[]> {
  const { db } = await connectToDatabase()
  const categories = await db.collection("categories").find({}).sort({ order: 1 }).toArray()
  return categories.map((category) => serializeDocument(category)) as Category[]
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { db } = await connectToDatabase()
  const category = await db.collection("categories").findOne({ slug })
  return category ? (serializeDocument(category) as Category) : null
}

// Stores
export async function getStores(): Promise<Store[]> {
  const { db } = await connectToDatabase()
  const stores = await db.collection("stores").find({}).sort({ name: 1 }).toArray()
  return stores.map((store) => serializeDocument(store)) as Store[]
}

export async function getStoreById(id: string): Promise<Store | null> {
  const { db } = await connectToDatabase()

  let store

  // Check if the ID is a valid ObjectId
  if (ObjectId.isValid(id)) {
    store = await db.collection("stores").findOne({ _id: new ObjectId(id) })
  } else {
    return null
  }

  return store ? (serializeDocument(store) as Store) : null
}

// Orders
export async function getOrders(): Promise<Order[]> {
  const { db } = await connectToDatabase()
  const orders = await db.collection("orders").find({}).sort({ createdAt: -1 }).toArray()
  return orders.map((order) => serializeDocument(order)) as Order[]
}

export async function getOrderById(id: string): Promise<Order | null> {
  const { db } = await connectToDatabase()

  let order

  // Check if the ID is a valid ObjectId
  if (ObjectId.isValid(id)) {
    order = await db.collection("orders").findOne({ _id: new ObjectId(id) })
  } else {
    return null
  }

  return order ? (serializeDocument(order) as Order) : null
}

export async function getOrderByNumber(orderNumber: string): Promise<Order | null> {
  const { db } = await connectToDatabase()
  const order = await db.collection("orders").findOne({ orderNumber })
  return order ? (serializeDocument(order) as Order) : null
}

// Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  const { db } = await connectToDatabase()
  const testimonials = await db.collection("testimonials").find({}).toArray()
  return testimonials.map((testimonial) => serializeDocument(testimonial)) as Testimonial[]
}

// Features
export async function getFeatures(): Promise<Feature[]> {
  const { db } = await connectToDatabase()
  const features = await db.collection("features").find({}).toArray()
  return features.map((feature) => serializeDocument(feature)) as Feature[]
}

// Site Config
export async function getSiteConfig(): Promise<SiteConfig | null> {
  const { db } = await connectToDatabase()
  const config = await db.collection("settings").findOne({ type: "siteConfig" })
  return config ? (serializeDocument(config).data as SiteConfig) : null
}
