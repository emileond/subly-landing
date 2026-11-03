import rates from '@/data/currencies.json'

// data/currencies.json is rewritten twice a day by .github/workflows/fetch-currencies-data.yml
const data = rates.data as Record<string, { code: string; value: number }>

export const ratesUpdatedAt = rates.meta.last_updated_at

export function convert(amount: number, from: string, to: string): number | null {
  const base = data[from]?.value
  const target = data[to]?.value
  if (!base || !target || !Number.isFinite(amount)) return null
  return parseFloat(((amount / base) * target).toFixed(2))
}

export const hasRate = (cc: string) => cc in data
