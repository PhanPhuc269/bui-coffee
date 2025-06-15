import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { getSiteConfig } from "@/lib/data"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteConfig()

  return {
    metadataBase: new URL("https://ca-phe-bui.phanphuc.id.vn"),
    title: {
      default: siteConfig?.name || "Bụi Coffee - Chuỗi cà phê hàng đầu Việt Nam",
      template: `%s | ${siteConfig?.name || "Bụi Coffee"}`,
    },
    description:
      siteConfig?.description ||
      "Thưởng thức hương vị cà phê đậm đà, phong phú cùng không gian hiện đại tại Bụi Coffee. Chuỗi cà phê hàng đầu Việt Nam với hơn 500 cửa hàng trên toàn quốc.",
    keywords: [
      "cà phê",
      "coffee",
      "Bụi Coffee",
      "cà phê Việt Nam",
      "Vietnamese coffee",
      "chuỗi cà phê",
      "coffee shop",
      "đồ uống",
      "beverages",
    ],
    authors: [{ name: "Bụi Coffee" }],
    creator: "Bụi Coffee",
    publisher: "Bụi Coffee",
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
      siteName: siteConfig?.name || "Bụi Coffee",
      title: siteConfig?.name || "Bụi Coffee - Chuỗi cà phê hàng đầu Việt Nam",
      description:
        siteConfig?.description ||
        "Thưởng thức hương vị cà phê đậm đà, phong phú cùng không gian hiện đại tại Bụi Coffee",
      images: [
        {
          url: siteConfig?.logo || "/logo.png",
          width: 1200,
          height: 630,
          alt: siteConfig?.name || "Bụi Coffee",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig?.name || "Bụi Coffee - Chuỗi cà phê hàng đầu Việt Nam",
      description:
        siteConfig?.description ||
        "Thưởng thức hương vị cà phê đậm đà, phong phú cùng không gian hiện đại tại Bụi Coffee",
      images: [siteConfig?.logo || "/logo.png"],
    },
    verification: {
      google: "your-google-verification-code",
    },
    alternates: {
      canonical: "https://ca-phe-bui.phanphuc.id.vn",
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
