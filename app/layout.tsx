import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { ScrollToTop } from "@/components/scroll-to-top"
import { FloatingActionButton } from "@/components/floating-action-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Cà Phê Bụi - Quán Cà Phê Ngon Nhất Việt Nam | Cà Phê Phin Truyền Thống",
    template: "%s | Cà Phê Bụi - Quán Cà Phê Ngon Nhất Việt Nam",
  },
  description:
    "Cà Phê Bụi - Quán cà phê truyền thống Việt Nam với cà phê phin ngon nhất, cà phê sữa đá đậm đà, không gian ấm cúng. Đặt món online, giao hàng tận nơi tại TP.HCM và Hà Nội.",
  metadataBase: new URL("https://ca-phe-bui.phanphuc.id.vn"),
  keywords: [
    // Primary keywords
    "cà phê bụi",
    "ca phe bui",
    "quán cà phê ngon",
    "cà phê phin truyền thống",
    "cà phê sữa đá",
    "cà phê đen đá",

    // Location-based keywords
    "quán cà phê sài gòn",
    "quán cà phê hà nội",
    "cà phê ngon tp hcm",
    "cà phê ngon hà nội",
    "quán cà phê gần đây",

    // Product keywords
    "cà phê phin",
    "cà phê robusta",
    "cà phê arabica",
    "trà sữa",
    "bánh ngọt",
    "đồ uống ngon",

    // Service keywords
    "giao cà phê tận nơi",
    "đặt cà phê online",
    "cà phê ship nhanh",
    "quán cà phê mở cửa 24h",

    // Brand keywords
    "coffee shop vietnam",
    "vietnamese coffee",
    "traditional coffee",
    "authentic vietnamese coffee",
  ],
  authors: [{ name: "Cà Phê Bụi" }],
  creator: "Cà Phê Bụi",
  publisher: "Cà Phê Bụi",
  category: "Food & Beverage",
  classification: "Coffee Shop",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://ca-phe-bui.phanphuc.id.vn",
    siteName: "Cà Phê Bụi",
    title: "Cà Phê Bụi - Quán Cà Phê Ngon Nhất Việt Nam | Cà Phê Phin Truyền Thống",
    description:
      "Cà Phê Bụi - Quán cà phê truyền thống Việt Nam với cà phê phin ngon nhất, cà phê sữa đá đậm đà, không gian ấm cúng. Đặt món online, giao hàng tận nơi.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Cà Phê Bụi - Quán Cà Phê Ngon Nhất Việt Nam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cà Phê Bụi - Quán Cà Phê Ngon Nhất Việt Nam",
    description: "Cà phê phin truyền thống, cà phê sữa đá đậm đà. Giao hàng tận nơi tại TP.HCM và Hà Nội.",
    images: ["/logo.png"],
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://ca-phe-bui.phanphuc.id.vn",
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "16x16",
        type: "image/x-icon",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.json",
  generator: "v0.dev",
  other: {
    "google-site-verification": "your-google-verification-code",
    "msvalidate.01": "your-bing-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Additional SEO meta tags */}
        <meta name="geo.region" content="VN" />
        <meta name="geo.placename" content="Vietnam" />
        <meta name="geo.position" content="10.8231;106.6297" />
        <meta name="ICBM" content="10.8231, 106.6297" />

        {/* Mobile optimization */}
        <meta name="theme-color" content="#8B4513" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Cà Phê Bụi" />

        {/* Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CafeOrCoffeeShop",
              name: "Cà Phê Bụi",
              alternateName: ["Ca Phe Bui", "Cafe Bui"],
              description: "Quán cà phê truyền thống Việt Nam với cà phê phin ngon nhất, cà phê sữa đá đậm đà",
              url: "https://ca-phe-bui.phanphuc.id.vn",
              telephone: "1800-8868",
              email: "info@caphebui.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Đường Nguyễn Huệ",
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
              servesCuisine: "Vietnamese Coffee",
              priceRange: "₫₫",
              acceptsReservations: true,
              hasMenu: "https://ca-phe-bui.phanphuc.id.vn/menu",
              image: "https://ca-phe-bui.phanphuc.id.vn/logo.png",
              logo: "https://ca-phe-bui.phanphuc.id.vn/logo.png",
              sameAs: [
                "https://facebook.com/caphebui",
                "https://instagram.com/caphebui",
                "https://youtube.com/caphebui",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "1250",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ScrollToTop />
          <FloatingActionButton />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
