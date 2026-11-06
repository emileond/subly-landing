import { TOOLS_BY_ID, type Plan, type PricedTool } from '@/lib/tool-prices'

/**
 * A stack as lines of tools, plans and seats, shared by the stack calculator and the stack
 * builder, and its compact form in the page address (#s=…) so a link opens the same stack.
 */
/** One line of the stack: a known tool on one of its plans, or something typed in */
export type Line =
  | { key: number; id: string; plan: number; seats: number; yearly: boolean }
  | { key: number; custom: string; amount: number; yearly: boolean }

let lastKey = 0
export const nextKey = () => ++lastKey

export const money = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: amount >= 100 ? 0 : 2 }).format(amount)

export const usablePlans = (tool: PricedTool) => tool.plans.filter((p) => p.price != null || p.yearlyPrice != null)

/** Billed yearly: chosen, or the only way the plan is sold */
export const billedYearly = (plan: Plan, chosen: boolean) => plan.yearlyPrice != null && (chosen || plan.price == null)
/** Monthly and yearly billing both exist, so there is a choice to show */
export const hasChoice = (plan: Plan) => plan.price != null && plan.yearlyPrice != null
/** The plan's price a month on the billing in use */
export const perMonthPrice = (plan: Plan, chosenYearly: boolean) => (billedYearly(plan, chosenYearly) ? plan.yearlyPrice! : (plan.price ?? 0))

/** What a line costs a month, and what paying yearly would save a year */
export function cost(line: Line) {
  if ('custom' in line) return { monthly: line.yearly ? line.amount / 12 : line.amount, saving: 0 }
  const tool = TOOLS_BY_ID[line.id]
  const plan = tool && usablePlans(tool)[line.plan]
  if (!plan) return { monthly: 0, saving: 0 }
  const seats = plan.perSeat ? Math.max(1, line.seats) : 1
  const perMonth = perMonthPrice(plan, line.yearly)
  const saving = hasChoice(plan) && !line.yearly ? ((plan.price ?? 0) - plan.yearlyPrice!) * seats * 12 : 0
  return { monthly: perMonth * seats, saving }
}

// The stack in the address (#s=…), so a link shows the same stack: no account, nothing stored
export function encode(lines: Line[], team: number) {
  const compact = lines.map((l) => ('custom' in l ? { c: l.custom, a: l.amount, y: l.yearly ? 1 : 0 } : { i: l.id, p: l.plan, s: l.seats, y: l.yearly ? 1 : 0 }))
  return btoa(unescape(encodeURIComponent(JSON.stringify({ l: compact, t: team })))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decode(hash: string): { lines: Line[]; team: number } | null {
  try {
    const raw = JSON.parse(decodeURIComponent(escape(atob(hash.replace(/-/g, '+').replace(/_/g, '/')))))
    const lines: Line[] = (Array.isArray(raw.l) ? raw.l : [])
      .slice(0, 100)
      .map((l: Record<string, unknown>): Line | null => {
        if (typeof l.i === 'string' && TOOLS_BY_ID[l.i]) return { key: nextKey(), id: l.i, plan: Number(l.p) || 0, seats: Math.max(1, Math.min(10000, Number(l.s) || 1)), yearly: !!l.y }
        if (typeof l.c === 'string' && l.c.trim()) return { key: nextKey(), custom: l.c.slice(0, 80), amount: Math.max(0, Number(l.a) || 0), yearly: !!l.y }
        return null
      })
      .filter(Boolean)
    return { lines, team: Math.max(0, Math.min(10000, Number(raw.t) || 0)) }
  } catch {
    return null
  }
}

