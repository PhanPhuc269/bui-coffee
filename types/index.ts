export interface Product {
  _id: string
  name: string
  slug: string
  description: string
  longDescription: string
  category: string
  price: number
  sizes: ProductSize[]
  image: string
  images: string[]
  isAvailable: boolean
  isFeatured: boolean
  nutritionalInfo: NutritionalInfo
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface ProductSize {
  name: string
  price: number
}

export interface NutritionalInfo {
  calories: number
  caffeine: string
  sugar: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  description: string
  image: string
  order: number
  isActive: boolean
}

export interface Store {
  _id: string
  name: string
  address: string
  city: string
  district: string
  phone: string
  email: string
  coordinates: {
    lat: number
    lng: number
  }
  hours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  facilities: string[]
  image: string
  isActive: boolean
}

export interface Order {
  _id: string
  orderNumber: string
  customerInfo: {
    name: string
    phone: string
    email: string
  }
  items: OrderItem[]
  subtotal: number
  tax: number
  total: number
  status: "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled"
  orderType: "dine-in" | "takeaway" | "delivery"
  storeId: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  productId: string
  name: string
  size: string
  quantity: number
  price: number
  total: number
}

export interface Testimonial {
  id: number
  name: string
  avatar: string
  rating: number
  comment: string
  location: string
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface SiteConfig {
  name: string
  description: string
  logo: string
  contact: {
    hotline: string
    email: string
    address: string
  }
  socialMedia: {
    facebook: string
    instagram: string
    youtube: string
  }
  businessHours: {
    weekdays: string
    weekend: string
  }
}
