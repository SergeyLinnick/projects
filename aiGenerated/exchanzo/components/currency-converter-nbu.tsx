"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowRightLeft, RefreshCw, Calculator, Copy, Share2, History, Check, X } from "lucide-react"
import {
  getNBUCurrentRates,
  convertWithNBURates,
  getCurrencyInfo,
  SUPPORTED_CURRENCIES,
  type ProcessedRate,
} from "@/lib/nbu-api"

interface ConversionHistory {
  id: string
  fromAmount: string
  fromCurrency: string
  toCurrency: string
  result: string
  rate: number
  timestamp: Date
}

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
  const [conversionHistory, setConversionHistory] = useState<ConversionHistory[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [shareSuccess, setShareSuccess] = useState(false)

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("exchanzo-conversion-history")
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }))
        setConversionHistory(parsed)
      } catch (error) {
        console.error("Failed to load conversion history:", error)
      }
    }
  }, [])

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (conversionHistory.length > 0) {
      localStorage.setItem("exchanzo-conversion-history", JSON.stringify(conversionHistory))
    }
  }, [conversionHistory])

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

  const handleSaveToHistory = () => {
    if (!fromAmount || !convertedAmount || nbuRates.length === 0) return

    const amount = Number.parseFloat(fromAmount)
    if (isNaN(amount) || amount <= 0) return

    // Add to conversion history
    const newConversion: ConversionHistory = {
      id: Date.now().toString(),
      fromAmount,
      fromCurrency,
      toCurrency,
      result: convertedAmount,
      rate: exchangeRate,
      timestamp: new Date(),
    }

    setConversionHistory((prev) => [newConversion, ...prev.slice(0, 19)]) // Keep last 20 conversions
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

  const copyResult = async () => {
    if (convertedAmount) {
      try {
        const textToCopy = `${fromAmount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`
        await navigator.clipboard.writeText(textToCopy)
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      } catch (error) {
        console.error("Failed to copy:", error)
      }
    }
  }

  const shareConversion = async () => {
    if (convertedAmount) {
      const shareData = {
        title: "Currency Conversion - Exchanzo",
        text: `${fromAmount} ${fromCurrency} = ${convertedAmount} ${toCurrency}\nNBU Rate: ${exchangeRate.toFixed(4)}\nConverted on Exchanzo`,
        url: window.location.href,
      }

      try {
        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
          await navigator.share(shareData)
          setShareSuccess(true)
          setTimeout(() => setShareSuccess(false), 2000)
        } else {
          // Fallback: copy to clipboard
          await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`)
          setCopySuccess(true)
          setTimeout(() => setCopySuccess(false), 2000)
        }
      } catch (error) {
        console.error("Failed to share:", error)
      }
    }
  }

  const clearHistory = () => {
    setConversionHistory([])
    localStorage.removeItem("exchanzo-conversion-history")
  }

  const removeHistoryItem = (id: string) => {
    setConversionHistory((prev) => prev.filter((item) => item.id !== id))
  }

  const loadFromHistory = (conversion: ConversionHistory) => {
    setFromAmount(conversion.fromAmount)
    setFromCurrency(conversion.fromCurrency)
    setToCurrency(conversion.toCurrency)
    setShowHistory(false)
  }

  const fromCurrencyInfo = getCurrencyInfo(fromCurrency)
  const toCurrencyInfo = getCurrencyInfo(toCurrency)

  // Auto-convert when inputs change (but don't add to history)
  useEffect(() => {
    if (fromAmount && nbuRates.length > 0) {
      const amount = Number.parseFloat(fromAmount)
      if (!isNaN(amount) && amount > 0) {
        const { result, rate } = convertWithNBURates(amount, fromCurrency, toCurrency, nbuRates)
        setConvertedAmount(result.toFixed(2))
        setExchangeRate(rate)
      } else {
        setConvertedAmount("")
        setExchangeRate(0)
      }
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
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
              {error}
            </div>
          )}

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
                <div className="text-xs text-gray-500 dark:text-gray-400">
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
                className="rounded-full p-2 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700"
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
                  className="flex-1 bg-gray-50 dark:bg-gray-700 font-mono"
                  placeholder="Converted amount"
                />
              </div>
              {toCurrencyInfo && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {toCurrencyInfo.name} ({toCurrencyInfo.symbol})
                </div>
              )}
            </div>
          </div>

          {/* Auto-conversion notice */}
          <div className="text-center text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded">
            💡 Conversion updates automatically as you type
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

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 flex-wrap">
            <Button
              onClick={handleSaveToHistory}
              disabled={loading || nbuRates.length === 0 || !fromAmount || !convertedAmount}
              className="px-6"
              size="lg"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Save to History
            </Button>

            {convertedAmount && (
              <>
                <Button variant="outline" onClick={copyResult} title="Copy result" className="relative bg-transparent">
                  {copySuccess ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </Button>

                <Button
                  variant="outline"
                  onClick={shareConversion}
                  title="Share conversion"
                  className="relative bg-transparent"
                >
                  {shareSuccess ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
                </Button>
              </>
            )}

            <Button
              variant="outline"
              onClick={() => setShowHistory(!showHistory)}
              title="View conversion history"
              className="relative"
            >
              <History className="w-4 h-4" />
              {conversionHistory.length > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                  {conversionHistory.length}
                </Badge>
              )}
            </Button>
          </div>

          {/* Conversion History */}
          {showHistory && (
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">
                  Recent Conversions ({conversionHistory.length})
                </h4>
                {conversionHistory.length > 0 && (
                  <Button variant="outline" size="sm" onClick={clearHistory} className="text-xs bg-transparent">
                    Clear All
                  </Button>
                )}
              </div>

              {conversionHistory.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                  No conversions saved yet. Click "Save to History" to start tracking your conversions.
                </div>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
                  {conversionHistory.map((conversion) => (
                    <div
                      key={conversion.id}
                      className="flex justify-between items-center text-sm p-3 bg-white dark:bg-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors group"
                    >
                      <div
                        className="flex-1 cursor-pointer"
                        onClick={() => loadFromHistory(conversion)}
                        title="Click to load this conversion"
                      >
                        <div className="font-medium">
                          {conversion.fromAmount} {conversion.fromCurrency} → {conversion.result}{" "}
                          {conversion.toCurrency}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Rate: {conversion.rate.toFixed(4)} • {conversion.timestamp.toLocaleString()}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeHistoryItem(conversion.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                        title="Remove from history"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {nbuRates.length === 0 && !loading && (
            <div className="text-center text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
              Failed to load NBU exchange rates. Please refresh to try again.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
