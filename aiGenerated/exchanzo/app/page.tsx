"use client"
import { Header } from "@/components/header"
import { ExchangeRatesChartNBU } from "@/components/exchange-rates-chart-nbu"
import { ExchangeRatesChartMinfin } from "@/components/exchange-rates-chart-minfin"
import { CurrencyConverterNBU } from "@/components/currency-converter-nbu"
import { CurrencyPairsNBU } from "@/components/currency-pairs-nbu"
import { CurrencyPairsMinfin } from "@/components/currency-pairs-minfin"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Dual Chart Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Left: NBU Official Rates */}
            <div className="space-y-4">
              <ExchangeRatesChartNBU />
              <CurrencyPairsNBU />
            </div>

            {/* Right: Minfin Commercial Rates */}
            <div className="space-y-4">
              <ExchangeRatesChartMinfin />
              <CurrencyPairsMinfin />
            </div>
          </div>

          {/* Currency Converter Section */}
          <div className="max-w-4xl mx-auto">
            <CurrencyConverterNBU />
          </div>
        </div>
      </main>
    </div>
  )
}
