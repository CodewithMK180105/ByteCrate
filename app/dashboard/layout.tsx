"use client"

import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Navbar } from "@/components/navbar"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useState, useEffect } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Calculate the left margin based on sidebar state
  const getMainContentMargin = () => {
    if (!isMounted) return "ml-0" // Default during SSR
    if (isMobile) return "ml-0" // No margin on mobile (sidebar is overlay)
    return sidebarCollapsed ? "ml-16" : "ml-64" // Margin based on sidebar width
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex relative">
        <DashboardSidebar collapsed={sidebarCollapsed} onCollapsedChange={setSidebarCollapsed} />
        <main className={`flex-1 transition-all duration-300 ${getMainContentMargin()}`}>
          <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
            <div className="animate-in fade-in-50 duration-300">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
