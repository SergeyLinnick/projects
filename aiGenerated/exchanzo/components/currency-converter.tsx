"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CurrencyConverter() {
  const [fromAmount, setFromAmount] = useState("1000")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [convertedAmount, setConvertedAmount] = useState("935.47")

  const handleConvert = () => {
    // Mock conversion logic
    const amount = Number.parseFloat(fromAmount) || 0
    const rate = 0.93547 // Mock USD to EUR rate
    setConvertedAmount((amount * rate).toFixed(2))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Convert Currency</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">From</label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="flex-1"
                />
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger className="w-20">
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
            </div>

            <div className="flex justify-center">
              <span className="text-lg font-medium text-gray-500">=</span>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">To</label>
              <div className="flex space-x-2">
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="text" value={convertedAmount} readOnly className="flex-1 bg-gray-50" />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={handleConvert} className="px-8">
              Convert
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
