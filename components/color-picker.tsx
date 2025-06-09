"use client"

import * as React from "react"
import { Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const colors = [
  { name: "Blue", value: "blue", class: "221 83% 53%" },
  { name: "Red", value: "red", class: "0 84% 60%" },
  { name: "Pink", value: "pink", class: "330 81% 60%" },
  { name: "Yellow", value: "yellow", class: "48 96% 53%" },
  { name: "Green", value: "green", class: "142 71% 45%" },
  { name: "Violet", value: "violet", class: "262 83% 58%" },
  { name: "Orange", value: "orange", class: "25 95% 53%" },
]

export function ColorPicker() {
  const [selectedColor, setSelectedColor] = React.useState("blue")

  React.useEffect(() => {
    const root = document.documentElement
    const color = colors.find((c) => c.value === selectedColor)
    if (color) {
      root.style.setProperty("--primary", color.class)
    }
  }, [selectedColor])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="transition-all hover:scale-105">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change color theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {colors.map((color) => (
          <DropdownMenuItem
            key={color.value}
            onClick={() => setSelectedColor(color.value)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div
              className="w-4 h-4 rounded-full border-2 border-border"
              style={{ backgroundColor: `hsl(${color.class})` }}
            />
            <span>{color.name}</span>
            {selectedColor === color.value && <span className="ml-auto">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
