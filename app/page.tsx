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
    title: siteConfig?.name || "Bụi Coffee - Chuỗi cà phê hàng đầu Việt Nam",
    description:
      siteConfig?.description || "Thưởng thức hương vị cà phê đậm đà cùng không gian hiện đại tại Bụi Coffee",
    openGraph: {
      title: siteConfig?.name || "Bụi Coffee",
      description: siteConfig?.description || "Chuỗi cà phê hàng đầu Việt Nam",
      images: [siteConfig?.logo || "/logo.png"],
    },
  }
}

export default async function HomePage() {
  const siteConfig = await getSiteConfig()

  // Structured Data for Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig?.name || "Bụi Coffee",
    description: siteConfig?.description || "Chuỗi cà phê hàng đầu Việt Nam",
    url: "https://bui-coffee.vercel.app",
    logo: `https://bui-coffee.vercel.app${siteConfig?.logo || "/logo.png"}`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig?.contact.hotline || "1800-8868",
      contactType: "customer service",
      areaServed: "VN",
      availableLanguage: "Vietnamese",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig?.contact.address || "123 Đường Nguyễn Huệ",
      addressLocality: "TP.HCM",
      addressCountry: "VN",
    },
    sameAs: [
      siteConfig?.socialMedia.facebook || "https://facebook.com/buicoffee",
      siteConfig?.socialMedia.instagram || "https://instagram.com/buicoffee",
      siteConfig?.socialMedia.youtube || "https://youtube.com/buicoffee",
    ],
  }

  // Structured Data for Website
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig?.name || "Bụi Coffee",
    url: "https://bui-coffee.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://bui-coffee.vercel.app/menu?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <>
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

      <HeroSection />
      <FeaturedProducts />
      <AboutSection />
      <Features />
      <StatsSection />
      <StoreLocations />
      <Testimonials />
    </>
  )
}
