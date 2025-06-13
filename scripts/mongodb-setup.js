// Script thiết lập MongoDB với dữ liệu mẫu
const { MongoClient } = require("mongodb")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"
const DB_NAME = "highlands-coffee"

// Dữ liệu mẫu cho Products
const sampleProducts = [
  {
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
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
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
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
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
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
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
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Dữ liệu mẫu cho Categories
const sampleCategories = [
  {
    name: "Cà Phê",
    slug: "coffee",
    description: "Các loại cà phê truyền thống và hiện đại",
    image: "/placeholder.svg?height=200&width=200",
    order: 1,
    isActive: true,
  },
  {
    name: "Trà",
    slug: "tea",
    description: "Các loại trà thơm ngon, thanh mát",
    image: "/placeholder.svg?height=200&width=200",
    order: 2,
    isActive: true,
  },
  {
    name: "Bánh & Snack",
    slug: "food",
    description: "Các loại bánh và đồ ăn nhẹ",
    image: "/placeholder.svg?height=200&width=200",
    order: 3,
    isActive: true,
  },
  {
    name: "Đồ uống khác",
    slug: "others",
    description: "Các loại đồ uống đặc biệt khác",
    image: "/placeholder.svg?height=200&width=200",
    order: 4,
    isActive: true,
  },
]

// Dữ liệu mẫu cho Stores
const sampleStores = [
  {
    name: "Bụi Coffee Nguyễn Huệ",
    address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
    city: "Ho Chi Minh",
    district: "Quận 1",
    phone: "028-1234-5678",
    email: "nguyen.hue@buicoffee.com.vn",
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
    name: "Bụi Coffee Lê Lợi",
    address: "45 Đường Lê Lợi, Quận 1, TP.HCM",
    city: "Ho Chi Minh",
    district: "Quận 1",
    phone: "028-1234-5679",
    email: "le.loi@buicoffee.com.vn",
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
    name: "Bụi Coffee Hoàn Kiếm",
    address: "78 Đinh Tiên Hoàng, Quận Hoàn Kiếm, Hà Nội",
    city: "Ha Noi",
    district: "Quận Hoàn Kiếm",
    phone: "024-1234-5678",
    email: "hoan.kiem@buicoffee.com.vn",
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

// Dữ liệu mẫu cho Orders
const sampleOrders = [
  {
    orderNumber: "BC240101001",
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
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    orderNumber: "BC240101002",
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
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Dữ liệu mẫu cho Features
const sampleFeatures = [
  {
    title: "Cà Phê Chất Lượng Cao",
    description: "Chúng tôi chỉ sử dụng những hạt cà phê được chọn lọc kỹ càng từ các vùng trồng cà phê nổi tiếng",
    icon: "Coffee",
  },
  {
    title: "Không Gian Thoải Mái",
    description: "Thiết kế hiện đại, ấm cúng với wifi miễn phí và không gian làm việc lý tưởng",
    icon: "Wifi",
  },
  {
    title: "Phục Vụ Nhanh Chóng",
    description: "Đội ngũ barista chuyên nghiệp đảm bảo thời gian phục vụ nhanh nhất",
    icon: "Clock",
  },
  {
    title: "Giao Hàng Tận Nơi",
    description: "Dịch vụ giao hàng nhanh chóng trong bán kính 5km với phí ship hợp lý",
    icon: "Truck",
  },
]

// Dữ liệu mẫu cho Testimonials
const sampleTestimonials = [
  {
    name: "Nguyễn Minh Anh",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    comment: "Cà phê ở đây thật sự rất ngon! Không gian thoải mái, phù hợp để làm việc và gặp gỡ bạn bè.",
    location: "TP. Hồ Chí Minh",
  },
  {
    name: "Trần Văn Bình",
    avatar: "/placeholder-user.jpg",
    rating: 5,
    comment: "Dịch vụ tuyệt vời, nhân viên thân thiện. Trà sen vàng ở đây là món tôi yêu thích nhất.",
    location: "Hà Nội",
  },
  {
    name: "Lê Thị Cẩm",
    avatar: "/placeholder-user.jpg",
    rating: 4,
    comment: "Bánh mì thịt nướng rất ngon, giá cả hợp lý. Sẽ quay lại lần sau!",
    location: "Đà Nẵng",
  },
]

async function setupDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("Đã kết nối đến MongoDB")

    const db = client.db(DB_NAME)

    // Tạo collections và insert dữ liệu mẫu
    console.log("Đang tạo collection products...")
    await db.collection("products").deleteMany({})
    await db.collection("products").insertMany(sampleProducts)
    console.log(`Đã thêm ${sampleProducts.length} sản phẩm`)

    console.log("Đang tạo collection categories...")
    await db.collection("categories").deleteMany({})
    await db.collection("categories").insertMany(sampleCategories)
    console.log(`Đã thêm ${sampleCategories.length} danh mục`)

    console.log("Đang tạo collection stores...")
    await db.collection("stores").deleteMany({})
    await db.collection("stores").insertMany(sampleStores)
    console.log(`Đã thêm ${sampleStores.length} cửa hàng`)

    console.log("Đang tạo collection orders...")
    await db.collection("orders").deleteMany({})
    await db.collection("orders").insertMany(sampleOrders)
    console.log(`Đã thêm ${sampleOrders.length} đơn hàng`)

    console.log("Đang tạo collection features...")
    await db.collection("features").deleteMany({})
    await db.collection("features").insertMany(sampleFeatures)
    console.log(`Đã thêm ${sampleFeatures.length} tính năng`)

    console.log("Đang tạo collection testimonials...")
    await db.collection("testimonials").deleteMany({})
    await db.collection("testimonials").insertMany(sampleTestimonials)
    console.log(`Đã thêm ${sampleTestimonials.length} đánh giá`)

    // Tạo indexes
    console.log("Đang tạo indexes...")
    await db.collection("products").createIndex({ slug: 1 }, { unique: true })
    await db.collection("products").createIndex({ category: 1 })
    await db.collection("products").createIndex({ isFeatured: 1 })
    await db.collection("categories").createIndex({ slug: 1 }, { unique: true })
    await db.collection("stores").createIndex({ city: 1 })
    await db.collection("orders").createIndex({ orderNumber: 1 }, { unique: true })
    await db.collection("orders").createIndex({ status: 1 })
    await db.collection("features").createIndex({ title: 1 }, { unique: true })

    console.log("✅ Thiết lập database thành công!")
  } catch (error) {
    console.error("❌ Lỗi thiết lập database:", error)
  } finally {
    await client.close()
  }
}

setupDatabase()
