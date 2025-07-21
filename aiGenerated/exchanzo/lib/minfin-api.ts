// Minfin API client for commercial exchange rates
const MINFIN_BASE_URL = "https://api.minfin.com.ua"

export interface MinfinRate {
  id: string
  currency: string
  buy: number
  sale: number
  date: string
  source_name: string
  source_id: number
}

export interface MinfinHistoricalRate {
  date: string
  buy: number
  sale: number
  avg: number
}

export interface ProcessedMinfinRate {
  currency: string
  buy: number
  sale: number
  avg: number
  date: string
  source: string
  change?: number
  changePercent?: number
}

export interface MinfinHistoricalData {
  date: string
  buy: number
  sale: number
  avg: number
  formattedDate: string
}

// Supported currencies for Minfin API
export const MINFIN_CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", flag: "🇷🇺" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł", flag: "🇵🇱" },
]

// Get current commercial exchange rates from Minfin
export async function getMinfinCurrentRates(): Promise<ProcessedMinfinRate[]> {
  try {
    const response = await fetch(`${MINFIN_BASE_URL}/mb/currencyrate/`, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 1800 }, // Cache for 30 minutes
    })

    if (!response.ok) {
      throw new Error(`Minfin API error: ${response.status} ${response.statusText}`)
    }

    const data: MinfinRate[] = await response.json()

    // Group by currency and calculate averages
    const currencyGroups = data.reduce(
      (acc, rate) => {
        if (!acc[rate.currency]) {
          acc[rate.currency] = []
        }
        acc[rate.currency].push(rate)
        return acc
      },
      {} as Record<string, MinfinRate[]>,
    )

    return Object.entries(currencyGroups)
      .filter(([currency]) => MINFIN_CURRENCIES.some((c) => c.code === currency))
      .map(([currency, rates]) => {
        // Calculate average rates from all sources
        const avgBuy = rates.reduce((sum, r) => sum + r.buy, 0) / rates.length
        const avgSale = rates.reduce((sum, r) => sum + r.sale, 0) / rates.length
        const avg = (avgBuy + avgSale) / 2

        return {
          currency,
          buy: avgBuy,
          sale: avgSale,
          avg,
          date: rates[0].date,
          source: `${rates.length} sources`,
        }
      })
      .sort((a, b) => {
        const order = ["USD", "EUR", "PLN", "RUB"]
        const aIndex = order.indexOf(a.currency)
        const bIndex = order.indexOf(b.currency)

        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
        if (aIndex !== -1) return -1
        if (bIndex !== -1) return 1
        return a.currency.localeCompare(b.currency)
      })
  } catch (error) {
    console.error("Failed to fetch Minfin rates:", error)
    throw new Error("Unable to fetch commercial exchange rates from Minfin")
  }
}

// Get historical rates for a specific currency from Minfin
export async function getMinfinHistoricalRates(currencyCode: string, days = 30): Promise<MinfinHistoricalData[]> {
  try {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const response = await fetch(
      `${MINFIN_BASE_URL}/mb/currencyrate/history/?currency=${currencyCode}&start_date=${formatDateForMinfin(startDate)}&end_date=${formatDateForMinfin(endDate)}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Minfin API error: ${response.status}`)
    }

    const data: MinfinHistoricalRate[] = await response.json()

    return data
      .map((item) => ({
        date: item.date,
        buy: item.buy,
        sale: item.sale,
        avg: item.avg,
        formattedDate: formatDateForChart(new Date(item.date)),
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
  } catch (error) {
    console.error("Failed to fetch Minfin historical data:", error)
    throw new Error("Unable to fetch historical commercial rates")
  }
}

// Convert currency using Minfin rates (using average rates)
export function convertWithMinfinRates(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: ProcessedMinfinRate[],
  useType: "buy" | "sale" | "avg" = "avg",
): { result: number; rate: number } {
  if (amount <= 0) return { result: 0, rate: 0 }

  // If converting from UAH
  if (fromCurrency === "UAH") {
    if (toCurrency === "UAH") return { result: amount, rate: 1 }
    const toRate = rates.find((r) => r.currency === toCurrency)
    if (!toRate) return { result: 0, rate: 0 }

    const rate = useType === "buy" ? toRate.buy : useType === "sale" ? toRate.sale : toRate.avg
    const result = amount / rate
    return { result, rate: 1 / rate }
  }

  // If converting to UAH
  if (toCurrency === "UAH") {
    const fromRate = rates.find((r) => r.currency === fromCurrency)
    if (!fromRate) return { result: 0, rate: 0 }

    const rate = useType === "buy" ? fromRate.buy : useType === "sale" ? fromRate.sale : fromRate.avg
    const result = amount * rate
    return { result, rate }
  }

  // Converting between two foreign currencies (via UAH)
  const fromRate = rates.find((r) => r.currency === fromCurrency)
  const toRate = rates.find((r) => r.currency === toCurrency)

  if (!fromRate || !toRate) return { result: 0, rate: 0 }

  const fromRateValue = useType === "buy" ? fromRate.buy : useType === "sale" ? fromRate.sale : fromRate.avg
  const toRateValue = useType === "buy" ? toRate.buy : useType === "sale" ? toRate.sale : toRate.avg

  const uahAmount = amount * fromRateValue
  const result = uahAmount / toRateValue
  const rate = fromRateValue / toRateValue

  return { result, rate }
}

// Helper functions
function formatDateForMinfin(date: Date): string {
  return date.toISOString().split("T")[0] // YYYY-MM-DD format
}

function formatDateForChart(date: Date): string {
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays <= 30) {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  } else if (diffDays <= 365) {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  } else {
    return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
  }
}

// Get major currency pairs for Minfin
export function getMinfinMajorPairs(rates: ProcessedMinfinRate[]): ProcessedMinfinRate[] {
  const majorCurrencies = ["USD", "EUR", "PLN"]
  return rates.filter((rate) => majorCurrencies.includes(rate.currency))
}

// Get currency info by code for Minfin
export function getMinfinCurrencyInfo(code: string) {
  return MINFIN_CURRENCIES.find((curr) => curr.code === code)
}

// Calculate rate change for Minfin rates
export function calculateMinfinRateChange(
  currentRate: number,
  previousRate: number,
): {
  change: number
  changePercent: number
  trend: "up" | "down" | "neutral"
} {
  if (!previousRate || previousRate === 0) {
    return { change: 0, changePercent: 0, trend: "neutral" }
  }

  const change = currentRate - previousRate
  const changePercent = (change / previousRate) * 100
  const trend = change > 0 ? "up" : change < 0 ? "down" : "neutral"

  return { change, changePercent, trend }
}
