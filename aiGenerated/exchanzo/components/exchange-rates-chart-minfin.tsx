"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine, Legend } from "recharts"
import { RefreshCw, TrendingUp, TrendingDown, Building2 } from "lucide-react"
import { getMinfinHistoricalRates, getMinfinCurrencyInfo, type MinfinHistoricalData } from "@/lib/minfin-api"

export function ExchangeRatesChartMinfin() {
  const [chartData, setChartData] = useState<MinfinHistoricalData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCurrency, setSelectedCurrency] = useState("USD")
  const [selectedPeriod, setSelectedPeriod] = useState("7")
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      let days: number
      if (selectedPeriod === "all") {
        days = 365 // Minfin has limited historical data
      } else {
        days = Number.parseInt(selectedPeriod)
      }

      const data = await getMinfinHistoricalRates(selectedCurrency, days)
      setChartData(data)
    } catch (error) {
      console.error("Failed to fetch Minfin historical data:", error)
      setError("Failed to load commercial exchange rate data. Please try again.")
      setChartData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [selectedCurrency, selectedPeriod])

  const currencyInfo = getMinfinCurrencyInfo(selectedCurrency)
  const currentRate = chartData.length > 0 ? chartData[chartData.length - 1]?.avg : 0
  const previousRate = chartData.length > 1 ? chartData[chartData.length - 2]?.avg : 0
  const rateChange = currentRate && previousRate ? currentRate - previousRate : 0
  const rateChangePercent = previousRate ? (rateChange / previousRate) * 100 : 0

  if (loading) {
    return (
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-green-600" />
            <span>Commercial Rates</span>
            <span className="text-sm font-normal text-gray-500">(Minfin)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-6 h-6 animate-spin text-green-600" />
              <span className="text-gray-600">Loading commercial data...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-green-600" />
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Commercial Rates</CardTitle>
            <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
              Minfin Market
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">
                  <span className="flex items-center gap-2">🇺🇸 USD/UAH</span>
                </SelectItem>
                <SelectItem value="EUR">
                  <span className="flex items-center gap-2">🇪🇺 EUR/UAH</span>
                </SelectItem>
                <SelectItem value="PLN">
                  <span className="flex items-center gap-2">🇵🇱 PLN/UAH</span>
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 day</SelectItem>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="14">2 weeks</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Current Rate Display */}
        {chartData.length > 0 && (
          <div className="flex items-center gap-6 mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div>
              <div className="text-sm text-green-700 dark:text-green-300">Average Market Rate</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentRate.toFixed(2)} {currencyInfo?.symbol || "UAH"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {rateChange > 0 ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : rateChange < 0 ? (
                <TrendingDown className="w-5 h-5 text-red-600" />
              ) : null}
              <div
                className={`text-sm ${rateChange > 0 ? "text-green-600" : rateChange < 0 ? "text-red-600" : "text-gray-500"}`}
              >
                {rateChange > 0 ? "+" : ""}
                {rateChange.toFixed(3)} ({rateChangePercent > 0 ? "+" : ""}
                {rateChangePercent.toFixed(2)}%)
              </div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {chartData.length} data points • Commercial banks & exchangers
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-red-600 mb-2">{error}</div>
            <Button variant="outline" onClick={fetchData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        ) : chartData.length > 0 ? (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="formattedDate"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  interval={chartData.length > 50 ? "preserveStartEnd" : 0}
                  angle={chartData.length > 30 ? -45 : 0}
                  textAnchor={chartData.length > 30 ? "end" : "middle"}
                  height={chartData.length > 30 ? 60 : 30}
                />
                <YAxis
                  domain={["dataMin - 0.5", "dataMax + 0.5"]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  tickFormatter={(value) => value.toFixed(2)}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    color: "var(--foreground)",
                  }}
                  formatter={(value: number, name: string) => [
                    `${value.toFixed(4)} UAH`,
                    name === "buy" ? "Buy Rate" : name === "sale" ? "Sell Rate" : "Average Rate",
                  ]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="buy"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                  name="Buy Rate"
                  strokeDasharray="5 5"
                />
                <Line
                  type="monotone"
                  dataKey="sale"
                  stroke="#EF4444"
                  strokeWidth={2}
                  dot={false}
                  name="Sell Rate"
                  strokeDasharray="5 5"
                />
                <Line
                  type="monotone"
                  dataKey="avg"
                  stroke="#059669"
                  strokeWidth={3}
                  dot={false}
                  name="Average"
                  activeDot={{ r: 4, fill: "#059669" }}
                />
                {/* Average line */}
                {chartData.length > 0 && (
                  <ReferenceLine
                    y={chartData.reduce((sum, item) => sum + item.avg, 0) / chartData.length}
                    stroke="#9CA3AF"
                    strokeDasharray="3 3"
                    label={{ value: "Period Average", position: "topRight" }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            No commercial data available for the selected period
          </div>
        )}
      </CardContent>
    </Card>
  )
}
