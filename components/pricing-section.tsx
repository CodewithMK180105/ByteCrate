"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown } from "lucide-react"

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with basic developer tools",
    icon: Zap,
    features: [
      "Access to 8 core tools",
      "Basic JSON/XML formatting",
      "Simple API testing",
      "Password generation",
      "UUID generation",
      "Community support",
      "No registration required",
    ],
    limitations: ["Limited API requests per day", "Basic export formats only"],
    cta: "Get Started Free",
    ctaVariant: "outline" as const,
    popular: false,
  },
  {
    name: "Developer",
    price: "$9",
    period: "per month",
    description: "Enhanced tools and features for professional developers",
    icon: Star,
    features: [
      "Everything in Free",
      "Unlimited API requests",
      "Advanced code beautification",
      "Batch processing",
      "Custom export formats",
      "Priority support",
      "Advanced DNS diagnostics",
      "Image batch conversion",
      "Custom color themes",
      "Keyboard shortcuts",
    ],
    limitations: [],
    cta: "Start Free Trial",
    ctaVariant: "default" as const,
    popular: true,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "Complete toolkit with team features and integrations",
    icon: Crown,
    features: [
      "Everything in Developer",
      "Team collaboration",
      "API integrations",
      "Custom tool configurations",
      "Advanced analytics",
      "White-label options",
      "SSO authentication",
      "Dedicated support",
      "Custom domains",
      "Enterprise security",
    ],
    limitations: [],
    cta: "Contact Sales",
    ctaVariant: "outline" as const,
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your development needs. Start free and upgrade as you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <Card
              key={tier.name}
              className={`relative group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                tier.popular
                  ? "border-primary shadow-lg scale-105 bg-gradient-to-b from-primary/5 to-transparent"
                  : "hover:border-primary/50"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm font-medium">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div className="flex items-center justify-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      tier.popular ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                    }`}
                  >
                    <tier.icon className="h-6 w-6" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <CardDescription className="text-muted-foreground mt-2">{tier.description}</CardDescription>
                <div className="mt-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-muted-foreground ml-2">/{tier.period}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {tier.limitations.length > 0 && (
                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground mb-2">Limitations:</p>
                    <div className="space-y-2">
                      {tier.limitations.map((limitation, limitIndex) => (
                        <div key={limitIndex} className="flex items-start space-x-3">
                          <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-6">
                  <Link href={tier.name === "Pro" ? "#contact" : "/dashboard"}>
                    <Button
                      variant={tier.ctaVariant}
                      className={`w-full transition-all duration-200 ${
                        tier.popular
                          ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl"
                          : "hover:scale-105"
                      }`}
                      size="lg"
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">All plans include:</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>30-day money back guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500" />
              <span>Regular updates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
