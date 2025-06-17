"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart3,
  Calendar,
  Car,
  Fuel,
  Package,
  FileText,
  AlertTriangle,
  Wrench,
  Clock,
  Users,
  MessageSquare,
  Award,
  TrendingUp,
  BookOpen,
  Shield,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const navigationItems = [
  {
    title: "FIELDS OPS",
    items: [
      { name: "Dashboard", icon: BarChart3, href: "/dashboard" },
      { name: "Technician Timeline", icon: Calendar, href: "/technician-timeline" },
      { name: "Fleet Tracking", icon: Car, href: "/fleet-tracking" },
      { name: "Fuel Management", icon: Fuel, href: "/fuel-management" },
    ],
  },
  {
    title: "ASSETS OPS",
    items: [
      { name: "Assets", icon: Package, href: "/assets", hasSubmenu: true },
      { name: "Inspection Reports", icon: FileText, href: "/inspection-reports" },
      { name: "Reported Issues", icon: AlertTriangle, href: "/reported-issues" },
      { name: "Work Orders", icon: Wrench, href: "/work-orders", hasSubmenu: true },
      { name: "Maintenance Schedules", icon: Clock, href: "/maintenance-schedules" },
    ],
  },
  {
    title: "PEOPLE OPS",
    items: [
      { name: "Employees", icon: Users, href: "/employees" },
      { name: "Communication", icon: MessageSquare, href: "/communication" },
      { name: "Recognition & Rewards", icon: Award, href: "/recognition" },
      { name: "Performance Management", icon: TrendingUp, href: "/performance" },
      { name: "Knowledge Hub", icon: BookOpen, href: "/knowledge" },
      { name: "Compliance Management", icon: Shield, href: "/compliance" },
    ],
  },
]

export function Sidebar({ open, setOpen }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName) ? prev.filter((item) => item !== itemName) : [...prev, itemName],
    )
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Company Header */}
          <div className="bg-blue-600 text-white p-4">
            <h1 className="text-lg font-semibold">Company</h1>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-6">
              {navigationItems.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{section.title}</h3>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <div key={item.name}>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                            item.name === "Assets" && expandedItems.includes(item.name) && "bg-gray-100",
                          )}
                          onClick={() => item.hasSubmenu && toggleExpanded(item.name)}
                        >
                          <item.icon className="mr-3 h-4 w-4" />
                          <span className="flex-1 text-left">{item.name}</span>
                          {item.hasSubmenu &&
                            (expandedItems.includes(item.name) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            ))}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </ScrollArea>

          {/* Settings */}
          <div className="p-3 border-t">
            <Button variant="default" className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
