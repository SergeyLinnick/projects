"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCurrentRates, convertCurrency, type ExchangeRates } from "@/lib/currency-api"

export function CurrencyConverterWithAPI() {
  const [fromAmount, setFromAmount] = useState("1000")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [convertedAmount, setConvertedAmount] = useState("")
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchRates() {
      try {
        const rates = await getCurrentRates("USD")
        setExchangeRates(rates)
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error)
      }
    }

    fetchRates()
  }, [])

  const handleConvert = () => {
    if (!exchangeRates || !fromAmount) return

    const amount = Number.parseFloat(fromAmount)
    const fromRate = exchangeRates.rates[fromCurrency] || 1
    const toRate = exchangeRates.rates[toCurrency] || 1

    const result = convertCurrency(amount, fromRate, toRate)
    setConvertedAmount(result.toFixed(2))
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
                <Input
                  type="text"
                  value={convertedAmount}
                  readOnly
                  className="flex-1 bg-gray-50"
                  placeholder="Converted amount"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button onClick={handleConvert} disabled={loading} className="px-8">
              {loading ? "Converting..." : "Convert"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
