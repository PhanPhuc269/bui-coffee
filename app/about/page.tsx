import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Về chúng tôi - Bụi Coffee",
  description: "Tìm hiểu về lịch sử, sứ mệnh và giá trị của Bụi Coffee",
}

export default function AboutPage() {
  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Về chúng tôi</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Câu chuyện của chúng tôi</h2>
          <p className="text-gray-700 mb-4">
            Bụi Coffee được thành lập vào năm 1999, bắt đầu từ một cửa hàng nhỏ tại Hà Nội. Với tình yêu dành cho
            cà phê Việt Nam và mong muốn giới thiệu hương vị đặc trưng này đến với nhiều người hơn, chúng tôi đã không
            ngừng phát triển và mở rộng.
          </p>
          <p className="text-gray-700">
            Ngày nay, Bụi Coffee đã trở thành một trong những chuỗi cà phê lớn nhất Việt Nam với hơn 500 cửa hàng
            trên toàn quốc, mang đến không gian hiện đại và thân thiện cùng những sản phẩm chất lượng cao.
          </p>
        </div>
        <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Bụi Coffee Story"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Sứ mệnh và tầm nhìn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-amber-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-amber-800">Sứ mệnh</h3>
            <p className="text-gray-700">
              Mang đến trải nghiệm cà phê Việt Nam chất lượng cao trong không gian hiện đại, thân thiện và tiện lợi.
              Chúng tôi cam kết sử dụng nguyên liệu chất lượng cao và quy trình chế biến tỉ mỉ để tạo ra những sản phẩm
              hoàn hảo.
            </p>
          </div>
          <div className="bg-amber-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-amber-800">Tầm nhìn</h3>
            <p className="text-gray-700">
              Trở thành thương hiệu cà phê hàng đầu Việt Nam và vươn ra thị trường quốc tế, đồng thời góp phần quảng bá
              văn hóa cà phê Việt Nam ra toàn thế giới. Chúng tôi luôn nỗ lực đổi mới và phát triển để đáp ứng nhu cầu
              ngày càng cao của khách hàng.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Giá trị cốt lõi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Chất lượng",
              description: "Cam kết mang đến sản phẩm chất lượng cao nhất cho khách hàng",
            },
            {
              title: "Đổi mới",
              description: "Không ngừng sáng tạo và cải tiến sản phẩm, dịch vụ",
            },
            {
              title: "Trách nhiệm",
              description: "Có trách nhiệm với cộng đồng và môi trường",
            },
            {
              title: "Khách hàng",
              description: "Đặt khách hàng làm trung tâm trong mọi hoạt động",
            },
          ].map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-amber-800">{value.title}</h3>
              <p className="text-gray-700">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
