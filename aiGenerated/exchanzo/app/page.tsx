"use client"
import { Header } from "@/components/header"
import { ExchangeRatesChartNBU } from "@/components/exchange-rates-chart-nbu"
import { CurrencyConverterNBU } from "@/components/currency-converter-nbu"
import { CurrencyPairsNBU } from "@/components/currency-pairs-nbu"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts and Converter */}
          <div className="lg:col-span-2 space-y-6">
            <ExchangeRatesChartNBU />
            <CurrencyConverterNBU />
          </div>

          {/* Right Column - Currency Pairs */}
          <div className="lg:col-span-1">
            <CurrencyPairsNBU />
          </div>
        </div>
      </main>
    </div>
  )
}
