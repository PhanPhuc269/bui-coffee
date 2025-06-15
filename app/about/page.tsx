import { AboutSection } from "@/components/about-section"
import { Features } from "@/components/features"
import { StatsSection } from "@/components/stats-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Về chúng tôi - Câu chuyện thương hiệu Bụi Coffee",
  description:
    "Tìm hiểu về lịch sử, sứ mệnh và giá trị cốt lõi của Bụi Coffee. Hành trình từ một quán cà phê nhỏ đến chuỗi cà phê hàng đầu Việt Nam.",
  keywords: [
    "về bụi coffee",
    "lịch sử bụi coffee",
    "sứ mệnh",
    "giá trị cốt lõi",
    "thương hiệu cà phê việt nam",
    "câu chuyện thương hiệu",
  ],
  openGraph: {
    title: "Về chúng tôi - Bụi Coffee",
    description: "Câu chuyện thương hiệu và hành trình phát triển của Bụi Coffee",
    images: ["/placeholder.jpg"],
  },
}

export default function AboutPage() {
  // Structured Data for About Page
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Về Bụi Coffee",
    description: "Trang giới thiệu về lịch sử, sứ mệnh và giá trị của Bụi Coffee",
    mainEntity: {
      "@type": "Organization",
      name: "Bụi Coffee",
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
          <p className="mt-2 text-muted-foreground">Câu chuyện về hành trình phát triển của Bụi Coffee</p>
        </div>

        <AboutSection />
        <Features />
        <StatsSection />
      </div>
    </>
  )
}
