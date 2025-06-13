import { connectToDatabase } from "@/lib/mongodb"
import type { Product, Category, Store, Order } from "@/types"
import { cache } from "react"
import testimonials from "@/data/testimonials.json"
import features from "@/data/features.json"

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

// Hàm lấy dữ liệu sản phẩm từ MongoDB
export const getProducts = cache(async (category?: string) => {
  try {
    // Kết nối đến MongoDB
    const { db } = await connectToDatabase()

    // Tạo query dựa trên category (nếu có)
    const query = category ? { category } : {}

    // Lấy dữ liệu từ collection "products"
    const products = await db.collection("products").find(query).sort({ createdAt: -1 }).toArray()

    return products.map((product) => serializeDocument(product)) as Product[]
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu sản phẩm:", error)

    // Trả về dữ liệu mẫu khi có lỗi
    return [
      {
        _id: "1",
        name: "Cà Phê Phin Đen",
        slug: "ca-phe-phin-den",
        description: "Cà phê phin truyền thống với hương vị đậm đà, thơm ngon",
        longDescription:
          "Được pha chế từ những hạt cà phê Robusta chất lượng cao, rang vừa tới để giữ nguyên hương vị đặc trưng của cà phê Việt Nam. Thưởng thức cà phê phin đen sẽ mang đến cho bạn trải nghiệm tuyệt vời về văn hóa cà phê truyền thống.",
        category: "coffee",
        price: 25000,
        sizes: [
          { name: "Nhỏ", price: 25000 },
          { name: "Vừa", price: 30000 },
          { name: "Lớn", price: 35000 },
        ],
        image: "/placeholder.svg?height=300&width=300",
        images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
        isAvailable: true,
        isFeatured: true,
        nutritionalInfo: {
          calories: 5,
          caffeine: "95mg",
          sugar: "0g",
        },
        tags: ["hot", "traditional", "strong"],
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
      {
        _id: "2",
        name: "Cà Phê Sữa Đá",
        slug: "ca-phe-sua-da",
        description: "Cà phê sữa đá thơm béo, đậm đà hương vị Việt Nam",
        longDescription:
          "Cà phê sữa đá là sự kết hợp hoàn hảo giữa cà phê đậm đà và sữa đặc ngọt ngào, được phục vụ cùng đá viên mát lạnh. Đây là thức uống truyền thống và phổ biến nhất của người Việt Nam.",
        category: "coffee",
        price: 29000,
        sizes: [
          { name: "Nhỏ", price: 29000 },
          { name: "Vừa", price: 35000 },
          { name: "Lớn", price: 39000 },
        ],
        image: "/placeholder.svg?height=300&width=300",
        images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
        isAvailable: true,
        isFeatured: true,
        nutritionalInfo: {
          calories: 120,
          caffeine: "95mg",
          sugar: "15g",
        },
        tags: ["cold", "traditional", "popular"],
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
      {
        _id: "3",
        name: "Trà Sen Vàng",
        slug: "tra-sen-vang",
        description: "Trà ướp hương sen thanh mát, tinh tế",
        longDescription:
          "Trà sen vàng là sự kết hợp giữa trà xanh Việt Nam và hương sen thơm ngát. Thức uống này mang đến cảm giác thanh mát, nhẹ nhàng và tinh tế, phù hợp cho những ngày nóng bức.",
        category: "tea",
        price: 39000,
        sizes: [
          { name: "Nhỏ", price: 39000 },
          { name: "Vừa", price: 45000 },
          { name: "Lớn", price: 49000 },
        ],
        image: "/placeholder.svg?height=300&width=300",
        images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
        isAvailable: true,
        isFeatured: true,
        nutritionalInfo: {
          calories: 70,
          caffeine: "30mg",
          sugar: "10g",
        },
        tags: ["cold", "tea", "refreshing"],
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
      {
        _id: "4",
        name: "Bánh Mì Thịt Nướng",
        slug: "banh-mi-thit-nuong",
        description: "Bánh mì giòn với nhân thịt nướng thơm ngon",
        longDescription:
          "Bánh mì thịt nướng là món ăn đường phố nổi tiếng của Việt Nam. Bánh mì giòn bên ngoài, mềm bên trong kết hợp với thịt nướng thơm ngon, rau sống và sốt đặc biệt tạo nên hương vị đặc trưng khó quên.",
        category: "food",
        price: 35000,
        sizes: [{ name: "Thường", price: 35000 }],
        image: "/placeholder.svg?height=300&width=300",
        images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
        isAvailable: true,
        isFeatured: false,
        nutritionalInfo: {
          calories: 350,
          caffeine: "0mg",
          sugar: "5g",
        },
        tags: ["food", "breakfast", "lunch"],
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
    ]
  }
})

// Hàm lấy sản phẩm nổi bật
export const getFeaturedProducts = cache(async () => {
  try {
    // Kết nối đến MongoDB
    const { db } = await connectToDatabase()

    // Lấy dữ liệu từ collection "products" với điều kiện isFeatured = true
    const products = await db.collection("products").find({ isFeatured: true }).limit(4).toArray()

    return products.map((product) => serializeDocument(product)) as Product[]
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu sản phẩm nổi bật:", error)

    // Trả về dữ liệu mẫu khi có lỗi
    const allProducts = await getProducts()
    return allProducts.filter((product) => product.isFeatured).slice(0, 4)
  }
})

// Hàm lấy sản phẩm theo slug
export const getProductBySlug = cache(async (slug: string) => {
  try {
    // Kết nối đến MongoDB
    const { db } = await connectToDatabase()

    // Lấy dữ liệu từ collection "products" với điều kiện slug
    const product = await db.collection("products").findOne({ slug })

    return serializeDocument(product) as Product | null
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu sản phẩm theo slug:", error)

    // Trả về dữ liệu mẫu khi có lỗi
    const allProducts = await getProducts()
    return allProducts.find((product) => product.slug === slug) || null
  }
})

// Hàm lấy sản phẩm liên quan
export const getRelatedProducts = cache(async (category: string, currentSlug: string) => {
  try {
    // Kết nối đến MongoDB
    const { db } = await connectToDatabase()

    // Lấy dữ liệu từ collection "products" với điều kiện category và khác slug hiện tại
    const products = await db
      .collection("products")
      .find({ category, slug: { $ne: currentSlug } })
      .limit(4)
      .toArray()

    return products.map((product) => serializeDocument(product)) as Product[]
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu sản phẩm liên quan:", error)

    // Trả về dữ liệu mẫu khi có lỗi
    const allProducts = await getProducts()
    return allProducts.filter((product) => product.category === category && product.slug !== currentSlug).slice(0, 4)
  }
})

// Hàm lấy danh mục sản phẩm
export const getCategories = cache(async () => {
  try {
    // Kết nối đến MongoDB
    const { db } = await connectToDatabase()

    // Lấy dữ liệu từ collection "categories"
    const categories = await db.collection("categories").find({ isActive: true }).sort({ order: 1 }).toArray()

    return categories.map((category) => serializeDocument(category)) as Category[]
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu danh mục:", error)

    // Trả về dữ liệu mẫu khi có lỗi
    return [
      {
        _id: "1",
        name: "Cà Phê",
        slug: "coffee",
        description: "Các loại cà phê truyền thống và hiện đại",
        image: "/placeholder.svg?height=200&width=200",
        order: 1,
        isActive: true,
      },
      {
        _id: "2",
        name: "Trà",
        slug: "tea",
        description: "Các loại trà thơm ngon, thanh mát",
        image: "/placeholder.svg?height=200&width=200",
        order: 2,
        isActive: true,
      },
      {
        _id: "3",
        name: "Bánh & Snack",
        slug: "food",
        description: "Các loại bánh và đồ ăn nhẹ",
        image: "/placeholder.svg?height=200&width=200",
        order: 3,
        isActive: true,
      },
      {
        _id: "4",
        name: "Đồ uống khác",
        slug: "others",
        description: "Các loại đồ uống đặc biệt khác",
        image: "/placeholder.svg?height=200&width=200",
        order: 4,
        isActive: true,
      },
    ]
  }
})

// Hàm lấy dữ liệu cửa hàng
export const getStores = cache(async (city?: string) => {
  try {
    // Kết nối đến MongoDB
    const { db } = await connectToDatabase()

    // Tạo query dựa trên city (nếu có)
    const query = city ? { city, isActive: true } : { isActive: true }

    // Lấy dữ liệu từ collection "stores"
    const stores = await db.collection("stores").find(query).toArray()

    return stores.map((store) => serializeDocument(store)) as Store[]
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu cửa hàng:", error)

    // Trả về dữ liệu mẫu khi có lỗi
    return [
      {
        _id: "1",
        name: "Bụi Coffee Nguyễn Huệ",
        address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
        city: "Ho Chi Minh",
        district: "Quận 1",
        phone: "028-1234-5678",
        email: "nguyen.hue@highlands.com.vn",
        coordinates: {
          lat: 10.7769,
          lng: 106.7009,
        },
        hours: {
          monday: "06:00-22:00",
          tuesday: "06:00-22:00",
          wednesday: "06:00-22:00",
          thursday: "06:00-22:00",
          friday: "06:00-23:00",
          saturday: "06:00-23:00",
          sunday: "07:00-22:00",
        },
        facilities: ["wifi", "parking", "delivery", "takeaway"],
        image: "/placeholder.svg?height=200&width=400",
        isActive: true,
      },
      {
        _id: "2",
        name: "Bụi Coffee Lê Lợi",
        address: "45 Đường Lê Lợi, Quận 1, TP.HCM",
        city: "Ho Chi Minh",
        district: "Quận 1",
        phone: "028-1234-5679",
        email: "le.loi@highlands.com.vn",
        coordinates: {
          lat: 10.7731,
          lng: 106.7012,
        },
        hours: {
          monday: "06:00-22:00",
          tuesday: "06:00-22:00",
          wednesday: "06:00-22:00",
          thursday: "06:00-22:00",
          friday: "06:00-23:00",
          saturday: "06:00-23:00",
          sunday: "07:00-22:00",
        },
        facilities: ["wifi", "parking", "delivery", "takeaway"],
        image: "/placeholder.svg?height=200&width=400",
        isActive: true,
      },
      {
        _id: "3",
        name: "Bụi Coffee Hoàn Kiếm",
        address: "78 Đinh Tiên Hoàng, Quận Hoàn Kiếm, Hà Nội",
        city: "Ha Noi",
        district: "Quận Hoàn Kiếm",
        phone: "024-1234-5678",
        email: "hoan.kiem@highlands.com.vn",
        coordinates: {
          lat: 21.0285,
          lng: 105.8542,
        },
        hours: {
          monday: "06:00-22:00",
          tuesday: "06:00-22:00",
          wednesday: "06:00-22:00",
          thursday: "06:00-22:00",
          friday: "06:00-23:00",
          saturday: "06:00-23:00",
          sunday: "07:00-22:00",
        },
        facilities: ["wifi", "parking", "delivery", "takeaway"],
        image: "/placeholder.svg?height=200&width=400",
        isActive: true,
      },
    ]
  }
})

// Hàm lấy cửa hàng nổi bật
export const getFeaturedStores = cache(async () => {
  try {
    // Kết nối đến MongoDB
    const { db } = await connectToDatabase()

    // Lấy dữ liệu từ collection "stores"
    const stores = await db.collection("stores").find({ isActive: true }).limit(3).toArray()

    return stores.map((store) => serializeDocument(store)) as Store[]
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu cửa hàng nổi bật:", error)

    // Trả về dữ liệu mẫu khi có lỗi
    const allStores = await getStores()
    return allStores.slice(0, 3)
  }
})

// Hàm lấy đánh giá từ khách hàng (dữ liệu tĩnh từ JSON)
export const getTestimonials = cache(async () => {
  return testimonials
})

// Hàm lấy tính năng đặc biệt (dữ liệu tĩnh từ JSON)
export const getFeatures = cache(async () => {
  return features
})

// Hàm lấy đơn hàng
export const getOrders = cache(async () => {
  try {
    // Kết nối đến MongoDB
    const { db } = await connectToDatabase()

    // Lấy dữ liệu từ collection "orders"
    const orders = await db.collection("orders").find().sort({ createdAt: -1 }).toArray()

    return orders.map((order) => serializeDocument(order)) as Order[]
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu đơn hàng:", error)

    // Trả về dữ liệu mẫu khi có lỗi
    return [
      {
        _id: "1",
        orderNumber: "HL240101001",
        customerInfo: {
          name: "Nguyễn Văn A",
          phone: "0901234567",
          email: "customer@email.com",
        },
        items: [
          {
            productId: "1",
            name: "Cà Phê Phin Đen",
            size: "Vừa",
            quantity: 2,
            price: 30000,
            total: 60000,
          },
        ],
        subtotal: 60000,
        tax: 6000,
        total: 66000,
        status: "pending",
        orderType: "takeaway",
        storeId: "1",
        notes: "Ít đường",
        createdAt: "2024-01-01T10:30:00Z",
        updatedAt: "2024-01-01T10:30:00Z",
      },
      {
        _id: "2",
        orderNumber: "HL240101002",
        customerInfo: {
          name: "Trần Thị B",
          phone: "0901234568",
          email: "customer2@email.com",
        },
        items: [
          {
            productId: "2",
            name: "Cà Phê Sữa Đá",
            size: "Lớn",
            quantity: 1,
            price: 39000,
            total: 39000,
          },
          {
            productId: "4",
            name: "Bánh Mì Thịt Nướng",
            size: "Thường",
            quantity: 1,
            price: 35000,
            total: 35000,
          },
        ],
        subtotal: 74000,
        tax: 7400,
        total: 81400,
        status: "completed",
        orderType: "dine-in",
        storeId: "1",
        notes: "",
        createdAt: "2024-01-01T11:15:00Z",
        updatedAt: "2024-01-01T11:45:00Z",
      },
    ]
  }
})
