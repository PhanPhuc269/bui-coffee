import Head from "next/head"

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article" | "product"
  structuredData?: object
}

export function SEOHead({
  title = "Bụi Coffee - Chuỗi cà phê hàng đầu Việt Nam",
  description = "Thưởng thức hương vị cà phê đậm đà cùng không gian hiện đại tại Bụi Coffee",
  keywords = [],
  image = "/logo.png",
  url = "https://bui-coffee.vercel.app",
  type = "website",
  structuredData,
}: SEOHeadProps) {
  const keywordString = keywords.length > 0 ? keywords.join(", ") : undefined

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywordString && <meta name="keywords" content={keywordString} />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Bụi Coffee" />
      <meta property="og:locale" content="vi_VN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </Head>
  )
}
