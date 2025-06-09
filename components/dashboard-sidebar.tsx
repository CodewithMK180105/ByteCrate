"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  LayoutDashboard,
  Braces,
  Globe,
  ImageIcon,
  Code,
  Table,
  Key,
  Network,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
]

const tools = [
  {
    name: "JSON Formatter",
    href: "/dashboard/json-formatter",
    icon: Braces,
  },
  {
    name: "API Tester",
    href: "/dashboard/api-tester",
    icon: Globe,
  },
  {
    name: "Image Tools",
    href: "/dashboard/image-tools",
    icon: ImageIcon,
  },
  {
    name: "Code Beautifier",
    href: "/dashboard/code-beautifier",
    icon: Code,
  },
  {
    name: "Excel Tools",
    href: "/dashboard/excel-tools",
    icon: Table,
  },
  {
    name: "Password Generator",
    href: "/dashboard/password-generator",
    icon: Key,
  },
  {
    name: "IP/DNS Tools",
    href: "/dashboard/ip-dns-tools",
    icon: Network,
  },
  {
    name: "UUID Generator",
    href: "/dashboard/uuid-generator",
    icon: Shuffle,
  },
]

interface DashboardSidebarProps {
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

export function DashboardSidebar({ collapsed = false, onCollapsedChange }: DashboardSidebarProps) {
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Handle collapse toggle
  const handleCollapseToggle = () => {
    if (onCollapsedChange) {
      onCollapsedChange(!collapsed)
    }
  }

  // Sidebar content component
  const SidebarContent = ({ isMobileView = false }: { isMobileView?: boolean }) => (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {(!collapsed || isMobileView) && (
          <h2 className="text-lg font-semibold">{isMobileView ? "DevToolkit" : "Navigation"}</h2>
        )}
        {!isMobileView && (
          <Button variant="ghost" size="sm" onClick={handleCollapseToggle} className="h-8 w-8 p-0">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        )}
        {isMobileView && (
          <Button variant="ghost" size="sm" onClick={() => setMobileOpen(false)} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation Content */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-2">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start transition-all duration-200 hover:translate-x-1",
                  collapsed && !isMobileView ? "px-2" : "px-3",
                )}
              >
                <item.icon className={cn("h-4 w-4", collapsed && !isMobileView ? "" : "mr-3")} />
                {(!collapsed || isMobileView) && <span>{item.name}</span>}
              </Button>
            </Link>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          {(!collapsed || isMobileView) && (
            <p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Tools</p>
          )}
          <div className="space-y-1">
            {tools.map((tool) => (
              <Link key={tool.name} href={tool.href}>
                <Button
                  variant={pathname === tool.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start transition-all duration-200 hover:translate-x-1",
                    collapsed && !isMobileView ? "px-2" : "px-3",
                  )}
                  title={collapsed && !isMobileView ? tool.name : undefined}
                >
                  <tool.icon className={cn("h-4 w-4", collapsed && !isMobileView ? "" : "mr-3")} />
                  {(!collapsed || isMobileView) && <span className="truncate">{tool.name}</span>}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )

  if (!isMounted) {
    return null
  }

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div
          className={cn(
            "fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] bg-background border-r transition-all duration-300",
            collapsed ? "w-16" : "w-64",
          )}
        >
          <SidebarContent />
        </div>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <>
          {/* Mobile Sidebar Trigger */}
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Mobile Sidebar Overlay */}
          {mobileOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              {/* Backdrop */}
              <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />

              {/* Sidebar */}
              <div className="fixed left-0 top-0 h-full w-[280px] bg-background border-r shadow-lg animate-in slide-in-from-left duration-300">
                <SidebarContent isMobileView={true} />
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
