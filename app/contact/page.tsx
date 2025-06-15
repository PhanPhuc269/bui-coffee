import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Liên hệ - Cà Phê Bụi",
  description: "Liên hệ với Cà Phê Bụi để được hỗ trợ và giải đáp thắc mắc",
}

export default function ContactPage() {
  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Liên hệ</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  )
}
