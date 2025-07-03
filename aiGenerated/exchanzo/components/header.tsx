"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Settings } from "lucide-react"

export function Header() {
  const [selectedCurrency, setSelectedCurrency] = useState("USD")

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <div className="text-xl font-bold text-gray-900">Exchanzo</div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                History
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Alerts
              </Button>
            </nav>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-gray-600" />
              <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                <SelectTrigger className="w-20 border-none shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="JPY">JPY</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
