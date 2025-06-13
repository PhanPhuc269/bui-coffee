import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative">
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full">
        <Image
          src="/placeholder.svg?height=700&width=1920"
          alt="Bụi Coffee Hero"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Khám phá hương vị cà phê Việt Nam
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Thưởng thức những tách cà phê thơm ngon, đậm đà trong không gian hiện đại tại Bụi Coffee
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/menu">Xem menu</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                >
                  <Link href="/locations">Tìm cửa hàng</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
