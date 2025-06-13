import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/product-detail"
import { ProductCarousel } from "@/components/product-carousel"
import { getProductBySlug, getRelatedProducts } from "@/lib/data"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: "Sản phẩm không tồn tại - Bụi Coffee",
      description: "Sản phẩm bạn tìm kiếm không tồn tại.",
    }
  }

  return {
    title: `${product.name} - Bụi Coffee`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.category, product.slug)

  return (
    <div className="container py-8 md:py-12">
      <ProductDetail product={product} />
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Sản phẩm liên quan</h2>
          <ProductCarousel products={relatedProducts} />
        </div>
      )}
    </div>
  )
}
