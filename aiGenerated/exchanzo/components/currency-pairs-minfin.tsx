"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Minus, RefreshCw, Clock, Building2 } from "lucide-react"
import {
  getMinfinCurrentRates,
  getMinfinMajorPairs,
  getMinfinCurrencyInfo,
  calculateMinfinRateChange,
  type ProcessedMinfinRate,
} from "@/lib/minfin-api"

export function CurrencyPairsMinfin() {
  const [rates, setRates] = useState<ProcessedMinfinRate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [previousRates, setPreviousRates] = useState<Record<string, number>>({})
  const [lastUpdated, setLastUpdated] = useState<string>("")

  const fetchRates = async () => {
    try {
      setLoading(true)
      setError(null)

      const allRates = await getMinfinCurrentRates()
      const majorRates = getMinfinMajorPairs(allRates)

      // Store previous rates for comparison
      const prevRates: Record<string, number> = {}
      rates.forEach((rate) => {
        prevRates[rate.currency] = rate.avg
      })
      setPreviousRates(prevRates)

      setRates(majorRates)
      if (majorRates.length > 0) {
        setLastUpdated(majorRates[0].date)
      }
    } catch (error) {
      console.error("Failed to fetch Minfin currency pairs:", error)
      setError("Failed to load commercial rates")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRates()

    // Refresh rates every 15 minutes (commercial rates update more frequently)
    const interval = setInterval(fetchRates, 15 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading && rates.length === 0) {
    return (
      <div className="space-y-4">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
              <RefreshCw className="w-5 h-5 animate-spin text-green-600" />
              Loading Commercial Rates...
            </CardTitle>
          </CardHeader>
        </Card>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-12"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-green-600" />
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Commercial Rates</CardTitle>
              <Badge variant="outline" className="text-xs text-green-700 border-green-200">
                Market
              </Badge>
            </div>
            <Button variant="outline" size="sm" onClick={fetchRates} disabled={loading}>
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
          {lastUpdated && (
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3" />
              <span>Updated: {lastUpdated}</span>
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Error State */}
      {error && (
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="text-center text-red-600">
              <div className="mb-2">{error}</div>
              <Button variant="outline" size="sm" onClick={fetchRates}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Currency Pairs */}
      {rates.map((rate) => {
        const currencyInfo = getMinfinCurrencyInfo(rate.currency)
        const previousRate = previousRates[rate.currency]
        const { change, changePercent, trend } = calculateMinfinRateChange(rate.avg, previousRate)

        return (
          <Card
            key={rate.currency}
            className="hover:shadow-md dark:hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500 dark:bg-gray-800 dark:border-gray-700"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{currencyInfo?.flag || "💱"}</div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      {rate.currency}/UAH
                      {trend !== "neutral" && (
                        <Badge variant={trend === "up" ? "default" : "destructive"} className="text-xs px-1 py-0">
                          {trend === "up" ? "↗" : "↘"}
                        </Badge>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {rate.avg.toFixed(2)}
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">UAH</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 space-x-2">
                      <span className="text-green-600">Buy: {rate.buy.toFixed(2)}</span>
                      <span className="text-red-600">Sell: {rate.sale.toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{rate.source}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`flex items-center space-x-1 justify-end ${
                      trend === "up"
                        ? "text-green-600"
                        : trend === "down"
                          ? "text-red-600"
                          : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {trend === "up" ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : trend === "down" ? (
                      <TrendingDown className="w-4 h-4" />
                    ) : (
                      <Minus className="w-4 h-4" />
                    )}
                    <div className="text-right">
                      <div className="font-medium text-sm">
                        {trend !== "neutral" ? `${change > 0 ? "+" : ""}${change.toFixed(3)}` : "0.000"}
                      </div>
                      <div className="text-xs opacity-75">
                        {trend !== "neutral" ? `${changePercent > 0 ? "+" : ""}${changePercent.toFixed(2)}%` : "0.00%"}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">Avg. Market</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}

      {/* Footer */}
      <div className="text-xs text-gray-400 text-center mt-4 p-2 dark:text-gray-500">
        <div>Commercial rates from banks and exchange offices</div>
        <div className="mt-1">Data provided by Minfin.com.ua</div>
      </div>
    </div>
  )
}
