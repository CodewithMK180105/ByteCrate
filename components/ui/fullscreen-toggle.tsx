"use client"

import { useState, useCallback, type ReactNode } from "react"
import { Maximize2, Minimize2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FullscreenToggleProps {
  children: ReactNode
  className?: string
  contentClassName?: string
  title?: string
}

export function FullscreenToggle({ children, className, contentClassName, title = "Content" }: FullscreenToggleProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev)
  }, [])

  if (!isFullscreen) {
    return (
      <div className={cn("relative", className)}>
        <div className="absolute top-2 right-2 z-10">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={toggleFullscreen}
            title="View fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
            <span className="sr-only">View fullscreen</span>
          </Button>
        </div>
        <div className={contentClassName}>{children}</div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col p-4 md:p-6 animate-in fade-in-0 zoom-in-95">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={toggleFullscreen} title="Exit fullscreen">
            <Minimize2 className="h-4 w-4" />
            <span className="sr-only">Exit fullscreen</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={toggleFullscreen} title="Close">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}
