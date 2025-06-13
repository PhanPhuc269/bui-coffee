import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { Product, Category, Store, Order, Testimonial, Feature, SiteConfig } from "@/types"
import { cache } from "react"
import { serializeDocument } from "@/lib/serialize"

// Products
export const getProducts = cache(
  async (options: { category?: string; featured?: boolean } = {}): Promise<Product[]> => {
    try {
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
    } catch (error) {
      console.error("Error fetching products:", error)
      return []
    }
  },
)

export const getProductById = cache(async (id: string): Promise<Product | null> => {
  try {
    const { db } = await connectToDatabase()

    let product

    // Check if the ID is a valid ObjectId
    if (ObjectId.isValid(id)) {
      product = await db.collection("products").findOne({ _id: new ObjectId(id) })
    } else {
      return null
    }

    return product ? (serializeDocument(product) as Product) : null
  } catch (error) {
    console.error("Error fetching product by ID:", error)
    return null
  }
})

export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  try {
    const { db } = await connectToDatabase()
    const product = await db.collection("products").findOne({ slug })
    return product ? (serializeDocument(product) as Product) : null
  } catch (error) {
    console.error("Error fetching product by slug:", error)
    return null
  }
})

export const getProductsByCategory = cache(async (categorySlug: string): Promise<Product[]> => {
  try {
    const { db } = await connectToDatabase()
    const products = await db.collection("products").find({ category: categorySlug }).sort({ createdAt: -1 }).toArray()
    return products.map((product) => serializeDocument(product)) as Product[]
  } catch (error) {
    console.error("Error fetching products by category:", error)
    return []
  }
})

export const getFeaturedProducts = cache(async (): Promise<Product[]> => {
  try {
    const { db } = await connectToDatabase()
    const products = await db.collection("products").find({ isFeatured: true }).limit(4).toArray()
    return products.map((product) => serializeDocument(product)) as Product[]
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
})

export const getRelatedProducts = cache(async (category: string, currentSlug: string): Promise<Product[]> => {
  try {
    const { db } = await connectToDatabase()
    const products = await db
      .collection("products")
      .find({ category, slug: { $ne: currentSlug } })
      .limit(4)
      .toArray()
    return products.map((product) => serializeDocument(product)) as Product[]
  } catch (error) {
    console.error("Error fetching related products:", error)
    return []
  }
})

// Categories
export const getCategories = cache(async (): Promise<Category[]> => {
  try {
    const { db } = await connectToDatabase()
    const categories = await db.collection("categories").find({}).sort({ order: 1 }).toArray()
    return categories.map((category) => serializeDocument(category)) as Category[]
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
})

export const getCategoryBySlug = cache(async (slug: string): Promise<Category | null> => {
  try {
    const { db } = await connectToDatabase()
    const category = await db.collection("categories").findOne({ slug })
    return category ? (serializeDocument(category) as Category) : null
  } catch (error) {
    console.error("Error fetching category by slug:", error)
    return null
  }
})

// Stores
export const getStores = cache(async (city?: string): Promise<Store[]> => {
  try {
    const { db } = await connectToDatabase()
    const query = city ? { city, isActive: true } : { isActive: true }
    const stores = await db.collection("stores").find(query).sort({ name: 1 }).toArray()
    return stores.map((store) => serializeDocument(store)) as Store[]
  } catch (error) {
    console.error("Error fetching stores:", error)
    return []
  }
})

export const getFeaturedStores = cache(async (): Promise<Store[]> => {
  try {
    const { db } = await connectToDatabase()
    const stores = await db.collection("stores").find({ isActive: true }).limit(3).toArray()
    return stores.map((store) => serializeDocument(store)) as Store[]
  } catch (error) {
    console.error("Error fetching featured stores:", error)
    return []
  }
})

export const getStoreById = cache(async (id: string): Promise<Store | null> => {
  try {
    const { db } = await connectToDatabase()

    let store

    // Check if the ID is a valid ObjectId
    if (ObjectId.isValid(id)) {
      store = await db.collection("stores").findOne({ _id: new ObjectId(id) })
    } else {
      return null
    }

    return store ? (serializeDocument(store) as Store) : null
  } catch (error) {
    console.error("Error fetching store by ID:", error)
    return null
  }
})

// Orders
export const getOrders = cache(async (): Promise<Order[]> => {
  try {
    const { db } = await connectToDatabase()
    const orders = await db.collection("orders").find({}).sort({ createdAt: -1 }).toArray()
    return orders.map((order) => serializeDocument(order)) as Order[]
  } catch (error) {
    console.error("Error fetching orders:", error)
    return []
  }
})

export const getOrderById = cache(async (id: string): Promise<Order | null> => {
  try {
    const { db } = await connectToDatabase()

    let order

    // Check if the ID is a valid ObjectId
    if (ObjectId.isValid(id)) {
      order = await db.collection("orders").findOne({ _id: new ObjectId(id) })
    } else {
      return null
    }

    return order ? (serializeDocument(order) as Order) : null
  } catch (error) {
    console.error("Error fetching order by ID:", error)
    return null
  }
})

export const getOrderByNumber = cache(async (orderNumber: string): Promise<Order | null> => {
  try {
    const { db } = await connectToDatabase()
    const order = await db.collection("orders").findOne({ orderNumber })
    return order ? (serializeDocument(order) as Order) : null
  } catch (error) {
    console.error("Error fetching order by number:", error)
    return null
  }
})

// Testimonials
export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  try {
    const { db } = await connectToDatabase()
    const testimonials = await db.collection("testimonials").find({}).toArray()
    return testimonials.map((testimonial) => serializeDocument(testimonial)) as Testimonial[]
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return []
  }
})

// Features
export const getFeatures = cache(async (): Promise<Feature[]> => {
  try {
    const { db } = await connectToDatabase()
    const features = await db.collection("features").find({}).toArray()
    return features.map((feature) => serializeDocument(feature)) as Feature[]
  } catch (error) {
    console.error("Error fetching features:", error)
    return []
  }
})

// Site Config
export const getSiteConfig = cache(async (): Promise<SiteConfig | null> => {
  try {
    const { db } = await connectToDatabase()
    const settings = await db.collection("settings").findOne({ _id: "site-config" })

    if (!settings) {
      return null
    }

    // Loại bỏ _id từ kết quả trả về
    const { _id, ...siteConfig } = serializeDocument(settings)

    return siteConfig as SiteConfig
  } catch (error) {
    console.error("Error fetching site config:", error)
    return null
  }
})
