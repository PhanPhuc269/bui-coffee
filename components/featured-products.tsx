import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import { getFeaturedProducts } from "@/lib/data"

export async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  return (
    <section className="container">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Sản phẩm nổi bật</h2>
          <p className="text-muted-foreground">Khám phá những sản phẩm được yêu thích nhất của chúng tôi</p>
        </div>
        <Link href="/menu" className="inline-flex items-center mt-4 md:mt-0 text-primary font-medium hover:underline">
          Xem tất cả sản phẩm
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  )
}
