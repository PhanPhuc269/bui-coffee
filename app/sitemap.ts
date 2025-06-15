import type { MetadataRoute } from "next"
import { getProducts, getCategories } from "@/lib/data"

const baseUrl = "https://ca-phe-bui.phanphuc.id.vn"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages with optimized priorities and frequencies
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]

  try {
    // Dynamic product pages
    const products = await getProducts()
    const productPages = products.map((product) => ({
      url: `${baseUrl}/menu/${product.slug}`,
      lastModified: new Date(product.updatedAt || product.createdAt || new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))

    // Category pages
    const categories = await getCategories()
    const categoryPages = categories.map((category) => ({
      url: `${baseUrl}/menu?category=${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))

    return [...staticPages, ...productPages, ...categoryPages]
  } catch (error) {
    console.error("Error generating sitemap:", error)
    return staticPages
  }
}
