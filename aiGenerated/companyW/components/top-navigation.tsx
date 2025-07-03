"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Calendar, Clipboard, MessageSquare, Plus, Bell, MoreHorizontal, Menu } from "lucide-react"

interface TopNavigationProps {
  setSidebarOpen: (open: boolean) => void
}

export function TopNavigation({ setSidebarOpen }: TopNavigationProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search..." className="pl-10 w-64 bg-gray-50 border-gray-200" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar
            <Badge variant="secondary" className="ml-2">
              10
            </Badge>
          </Button>

          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Clipboard className="mr-2 h-4 w-4" />
            Task Board
            <Badge variant="secondary" className="ml-2">
              6
            </Badge>
          </Button>

          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <MessageSquare className="mr-2 h-4 w-4" />
            Messages
            <Badge variant="secondary" className="ml-2">
              12
            </Badge>
          </Button>

          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            New
          </Button>

          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
