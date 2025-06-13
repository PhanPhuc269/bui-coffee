import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react"
import { siteConfig } from "@/config/site"

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-50">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" width={40} height={40} alt="Bụi Coffee Logo" />
              <span className="text-xl font-bold">Bụi Coffee</span>
            </Link>
            <p className="mb-4 text-amber-200">
              Thương hiệu cà phê Việt Nam từ năm 1999, tự hào mang đến những trải nghiệm cà phê đậm đà, phong phú và
              khác biệt.
            </p>
            <div className="flex gap-4">
              <Link href={siteConfig.socialMedia.facebook} className="text-amber-200 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href={siteConfig.socialMedia.instagram} className="text-amber-200 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href={siteConfig.socialMedia.youtube} className="text-amber-200 hover:text-white">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/menu" className="text-amber-200 hover:text-white">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-amber-200 hover:text-white">
                  Cửa hàng
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-amber-200 hover:text-white">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-amber-200 hover:text-white">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 shrink-0 text-amber-200" />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 shrink-0 text-amber-200" />
                <span>{siteConfig.contact.hotline}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 shrink-0 text-amber-200" />
                <span>{siteConfig.contact.email}</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Giờ mở cửa</h3>
            <p className="mb-2">Thứ 2 - Thứ 6: {siteConfig.businessHours.weekdays}</p>
            <p>Thứ 7 - Chủ nhật: {siteConfig.businessHours.weekend}</p>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Đăng ký nhận tin</h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
                <button
                  type="submit"
                  className="h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                >
                  Gửi
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-amber-800">
        <div className="container py-4 text-center text-sm text-amber-200">
          <p>© {new Date().getFullYear()} Bụi Coffee. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
