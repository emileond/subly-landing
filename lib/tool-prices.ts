import data from '@/data/tool-prices.json'

/**
 * List prices for the software small businesses commonly pay for, from each vendor's own
 * pricing page (data/tool-prices.json, with the page and date). Used by the stack tracker and
 * the stack builder. Re-check the prices before they go stale: the date is shown on the page.
 */
export type Plan = { name: string; price: number | null; yearlyPrice?: number | null; currency: string; period: string; perSeat: boolean }
export type PricedTool = { id: string; name: string; website: string; category: string; pricingUrl?: string; plans: Plan[]; notes?: string }

const tools = (data as { checked: string; tools: PricedTool[] }).tools.filter((t) => t.plans.some((p) => p.price != null || p.yearlyPrice != null))

export const PRICED_TOOLS: PricedTool[] = tools
export const TOOLS_BY_ID: Record<string, PricedTool> = Object.fromEntries(tools.map((t) => [t.id, t]))
export const PRICES_CHECKED = new Date(`${(data as { checked: string }).checked}T00:00:00Z`).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', year: 'numeric' })

/** The chips shown before anything is picked */
const POPULAR_IDS = ['google-workspace', 'slack', 'notion', 'figma', 'zoom', 'canva', 'adobe-creative-cloud', 'hubspot', 'github', 'chatgpt', 'claude', '1password']
export const POPULAR: PricedTool[] = POPULAR_IDS.map((id) => TOOLS_BY_ID[id]).filter(Boolean)

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '')

/** Tools whose name or site starts with (or contains) the query, best matches first, without the ones already picked */
export function searchTools(query: string, exclude: string[] = [], limit = 8): PricedTool[] {
  const q = norm(query)
  if (!q) return []
  return tools
    .filter((t) => !exclude.includes(t.id))
    .map((t) => {
      const name = norm(t.name)
      const score = name.startsWith(q) ? 0 : name.includes(q) ? 1 : norm(t.website).includes(q) || norm(t.category).startsWith(q) ? 2 : 3
      return { t, score }
    })
    .filter((x) => x.score < 3)
    .sort((a, b) => a.score - b.score || a.t.name.localeCompare(b.t.name))
    .slice(0, limit)
    .map((x) => x.t)
}
