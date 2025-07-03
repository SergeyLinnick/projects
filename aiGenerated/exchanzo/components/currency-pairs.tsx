"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

const currencyPairs = [
  {
    pair: "USD/EUR",
    rate: "1.10",
    change: "+0.02",
    changeType: "positive",
    base: "1 EUR",
  },
  {
    pair: "USD/GBP",
    rate: "0.80",
    change: "+0.04",
    changeType: "positive",
    base: "1 GBP",
  },
  {
    pair: "EUR/UAH",
    rate: "41.20",
    change: "-0.3",
    changeType: "negative",
    base: "1 UAH",
  },
]

export function CurrencyPairs() {
  return (
    <div className="space-y-4">
      {currencyPairs.map((pair) => (
        <Card key={pair.pair} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">{pair.pair}</div>
                <div className="text-2xl font-bold text-gray-900">{pair.rate}</div>
              </div>
              <div className="text-right">
                <div
                  className={`flex items-center space-x-1 ${
                    pair.changeType === "positive" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {pair.changeType === "positive" ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="font-medium">{pair.change}</span>
                </div>
                <div className="text-sm text-gray-500">{pair.base}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
