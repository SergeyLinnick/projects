"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowRightLeft, RefreshCw, Calculator } from "lucide-react"
import {
  getNBUCurrentRates,
  convertWithNBURates,
  getCurrencyInfo,
  SUPPORTED_CURRENCIES,
  type ProcessedRate,
} from "@/lib/nbu-api"

export function CurrencyConverterNBU() {
  const [fromAmount, setFromAmount] = useState("1000")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("UAH")
  const [convertedAmount, setConvertedAmount] = useState("")
  const [exchangeRate, setExchangeRate] = useState<number>(0)
  const [nbuRates, setNbuRates] = useState<ProcessedRate[]>([])
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const fetchRates = async () => {
    try {
      setLoading(true)
      setError(null)
      const rates = await getNBUCurrentRates()
      setNbuRates(rates)
      if (rates.length > 0) {
        setLastUpdated(rates[0].date)
      }
    } catch (error) {
      console.error("Failed to fetch NBU rates:", error)
      setError("Failed to load exchange rates")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRates()
  }, [])

  const handleConvert = () => {
    if (!fromAmount || nbuRates.length === 0) return

    const amount = Number.parseFloat(fromAmount)
    if (isNaN(amount) || amount <= 0) {
      setConvertedAmount("")
      setExchangeRate(0)
      return
    }

    const { result, rate } = convertWithNBURates(amount, fromCurrency, toCurrency, nbuRates)
    setConvertedAmount(result.toFixed(2))
    setExchangeRate(rate)
  }

  const handleSwapCurrencies = () => {
    const tempCurrency = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(tempCurrency)

    // Also swap amounts if there's a converted amount
    if (convertedAmount) {
      setFromAmount(convertedAmount)
      setConvertedAmount(fromAmount)
    }
  }

  const fromCurrencyInfo = getCurrencyInfo(fromCurrency)
  const toCurrencyInfo = getCurrencyInfo(toCurrency)

  // Auto-convert when inputs change
  useEffect(() => {
    if (fromAmount && nbuRates.length > 0) {
      handleConvert()
    }
  }, [fromAmount, fromCurrency, toCurrency, nbuRates])

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calculator className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-xl font-semibold">Currency Converter</CardTitle>
            <Badge variant="secondary">NBU Official</Badge>
          </div>
          <div className="flex items-center gap-2">
            {lastUpdated && <span className="text-sm text-gray-500">Updated: {lastUpdated}</span>}
            <Button variant="outline" size="sm" onClick={fetchRates} disabled={loading}>
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            {/* From Currency */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">From</label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="flex-1"
                  placeholder="Amount"
                  min="0"
                  step="0.01"
                />
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_CURRENCIES.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <span className="flex items-center gap-2">
                          <span>{currency.flag}</span>
                          <span>{currency.code}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {fromCurrencyInfo && (
                <div className="text-xs text-gray-500">
                  {fromCurrencyInfo.name} ({fromCurrencyInfo.symbol})
                </div>
              )}
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSwapCurrencies}
                className="rounded-full p-2 bg-transparent"
                title="Swap currencies"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </Button>
            </div>

            {/* To Currency */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">To</label>
              <div className="flex space-x-2">
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_CURRENCIES.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <span className="flex items-center gap-2">
                          <span>{currency.flag}</span>
                          <span>{currency.code}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  value={convertedAmount}
                  readOnly
                  className="flex-1 bg-gray-50 font-mono"
                  placeholder="Converted amount"
                />
              </div>
              {toCurrencyInfo && (
                <div className="text-xs text-gray-500">
                  {toCurrencyInfo.name} ({toCurrencyInfo.symbol})
                </div>
              )}
            </div>
          </div>

          {/* Exchange Rate Info */}
          {exchangeRate > 0 && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <div className="font-medium">Exchange Rate</div>
                <div className="mt-1">
                  1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                </div>
                {exchangeRate !== 0 && (
                  <div className="text-xs mt-1 opacity-75">
                    1 {toCurrency} = {(1 / exchangeRate).toFixed(4)} {fromCurrency}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Convert Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleConvert}
              disabled={loading || nbuRates.length === 0 || !fromAmount}
              className="px-8"
              size="lg"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Loading rates...
                </>
              ) : (
                <>
                  <Calculator className="w-4 h-4 mr-2" />
                  Convert
                </>
              )}
            </Button>
          </div>

          {nbuRates.length === 0 && !loading && (
            <div className="text-center text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              Failed to load NBU exchange rates. Please refresh to try again.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
