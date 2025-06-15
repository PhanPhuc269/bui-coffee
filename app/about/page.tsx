import { AboutSection } from "@/components/about-section"
import { Features } from "@/components/features"
import { StatsSection } from "@/components/stats-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Về chúng tôi - Câu chuyện thương hiệu Cà Phê Bụi",
  description:
    "Tìm hiểu về lịch sử, sứ mệnh và giá trị cốt lõi của Cà Phê Bụi. Hành trình từ một quán cà phê nhỏ đến chuỗi cà phê hàng đầu Việt Nam.",
  keywords: [
    "về Cà Phê Bụi",
    "lịch sử Cà Phê Bụi",
    "sứ mệnh",
    "giá trị cốt lõi",
    "thương hiệu cà phê việt nam",
    "câu chuyện thương hiệu",
  ],
  openGraph: {
    title: "Về chúng tôi - Cà Phê Bụi",
    description: "Câu chuyện thương hiệu và hành trình phát triển của Cà Phê Bụi",
    images: ["/placeholder.jpg"],
  },
}

export default function AboutPage() {
  // Structured Data for About Page
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Về Cà Phê Bụi",
    description: "Trang giới thiệu về lịch sử, sứ mệnh và giá trị của Cà Phê Bụi",
    mainEntity: {
      "@type": "Organization",
      name: "Cà Phê Bụi",
      foundingDate: "2015",
      description:
        "Chuỗi cà phê hàng đầu Việt Nam với sứ mệnh mang đến hương vị cà phê đậm đà và không gian thư giãn tuyệt vời",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema),
        }}
      />

      <div className="container py-8 md:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Về chúng tôi</h1>
          <p className="mt-2 text-muted-foreground">Câu chuyện về hành trình phát triển của Cà Phê Bụi</p>
        </div>

        <AboutSection />
        <Features />
        <StatsSection />
      </div>
    </>
  )
}
