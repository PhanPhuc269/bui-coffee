import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/product-detail"
import { getProductBySlug, getCategoryBySlug } from "@/lib/data"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  // Lấy slug từ params
  const slug = params.slug

  // Lấy thông tin sản phẩm
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: "Sản phẩm không tồn tại",
      description: "Không tìm thấy sản phẩm",
    }
  }

  return {
    title: `${product.name} | Bụi Coffee`,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Lấy slug từ params
  const slug = params.slug

  // Lấy thông tin sản phẩm
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  // Lấy thông tin danh mục
  const category = await getCategoryBySlug(product.category)

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} category={category} />
    </div>
  )
}
