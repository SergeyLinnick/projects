// NBU (National Bank of Ukraine) API client
const NBU_BASE_URL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange"

export interface NBURate {
  r030: number // Internal code
  txt: string // Currency name
  rate: number // Exchange rate to UAH
  cc: string // Currency code (USD, EUR, etc.)
  exchangedate: string // Date in DD.MM.YYYY format
}

export interface ProcessedRate {
  code: string
  name: string
  rate: number
  date: string
  change?: number
  changePercent?: number
}

export interface HistoricalData {
  date: string
  rate: number
  formattedDate: string
}

export interface CurrencyInfo {
  code: string
  name: string
  symbol: string
  flag: string
}

// Supported currencies with additional info
export const SUPPORTED_CURRENCIES: CurrencyInfo[] = [
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴", flag: "🇺🇦" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł", flag: "🇵🇱" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč", flag: "🇨🇿" },
  { code: "CHF", name: "Swiss Franc", symbol: "₣", flag: "🇨🇭" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
]

// Get current exchange rates from NBU
export async function getNBUCurrentRates(): Promise<ProcessedRate[]> {
  try {
    const response = await fetch(`${NBU_BASE_URL}?json`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`NBU API error: ${response.status} ${response.statusText}`)
    }

    const data: NBURate[] = await response.json()

    return data
      .filter((item) => SUPPORTED_CURRENCIES.some((curr) => curr.code === item.cc))
      .map((item) => ({
        code: item.cc,
        name: item.txt,
        rate: item.rate,
        date: item.exchangedate,
      }))
      .sort((a, b) => {
        // Sort by importance: USD, EUR, GBP, then alphabetically
        const order = ["USD", "EUR", "GBP"]
        const aIndex = order.indexOf(a.code)
        const bIndex = order.indexOf(b.code)

        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
        if (aIndex !== -1) return -1
        if (bIndex !== -1) return 1
        return a.code.localeCompare(b.code)
      })
  } catch (error) {
    console.error("Failed to fetch NBU rates:", error)
    throw new Error("Unable to fetch current exchange rates from NBU")
  }
}

// Get specific currency rate from NBU
export async function getNBUCurrencyRate(currencyCode: string): Promise<ProcessedRate | null> {
  try {
    const response = await fetch(`${NBU_BASE_URL}?valcode=${currencyCode}&json`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`NBU API error: ${response.status}`)
    }

    const data: NBURate[] = await response.json()
    if (data.length === 0) return null

    const item = data[0]
    return {
      code: item.cc,
      name: item.txt,
      rate: item.rate,
      date: item.exchangedate,
    }
  } catch (error) {
    console.error(`Failed to fetch NBU rate for ${currencyCode}:`, error)
    return null
  }
}

// Get historical rates for a specific currency
export async function getNBUHistoricalRates(currencyCode: string, days = 30): Promise<HistoricalData[]> {
  const historicalData: HistoricalData[] = []
  const today = new Date()
  const promises: Promise<void>[] = []

  try {
    // Create array of dates to fetch
    const datesToFetch: Date[] = []
    for (let i = days; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)

      // Skip weekends (NBU doesn't update on weekends)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        datesToFetch.push(date)
      }
    }

    // Batch requests with delay to avoid overwhelming the API
    for (let i = 0; i < datesToFetch.length; i += 5) {
      const batch = datesToFetch.slice(i, i + 5)

      const batchPromises = batch.map(async (date, index) => {
        // Add staggered delay
        await new Promise((resolve) => setTimeout(resolve, index * 200))

        const dateStr = formatDateForNBU(date)

        try {
          const response = await fetch(`${NBU_BASE_URL}?valcode=${currencyCode}&date=${dateStr}&json`)

          if (response.ok) {
            const data: NBURate[] = await response.json()
            if (data.length > 0) {
              historicalData.push({
                date: dateStr,
                rate: data[0].rate,
                formattedDate: formatDateForChart(date),
              })
            }
          }
        } catch (error) {
          console.warn(`Failed to fetch data for ${dateStr}:`, error)
        }
      })

      promises.push(...batchPromises)

      // Wait for batch to complete before starting next batch
      await Promise.all(batchPromises)
    }

    await Promise.all(promises)

    // Sort by date and return
    return historicalData.sort((a, b) => a.date.localeCompare(b.date))
  } catch (error) {
    console.error("Failed to fetch historical NBU data:", error)
    throw new Error("Unable to fetch historical exchange rates")
  }
}

// Convert currency using NBU rates (all rates are relative to UAH)
export function convertWithNBURates(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: ProcessedRate[],
): { result: number; rate: number } {
  if (amount <= 0) return { result: 0, rate: 0 }

  // If converting from UAH
  if (fromCurrency === "UAH") {
    if (toCurrency === "UAH") return { result: amount, rate: 1 }
    const toRate = rates.find((r) => r.code === toCurrency)
    if (!toRate) return { result: 0, rate: 0 }
    const result = amount / toRate.rate
    return { result, rate: 1 / toRate.rate }
  }

  // If converting to UAH
  if (toCurrency === "UAH") {
    const fromRate = rates.find((r) => r.code === fromCurrency)
    if (!fromRate) return { result: 0, rate: 0 }
    const result = amount * fromRate.rate
    return { result, rate: fromRate.rate }
  }

  // Converting between two foreign currencies (via UAH)
  const fromRate = rates.find((r) => r.code === fromCurrency)
  const toRate = rates.find((r) => r.code === toCurrency)

  if (!fromRate || !toRate) return { result: 0, rate: 0 }

  const uahAmount = amount * fromRate.rate
  const result = uahAmount / toRate.rate
  const rate = fromRate.rate / toRate.rate

  return { result, rate }
}

// Helper functions
function formatDateForNBU(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}${month}${day}`
}

function formatDateForChart(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

// Get major currency pairs with UAH
export function getMajorCurrencyPairs(rates: ProcessedRate[]): ProcessedRate[] {
  const majorCurrencies = ["USD", "EUR", "GBP", "PLN"]
  return rates.filter((rate) => majorCurrencies.includes(rate.code))
}

// Get currency info by code
export function getCurrencyInfo(code: string): CurrencyInfo | undefined {
  return SUPPORTED_CURRENCIES.find((curr) => curr.code === code)
}

// Calculate rate change percentage
export function calculateRateChange(
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
