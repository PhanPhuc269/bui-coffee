import type React from "react"
import { Coffee, Clock, MapPin, Wifi } from "lucide-react"
import { getFeatures } from "@/lib/data"

export async function Features() {
  const features = await getFeatures()

  const iconMap: Record<string, React.ReactNode> = {
    Coffee: <Coffee className="h-8 w-8 text-primary" />,
    Clock: <Clock className="h-8 w-8 text-primary" />,
    MapPin: <MapPin className="h-8 w-8 text-primary" />,
    Wifi: <Wifi className="h-8 w-8 text-primary" />,
  }

  return (
    <section className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="mb-4 p-3 bg-primary/10 rounded-full">{iconMap[feature.icon]}</div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
