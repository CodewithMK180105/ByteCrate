import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, ExternalLink } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand Section */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <Link href="/" className="text-xl md:text-2xl font-bold text-primary">
              DevToolkit
            </Link>
            <p className="text-muted-foreground max-w-xs leading-relaxed text-sm">
              Your all-in-one developer toolkit. Streamline your development workflow with our comprehensive suite of
              tools.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-muted rounded-lg"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-muted rounded-lg"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-muted rounded-lg"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-muted rounded-lg"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Product Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Product</h3>
            <div className="space-y-3">
              <Link
                href="/dashboard"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="#features"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                API Documentation
                <ExternalLink className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>

          {/* Tools Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Tools</h3>
            <div className="space-y-3">
              <Link
                href="/dashboard/json-formatter"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                JSON Formatter
              </Link>
              <Link
                href="/dashboard/api-tester"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                API Tester
              </Link>
              <Link
                href="/dashboard/password-generator"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Password Generator
              </Link>
              <Link
                href="/dashboard/uuid-generator"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                UUID Generator
              </Link>
            </div>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <div className="space-y-3">
              <Link href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </Link>
              <Link href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
              <Link href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-6 md:my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DevToolkit. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
            <span>Made with ❤️ for developers</span>
            <Link href="#" className="hover:text-primary transition-colors">
              Status
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Changelog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
