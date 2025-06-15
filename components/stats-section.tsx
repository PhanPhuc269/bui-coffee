import { AnimatedCounter } from "@/components/animated-counter"
import { FadeInSection } from "@/components/fade-in-section"

export function StatsSection() {
  const stats = [
    {
      number: 500,
      suffix: "+",
      label: "Cửa hàng",
      description: "Trên toàn quốc",
    },
    {
      number: 1000000,
      suffix: "+",
      label: "Khách hàng",
      description: "Tin tưởng và yêu thích",
    },
    {
      number: 25,
      label: "Năm kinh nghiệm",
      description: "Phục vụ cà phê Việt Nam",
    },
    {
      number: 50,
      suffix: "+",
      label: "Sản phẩm",
      description: "Đa dạng và phong phú",
    },
  ]

  return (
    <section className="bg-primary/5 py-16">
      <div className="container">
        <FadeInSection className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Cà Phê Bụi trong con số</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Những con số ấn tượng thể hiện sự phát triển và niềm tin của khách hàng dành cho Cà Phê Bụi
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <FadeInSection key={index} delay={index * 200} className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                <h3 className="text-lg font-semibold mt-2 mb-1">{stat.label}</h3>
                <p className="text-muted-foreground text-sm">{stat.description}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}
