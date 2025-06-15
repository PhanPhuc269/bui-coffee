import { Suspense } from "react"
import { CategoryFilter } from "@/components/category-filter"
import { ProductGrid } from "@/components/product-grid"
import { LoadingSpinner } from "@/components/loading-spinner"
import { getCategories, getProducts } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Thực đơn - Menu đồ uống và thức ăn",
  description:
    "Khám phá thực đơn đa dạng của Bụi Coffee với các loại cà phê, trà, bánh ngọt và nhiều món ăn ngon khác. Giá cả hợp lý, chất lượng tuyệt vời.",
  keywords: [
    "thực đơn bụi coffee",
    "menu cà phê",
    "đồ uống",
    "bánh ngọt",
    "cà phê sữa đá",
    "trà sữa",
    "giá cà phê",
    "món ăn ngon",
  ],
  openGraph: {
    title: "Thực đơn Bụi Coffee - Menu đồ uống và thức ăn",
    description: "Khám phá thực đơn đa dạng với các loại cà phê, trà, bánh ngọt chất lượng cao",
    images: ["/placeholder.jpg"],
  },
}

interface MenuPageProps {
  searchParams: {
    category?: string
    search?: string
  }
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const categories = await getCategories()
  const products = await getProducts({
    category: searchParams.category,
  })

  // Structured Data for Menu
  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Thực đơn Bụi Coffee",
    description: "Menu đồ uống và thức ăn tại Bụi Coffee",
    hasMenuSection: categories.map((category) => ({
      "@type": "MenuSection",
      name: category.name,
      description: category.description,
      hasMenuItem: products
        .filter((product) => product.category === category.slug)
        .map((product) => ({
          "@type": "MenuItem",
          name: product.name,
          description: product.description,
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "VND",
          },
        })),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(menuSchema),
        }}
      />

      <div className="container py-8 md:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Thực đơn Bụi Coffee</h1>
          <p className="mt-2 text-muted-foreground">
            Khám phá hương vị đặc biệt trong từng ly cà phê và món ăn của chúng tôi
          </p>
        </div>

        <CategoryFilter categories={categories} />

        <Suspense fallback={<LoadingSpinner />}>
          <ProductGrid products={products} searchQuery={searchParams.search} />
        </Suspense>
      </div>
    </>
  )
}
