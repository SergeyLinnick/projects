// API client for currency data
const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY
const BASE_URL = "https://api.exchangerate-api.com/v4"

export interface ExchangeRates {
  base: string
  date: string
  rates: Record<string, number>
}

export interface HistoricalData {
  date: string
  rate: number
}

export async function getCurrentRates(baseCurrency = "USD"): Promise<ExchangeRates> {
  const response = await fetch(`${BASE_URL}/latest/${baseCurrency}`)
  if (!response.ok) {
    throw new Error("Failed to fetch exchange rates")
  }
  return response.json()
}

export async function getHistoricalRates(
  fromCurrency: string,
  toCurrency: string,
  days = 30,
): Promise<HistoricalData[]> {
  // Mock implementation - replace with real API call
  const mockData: HistoricalData[] = []
  const baseRate = 1.1

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    mockData.push({
      date: date.toISOString().split("T")[0],
      rate: baseRate + (Math.random() - 0.5) * 0.1,
    })
  }

  return mockData
}

export function convertCurrency(amount: number, fromRate: number, toRate: number): number {
  return (amount / fromRate) * toRate
}
