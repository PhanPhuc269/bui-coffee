import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/highlands-coffee"
const MONGODB_DB = process.env.MONGODB_DB || "highlands-coffee"

// Biến toàn cục được sử dụng để lưu trữ kết nối MongoDB
let cached = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
  // Nếu đã có kết nối, trả về kết nối đó
  if (cached.conn) {
    return cached.conn
  }

  // Nếu chưa có promise kết nối, tạo mới
  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout sau 5 giây nếu không kết nối được
    }

    cached.promise = MongoClient.connect(MONGODB_URI, opts)
      .then((client) => {
        return {
          client,
          db: client.db(MONGODB_DB),
        }
      })
      .catch((error) => {
        console.error("Không thể kết nối đến MongoDB:", error)
        // Trả về null để code biết là kết nối thất bại
        return null
      })
  }

  try {
    cached.conn = await cached.promise
    return cached.conn
  } catch (error) {
    console.error("Lỗi khi kết nối đến MongoDB:", error)
    return null
  }
}
