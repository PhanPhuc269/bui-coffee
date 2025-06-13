import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { AboutSection } from "@/components/about-section"
import { StoreLocations } from "@/components/store-locations"
import { Testimonials } from "@/components/testimonials"
import { Features } from "@/components/features"
import { StatsSection } from "@/components/stats-section"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <HeroSection />
      <FeaturedProducts />
      <Features />
      <AboutSection />
      <StatsSection />
      <StoreLocations />
      <Testimonials />
    </div>
  )
}
