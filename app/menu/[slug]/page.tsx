import { getProductBySlug, getRelatedProducts } from "@/lib/data"
import { ProductDetail } from "@/components/product-detail"
import { ProductCarousel } from "@/components/product-carousel"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    return {
      title: "Sản phẩm không tồn tại - Bụi Coffee",
    }
  }

  return {
    title: `${product.name} - Bụi Coffee`,
    description: product.description,
  }
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.category, product.slug)

  return (
    <div className="container py-8 md:py-12">
      <ProductDetail product={product} />

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
        <ProductCarousel products={relatedProducts} />
      </div>
    </div>
  )
}
