import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/product-detail"
import { getProductBySlug, getCategoryBySlug, getRelatedProducts } from "@/lib/data"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const slug = params.slug
  const product = await getProductBySlug(slug)

  if (!product) {
    return {
      title: "Sản phẩm không tồn tại",
      description: "Không tìm thấy sản phẩm",
    }
  }

  return {
    title: `${product.name} - Thực đơn Cà Phê Bụi`,
    description: product.longDescription || product.description,
    keywords: [product.name, ...product.tags, "Cà Phê Bụi", "cà phê", "đồ uống", product.category],
    openGraph: {
      title: `${product.name} | Cà Phê Bụi`,
      description: product.description,
      images: [product.image, ...product.images],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Cà Phê Bụi`,
      description: product.description,
      images: [product.image],
    },
    alternates: {
      canonical: `/menu/${product.slug}`,
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const slug = params.slug
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const category = await getCategoryBySlug(product.category)
  const relatedProducts = await getRelatedProducts(product.category, product.slug)

  // Structured Data for Product
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    brand: {
      "@type": "Brand",
      name: "Cà Phê Bụi",
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: Math.min(...product.sizes.map((size) => size.price)),
      highPrice: Math.max(...product.sizes.map((size) => size.price)),
      priceCurrency: "VND",
      availability: product.isAvailable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      offers: product.sizes.map((size) => ({
        "@type": "Offer",
        name: `${product.name} - ${size.name}`,
        price: size.price,
        priceCurrency: "VND",
        availability: product.isAvailable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      })),
    },
    nutrition: {
      "@type": "NutritionInformation",
      calories: product.nutritionalInfo.calories,
      sugarContent: product.nutritionalInfo.sugar,
      caffeine: product.nutritionalInfo.caffeine,
    },
    category: category?.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "127",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <div className="container mx-auto px-4 py-8">
        <ProductDetail product={product} category={category} relatedProducts={relatedProducts} />
      </div>
    </>
  )
}
