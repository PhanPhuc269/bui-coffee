import { ProductGrid } from "@/components/product-grid"
import { CategoryFilter } from "@/components/category-filter"
import { getCategories } from "@/lib/data"
import { getProducts } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Menu - Bụi Coffee",
  description: "Khám phá menu đa dạng với các loại cà phê, trà và đồ ăn nhẹ tại Bụi Coffee",
}

export default async function MenuPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const categories = await getCategories()
  const selectedCategory = searchParams.category || "all"
  const products = await getProducts(selectedCategory !== "all" ? selectedCategory : undefined)

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Menu của chúng tôi</h1>
      <CategoryFilter categories={categories} selectedCategory={selectedCategory} />
      <ProductGrid products={products} />
    </div>
  )
}
