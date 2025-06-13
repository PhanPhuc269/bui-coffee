import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { getTestimonials } from "@/lib/data"

export async function Testimonials() {
  const testimonials = await getTestimonials()

  return (
    <section className="container">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Khách hàng nói gì về chúng tôi</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Những đánh giá chân thực từ khách hàng đã trải nghiệm dịch vụ của Bụi Coffee
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="bg-secondary">
            <CardContent className="p-6">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="mb-4 italic">"{testimonial.comment}"</p>
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg?height=40&width=40"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
