import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2 } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-16 md:py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight">
                Your All-in-One <span className="text-primary">Developer Toolkit</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Everything from API testing to UUID generation in one powerful dashboard. Streamline your development
                workflow with our comprehensive suite of tools.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="group w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#pricing">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Pricing
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 md:gap-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free to use</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>No registration required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Privacy focused</span>
              </div>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-3xl p-6 md:p-8 backdrop-blur-sm border">
              <div className="bg-background/80 rounded-2xl p-4 md:p-6 space-y-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Code2 className="h-4 w-4" />
                  <span>developer-toolkit.js</span>
                </div>
                <div className="font-mono text-xs md:text-sm space-y-2">
                  <div className="text-blue-500">const</div>
                  <div className="ml-4">
                    <span className="text-green-500">tools</span> = [
                  </div>
                  <div className="ml-8 space-y-1">
                    <div>
                      <span className="text-orange-500">'json-formatter'</span>,
                    </div>
                    <div>
                      <span className="text-orange-500">'api-tester'</span>,
                    </div>
                    <div>
                      <span className="text-orange-500">'password-generator'</span>,
                    </div>
                    <div>
                      <span className="text-orange-500">'uuid-generator'</span>,
                    </div>
                    <div className="text-muted-foreground">// and more...</div>
                  </div>
                  <div className="ml-4">];</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
