import type { Metadata } from "next"

interface SEOOptimizerProps {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  structuredData?: object
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = "/logo.png",
  structuredData,
}: SEOOptimizerProps): Metadata {
  const fullTitle = title.includes("Cà Phê Bụi") ? title : `${title} | Cà Phê Bụi - Quán Cà Phê Ngon Nhất Việt Nam`

  return {
    title: fullTitle,
    description,
    keywords: [...keywords, "cà phê bụi", "ca phe bui", "quán cà phê ngon", "cà phê việt nam", "vietnamese coffee"],
    openGraph: {
      title: fullTitle,
      description,
      images: [ogImage],
      type: "website",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonical || "https://ca-phe-bui.phanphuc.id.vn",
    },
    other: structuredData
      ? {
          "structured-data": JSON.stringify(structuredData),
        }
      : undefined,
  }
}

// SEO Content Component for better on-page optimization
export function SEOContent({
  heading,
  content,
  keywords = [],
}: {
  heading: string
  content: string
  keywords?: string[]
}) {
  return (
    <div className="sr-only">
      <h1>{heading}</h1>
      <div>
        {content}
        {keywords.length > 0 && <p>Từ khóa liên quan: {keywords.join(", ")}</p>}
      </div>
    </div>
  )
}
