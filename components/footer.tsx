import { getSiteConfig } from "@/lib/data"
import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"

export default async function Footer() {
  const siteConfig = (await getSiteConfig()) || {
    name: "Highlands Coffee",
    description:
      "Thương hiệu cà phê Việt Nam từ năm 1999, tự hào mang đến những trải nghiệm cà phê đậm đà, phong phú và khác biệt.",
    socialMedia: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    },
    contact: {
      hotline: "1900 1234",
      email: "info@highlandscoffee.com.vn",
      address: "Tầng 14, Tòa nhà VietJet Plaza, 60A Trường Sơn, P.2, Q.Tân Bình, TP.HCM",
    },
    businessHours: {
      weekdays: "07:00 - 22:00",
      weekend: "07:00 - 23:00",
    },
  }

  return (
    <footer className="bg-[#B22830] text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Về chúng tôi</h3>
            <p className="mb-4">{siteConfig.description}</p>
            <div className="flex space-x-4">
              <Link href={siteConfig.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href={siteConfig.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href={siteConfig.socialMedia.youtube} target="_blank" rel="noopener noreferrer">
                <Youtube className="h-6 w-6" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Liên hệ</h3>
            <p className="mb-2">Hotline: {siteConfig.contact.hotline}</p>
            <p className="mb-2">Email: {siteConfig.contact.email}</p>
            <p>{siteConfig.contact.address}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Giờ mở cửa</h3>
            <p className="mb-2">Thứ 2 - Thứ 6: {siteConfig.businessHours.weekdays}</p>
            <p>Thứ 7 - Chủ nhật: {siteConfig.businessHours.weekend}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Chính sách</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="hover:underline">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="hover:underline">
                  Chính sách giao hàng
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:underline">
                  Chính sách đổi trả
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. Tất cả các quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  )
}
