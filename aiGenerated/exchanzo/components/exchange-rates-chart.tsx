"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

const chartData = [
  { date: "03/30", rate: 1.06 },
  { date: "04/02", rate: 1.065 },
  { date: "04/05", rate: 1.063 },
  { date: "04/08", rate: 1.067 },
  { date: "04/11", rate: 1.072 },
  { date: "04/13", rate: 1.075 },
  { date: "04/16", rate: 1.078 },
  { date: "04/19", rate: 1.082 },
  { date: "04/21", rate: 1.085 },
  { date: "04/24", rate: 1.092 },
  { date: "04/27", rate: 1.1 },
]

export function ExchangeRatesChart() {
  const [selectedBank, setSelectedBank] = useState("National Bank")
  const [selectedPeriod, setSelectedPeriod] = useState("Last 50 days")

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
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
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
