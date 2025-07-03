"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Users,
  SettingsIcon,
  FileText,
  Tags,
  ShapesIcon as Form,
  Shirt,
  HardHat,
  Bell,
  Puzzle,
  Code,
  ChevronLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"

const settingsNavigation = [
  { name: "Business Information", icon: Building2, href: "/settings/business" },
  { name: "Users", icon: Users, href: "/settings/users", active: true },
  { name: "Custom Terminology", icon: SettingsIcon, href: "/settings/terminology" },
  { name: "Custom Fields", icon: FileText, href: "/settings/fields" },
  { name: "Tags", icon: Tags, href: "/settings/tags" },
  { name: "Forms", icon: Form, href: "/settings/forms" },
  { name: "Uniform Catalog", icon: Shirt, href: "/settings/uniform" },
  { name: "PPE Catalog", icon: HardHat, href: "/settings/ppe" },
  { name: "Notification Settings", icon: Bell, href: "/settings/notifications" },
  { name: "Integrations", icon: Puzzle, href: "/settings/integrations" },
  { name: "API", icon: Code, href: "/settings/api" },
]

const users = [
  "Leanne Graham",
  "Ervin Howell",
  "Clementine Bauch",
  "Patricia Lebsack",
  "Chelsey Dietrich",
  "Mrs. Dennis Schulist",
  "Kurtis Weissnat",
  "Nicholas Runolfsdottir V",
  "Glenna Reichert",
  "Clementina DuBuque",
]

export function UsersPage() {
  const [selectedSetting, setSelectedSetting] = useState("Users")

  return (
    <div className="flex h-full">
      {/* Settings Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
        </div>

        <nav className="space-y-1">
          {settingsNavigation.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={cn(
                "w-full justify-start text-gray-700 hover:bg-gray-100",
                item.active && "bg-blue-50 text-blue-700 hover:bg-blue-50",
              )}
              onClick={() => setSelectedSetting(item.name)}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.name}
            </Button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <span>Home</span>
            <ChevronLeft className="h-4 w-4 rotate-180" />
            <span>Add User</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Users</h1>

          <div className="flex items-center space-x-4 mb-6">
            <Button variant="ghost" className="text-gray-600">
              Home
            </Button>
            <Button variant="ghost" className="text-gray-600">
              Add User
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <span className="text-gray-900">{user}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
