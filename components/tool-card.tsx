"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"

interface Tool {
  id: string
  name: string
  description: string
  icon: LucideIcon
  category: string
}

interface ToolCardProps {
  tool: Tool
  onClick: () => void
}

export function ToolCard({ tool, onClick }: ToolCardProps) {
  return (
    <Card
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <tool.icon className="h-6 w-6 text-primary" />
          </div>
          <Badge variant="secondary" className="text-xs">
            {tool.category}
          </Badge>
        </div>
        <CardTitle className="text-lg">{tool.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm leading-relaxed">{tool.description}</CardDescription>
      </CardContent>
    </Card>
  )
}
