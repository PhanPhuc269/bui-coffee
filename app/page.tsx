import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { AboutSection } from "@/components/about-section"
import { StoreLocations } from "@/components/store-locations"
import { Testimonials } from "@/components/testimonials"
import { Features } from "@/components/features"
import { StatsSection } from "@/components/stats-section"
import { getSiteConfig } from "@/lib/data"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig()

  return {
    title: "Cà Phê Bụi - Quán Cà Phê Ngon Nhất Việt Nam | Cà Phê Phin Truyền Thống",
    description:
      "Cà Phê Bụi - Quán cà phê truyền thống Việt Nam với cà phê phin ngon nhất, cà phê sữa đá đậm đà, không gian ấm cúng. Đặt món online, giao hàng tận nơi tại TP.HCM và Hà Nội.",
    keywords: [
      "cà phê bụi",
      "ca phe bui",
      "quán cà phê ngon",
      "cà phê phin truyền thống",
      "cà phê sữa đá",
      "quán cà phê sài gòn",
      "cà phê ngon tp hcm",
      "giao cà phê tận nơi",
    ],
    openGraph: {
      title: "Cà Phê Bụi - Quán Cà Phê Ngon Nhất Việt Nam",
      description: "Cà phê phin truyền thống, cà phê sữa đá đậm đà. Giao hàng tận nơi tại TP.HCM và Hà Nội.",
      images: [siteConfig?.logo || "/logo.png"],
      type: "website",
      locale: "vi_VN",
    },
    alternates: {
      canonical: "https://ca-phe-bui.phanphuc.id.vn",
    },
  }
}

export default async function HomePage() {
  const siteConfig = await getSiteConfig()

  // Enhanced Organization Schema with more details
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "CafeOrCoffeeShop"],
    name: "Cà Phê Bụi",
    alternateName: ["Ca Phe Bui", "Cafe Bui", "Cà Phê Bụi Vietnam"],
    description:
      "Quán cà phê truyền thống Việt Nam chuyên phục vụ cà phê phin ngon nhất, cà phê sữa đá đậm đà với hương vị đặc trưng của cà phê Việt Nam",
    url: "https://ca-phe-bui.phanphuc.id.vn",
    logo: `https://ca-phe-bui.phanphuc.id.vn${siteConfig?.logo || "/logo.png"}`,
    image: `https://ca-phe-bui.phanphuc.id.vn${siteConfig?.logo || "/logo.png"}`,
    telephone: siteConfig?.contact.hotline || "1800-8868",
    email: siteConfig?.contact.email || "info@caphebui.com",
    foundingDate: "2020",
    founder: {
      "@type": "Person",
      name: "Phan Phúc",
    },
    numberOfEmployees: "50-100",
    slogan: "Hương vị cà phê Việt Nam đích thực",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig?.contact.address || "123 Đường Nguyễn Huệ",
      addressLocality: "Quận 1",
      addressRegion: "TP.HCM",
      postalCode: "70000",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 10.8231,
      longitude: 106.6297,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Ho Chi Minh City",
      },
      {
        "@type": "City",
        name: "Hanoi",
      },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 10.8231,
        longitude: 106.6297,
      },
      geoRadius: "50000",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "06:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "06:00",
        closes: "23:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig?.contact.hotline || "1800-8868",
        contactType: "customer service",
        areaServed: "VN",
        availableLanguage: ["Vietnamese", "English"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "06:00",
          closes: "22:00",
        },
      },
    ],
    sameAs: [
      siteConfig?.socialMedia.facebook || "https://facebook.com/caphebui",
      siteConfig?.socialMedia.instagram || "https://instagram.com/caphebui",
      siteConfig?.socialMedia.youtube || "https://youtube.com/caphebui",
      siteConfig?.socialMedia.tiktok || "https://tiktok.com/@caphebui",
    ],
    hasMenu: "https://ca-phe-bui.phanphuc.id.vn/menu",
    servesCuisine: ["Vietnamese Coffee", "Traditional Coffee", "Tea", "Pastries"],
    paymentAccepted: ["Cash", "Credit Card", "Mobile Payment", "Bank Transfer"],
    priceRange: "₫₫",
    currenciesAccepted: "VND",
    acceptsReservations: true,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "1250",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Nguyễn Văn A",
        },
        reviewBody: "Cà phê ngon nhất Sài Gòn! Cà phê phin truyền thống đậm đà, không gian ấm cúng.",
      },
    ],
  }

  // Website Schema with enhanced search functionality
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Cà Phê Bụi",
    alternateName: "Ca Phe Bui",
    url: "https://ca-phe-bui.phanphuc.id.vn",
    description: "Website chính thức của Cà Phê Bụi - Quán cà phê truyền thống Việt Nam",
    inLanguage: "vi-VN",
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://ca-phe-bui.phanphuc.id.vn/menu?search={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
      {
        "@type": "OrderAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://ca-phe-bui.phanphuc.id.vn/menu",
        },
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Cà Phê Bụi",
      logo: {
        "@type": "ImageObject",
        url: `https://ca-phe-bui.phanphuc.id.vn${siteConfig?.logo || "/logo.png"}`,
      },
    },
  }

  // FAQ Schema for better search visibility
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Cà Phê Bụi có giao hàng tận nơi không?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Có, Cà Phê Bụi giao hàng tận nơi trong khu vực TP.HCM và Hà Nội. Thời gian giao hàng từ 15-30 phút.",
        },
      },
      {
        "@type": "Question",
        name: "Giờ mở cửa của Cà Phê Bụi là mấy giờ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cà Phê Bụi mở cửa từ 6:00 sáng đến 22:00 tối các ngày trong tuần, và đến 23:00 tối vào cuối tuần.",
        },
      },
      {
        "@type": "Question",
        name: "Cà Phê Bụi có những loại cà phê nào?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cà Phê Bụi chuyên phục vụ cà phê phin truyền thống, cà phê sữa đá, cà phê đen đá, và nhiều loại đồ uống khác như trà sữa, sinh tố.",
        },
      },
    ],
  }

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* SEO Content - Hidden but readable by search engines */}
      <div className="sr-only">
        <h1>Cà Phê Bụi - Quán Cà Phê Ngon Nhất Việt Nam</h1>
        <p>
          Cà Phê Bụi là quán cà phê truyền thống Việt Nam chuyên phục vụ cà phê phin ngon nhất, cà phê sữa đá đậm đà với
          hương vị đặc trưng. Chúng tôi tự hào mang đến cho khách hàng những ly cà phê chất lượng cao, được pha chế từ
          những hạt cà phê Robusta và Arabica tuyển chọn kỹ lưỡng từ các vùng trồng cà phê nổi tiếng của Việt Nam như
          Đắk Lắk, Lâm Đồng, Gia Lai.
        </p>
        <p>
          Với không gian ấm cúng, phong cách truyền thống pha lẫn hiện đại, Cà Phê Bụi là điểm đến lý tưởng cho những ai
          yêu thích hương vị cà phê Việt Nam đích thực. Chúng tôi phục vụ giao hàng tận nơi tại TP.HCM và Hà Nội với
          thời gian nhanh chóng, đảm bảo khách hàng luôn được thưởng thức cà phê nóng hổi, thơm ngon.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-16 pb-16">
        <HeroSection />
        <FeaturedProducts />
        <Features />
        <AboutSection />
        <StatsSection />
        <StoreLocations />
        <Testimonials />
      </div>
    </>
  )
}
