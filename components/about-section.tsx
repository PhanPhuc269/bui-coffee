import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="About Bụi Coffee"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Về Bụi Coffee</h2>
          <p className="text-gray-700 mb-4">
            Bụi Coffee được thành lập vào năm 1999, bắt đầu từ một cửa hàng nhỏ tại Hà Nội. Với tình yêu dành cho
            cà phê Việt Nam và mong muốn giới thiệu hương vị đặc trưng này đến với nhiều người hơn, chúng tôi đã không
            ngừng phát triển và mở rộng.
          </p>
          <p className="text-gray-700 mb-6">
            Ngày nay, Bụi Coffee đã trở thành một trong những chuỗi cà phê lớn nhất Việt Nam với hơn 500 cửa hàng
            trên toàn quốc, mang đến không gian hiện đại và thân thiện cùng những sản phẩm chất lượng cao.
          </p>
          <Button asChild>
            <Link href="/about">Tìm hiểu thêm</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
