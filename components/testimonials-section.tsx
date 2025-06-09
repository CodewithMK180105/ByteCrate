import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Frontend Engineer @ DevHub",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "DevToolkit has become an essential part of my daily workflow. The JSON formatter and API tester save me hours every week.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Full Stack Developer @ TechCorp",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Love how everything is in one place. No more switching between multiple tools and websites. The password generator is particularly useful.",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    role: "Backend Developer @ StartupXYZ",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The IP/DNS tools and UUID generator are incredibly handy. Clean interface and lightning fast performance.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Loved by Developers Worldwide</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers who trust DevToolkit for their daily development needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative h-full">
              <CardContent className="p-4 md:p-6 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed flex-grow text-sm md:text-base">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3 mt-auto">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
