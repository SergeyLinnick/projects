"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from "recharts"
import { RefreshCw, TrendingUp, TrendingDown } from "lucide-react"
import { getNBUHistoricalRates, getCurrencyInfo, type HistoricalData } from "@/lib/nbu-api"

export function ExchangeRatesChartNBU() {
  const [chartData, setChartData] = useState<HistoricalData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCurrency, setSelectedCurrency] = useState("USD")
  const [selectedPeriod, setSelectedPeriod] = useState("30")
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const days = Number.parseInt(selectedPeriod)
      const data = await getNBUHistoricalRates(selectedCurrency, days)
      setChartData(data)
    } catch (error) {
      console.error("Failed to fetch NBU historical data:", error)
      setError("Failed to load exchange rate data. Please try again.")
      setChartData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [selectedCurrency, selectedPeriod])

  const currencyInfo = getCurrencyInfo(selectedCurrency)
  const currentRate = chartData.length > 0 ? chartData[chartData.length - 1]?.rate : 0
  const previousRate = chartData.length > 1 ? chartData[chartData.length - 2]?.rate : 0
  const rateChange = currentRate && previousRate ? currentRate - previousRate : 0
  const rateChangePercent = previousRate ? (rateChange / previousRate) * 100 : 0

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <span>Exchange Rates</span>
            <span className="text-sm font-normal text-gray-500">(NBU)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
              <span className="text-gray-600">Loading NBU data...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl font-semibold">Exchange Rates</CardTitle>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">NBU Official</span>
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
                <SelectItem value="GBP">
                  <span className="flex items-center gap-2">🇬🇧 GBP/UAH</span>
                </SelectItem>
                <SelectItem value="PLN">
                  <span className="flex items-center gap-2">🇵🇱 PLN/UAH</span>
                </SelectItem>
                <SelectItem value="CHF">
                  <span className="flex items-center gap-2">🇨🇭 CHF/UAH</span>
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="14">2 weeks</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="60">60 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Current Rate Display */}
        {chartData.length > 0 && (
          <div className="flex items-center gap-6 mt-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="text-sm text-gray-600">Current Rate</div>
              <div className="text-2xl font-bold text-gray-900">
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
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value: number) => [`${value.toFixed(4)} UAH`, `${selectedCurrency}/UAH`]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "#3B82F6" }}
                />
                {/* Average line */}
                {chartData.length > 0 && (
                  <ReferenceLine
                    y={chartData.reduce((sum, item) => sum + item.rate, 0) / chartData.length}
                    stroke="#9CA3AF"
                    strokeDasharray="5 5"
                    label={{ value: "Average", position: "topRight" }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500">
            No data available for the selected period
          </div>
        )}
      </CardContent>
    </Card>
  )
}
