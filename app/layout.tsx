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
  title: "Bụi Coffee - Chuỗi cà phê hàng đầu Việt Nam",
  description: "Thưởng thức hương vị cà phê đậm đà cùng không gian hiện đại tại Bụi Coffee",
  metadataBase: new URL("https://ca-phe-bui.phanphuc.id.vn"),
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
    siteName: "Bụi Coffee",
    title: "Bụi Coffee - Chuỗi cà phê hàng đầu Việt Nam",
    description: "Thưởng thức hương vị cà phê đậm đà cùng không gian hiện đại tại Bụi Coffee",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Bụi Coffee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bụi Coffee - Chuỗi cà phê hàng đầu Việt Nam",
    description: "Thưởng thức hương vị cà phê đậm đà cùng không gian hiện đại tại Bụi Coffee",
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
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
