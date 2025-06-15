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
    default: "Bụi Coffee - Chuỗi cà phê hàng đầu Việt Nam",
    template: "%s | Bụi Coffee",
  },
  description:
    "Thưởng thức hương vị cà phê đậm đà cùng không gian hiện đại tại Bụi Coffee. Chuỗi cà phê uy tín với nhiều chi nhánh trên toàn quốc.",
  keywords: [
    "cà phê",
    "coffee",
    "bụi coffee",
    "cà phê việt nam",
    "cà phê sữa đá",
    "trà sữa",
    "bánh ngọt",
    "chuỗi cà phê",
    "quán cà phê",
    "coffee shop",
  ],
  authors: [{ name: "Bụi Coffee" }],
  creator: "Bụi Coffee",
  publisher: "Bụi Coffee",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://bui-coffee.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://bui-coffee.vercel.app",
    title: "Bụi Coffee - Chuỗi cà phê hàng đầu Việt Nam",
    description: "Thưởng thức hương vị cà phê đậm đà cùng không gian hiện đại tại Bụi Coffee",
    siteName: "Bụi Coffee",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Bụi Coffee Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bụi Coffee - Chuỗi cà phê hàng đầu Việt Nam",
    description: "Thưởng thức hương vị cà phê đậm đà cùng không gian hiện đại tại Bụi Coffee",
    images: ["/logo.png"],
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
  applicationName: "Bụi Coffee",
  referrer: "origin-when-cross-origin",
  category: "food",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#8B4513" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Bụi Coffee" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#8B4513" />
        <meta name="msapplication-tap-highlight" content="no" />
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
