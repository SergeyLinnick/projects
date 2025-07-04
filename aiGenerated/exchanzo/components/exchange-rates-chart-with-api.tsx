"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { getHistoricalRates, type HistoricalData } from "@/lib/currency-api"

export function ExchangeRatesChartWithAPI() {
  const [chartData, setChartData] = useState<HistoricalData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBank, setSelectedBank] = useState("National Bank")
  const [selectedPeriod, setSelectedPeriod] = useState("Last 50 days")

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const data = await getHistoricalRates("USD", "EUR", 50)
        setChartData(data)
      } catch (error) {
        console.error("Failed to fetch historical data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedPeriod])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Exchange Rates</CardTitle>
          <div className="flex items-center space-x-4">
            <Select value={selectedBank} onValueChange={setSelectedBank}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="National Bank">National Bank</SelectItem>
                <SelectItem value="Central Bank">Central Bank</SelectItem>
                <SelectItem value="Commercial Bank">Commercial Bank</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Last 7 days">Last 7 days</SelectItem>
                <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                <SelectItem value="Last 50 days">Last 50 days</SelectItem>
                <SelectItem value="Last 90 days">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                }
              />
              <YAxis
                domain={["dataMin - 0.01", "dataMax + 0.01"]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
              />
              <Line type="monotone" dataKey="rate" stroke="#3B82F6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
