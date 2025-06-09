import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Braces, Globe, ImageIcon, Code, Table, Key, Network, Shuffle } from "lucide-react"

const features = [
  {
    icon: Braces,
    title: "JSON Formatter",
    description: "Format, validate and beautify JSON data with syntax highlighting and error detection.",
  },
  {
    icon: Globe,
    title: "API Tester",
    description: "Test REST APIs with custom headers, authentication, and request payloads.",
  },
  {
    icon: ImageIcon,
    title: "Image Tools",
    description: "Convert between formats, generate QR codes, and extract colors from images.",
  },
  {
    icon: Code,
    title: "Code Beautifier",
    description: "Format and beautify HTML, CSS, JavaScript, and other programming languages.",
  },
  {
    icon: Table,
    title: "Excel Tools",
    description: "Convert CSV to Excel, generate mock data, and manipulate spreadsheet files.",
  },
  {
    icon: Key,
    title: "Password Generator",
    description: "Generate secure passwords with customizable length and character sets.",
  },
  {
    icon: Network,
    title: "IP/DNS Tools",
    description: "Lookup IP addresses, DNS records, and perform network diagnostics.",
  },
  {
    icon: Shuffle,
    title: "UUID Generator",
    description: "Generate unique identifiers in various formats including UUID v4 and v5.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Everything You Need in One Place</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive suite of developer tools designed to boost your productivity and streamline your workflow.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="p-4 md:p-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <CardTitle className="text-base md:text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <CardDescription className="text-xs md:text-sm leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
