import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Globe, ImageIcon, Key, Network, Shuffle, Table, Braces } from "lucide-react"
import Link from "next/link"

const tools = [
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate and beautify JSON, XML, YAML, and Markdown data",
    icon: Braces,
    category: "Text",
    href: "/dashboard/json-formatter",
  },
  {
    id: "api-tester",
    name: "API Tester",
    description: "Test REST APIs with custom headers and payloads",
    icon: Globe,
    category: "Network",
    href: "/dashboard/api-tester",
  },
  {
    id: "image-tools",
    name: "Image Tools",
    description: "Convert, resize and generate QR codes",
    icon: ImageIcon,
    category: "Media",
    href: "/dashboard/image-tools",
  },
  {
    id: "code-beautifier",
    name: "Code Beautifier",
    description: "Format HTML, CSS, JavaScript and more",
    icon: Code,
    category: "Text",
    href: "/dashboard/code-beautifier",
  },
  {
    id: "excel-tools",
    name: "Excel Tools",
    description: "Convert CSV to Excel and generate mock data",
    icon: Table,
    category: "Data",
    href: "/dashboard/excel-tools",
  },
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Generate secure passwords with custom options",
    icon: Key,
    category: "Security",
    href: "/dashboard/password-generator",
  },
  {
    id: "ip-dns-tools",
    name: "IP/DNS Tools",
    description: "Lookup IP addresses and DNS information",
    icon: Network,
    category: "Network",
    href: "/dashboard/ip-dns-tools",
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Generate unique identifiers in various formats",
    icon: Shuffle,
    category: "Utility",
    href: "/dashboard/uuid-generator",
  },
]

export default function DashboardPage() {
  return (
    <div className="w-full space-y-6 md:space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Developer Dashboard</h1>
        <p className="text-muted-foreground">Choose a tool to get started with your development workflow</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {tools.map((tool) => (
          <Link key={tool.id} href={tool.href} className="block">
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
              <CardHeader className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <tool.icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {tool.category}
                  </Badge>
                </div>
                <CardTitle className="text-base md:text-lg group-hover:text-primary transition-colors">
                  {tool.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <CardDescription className="text-xs md:text-sm leading-relaxed">{tool.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
