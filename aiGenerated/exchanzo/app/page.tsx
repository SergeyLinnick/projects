"use client"
import { Header } from "@/components/header"
import { ExchangeRatesChart } from "@/components/exchange-rates-chart"
import { CurrencyConverter } from "@/components/currency-converter"
import { CurrencyPairs } from "@/components/currency-pairs"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts and Converter */}
          <div className="lg:col-span-2 space-y-6">
            <ExchangeRatesChart />
            <CurrencyConverter />
          </div>

          {/* Right Column - Currency Pairs */}
          <div className="lg:col-span-1">
            <CurrencyPairs />
          </div>
        </div>
      </main>
    </div>
  )
}
