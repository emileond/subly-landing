import { APP_URL, SIGNUP_URL } from '@/lib/site'
import { currentSource, send, withSource } from '@/lib/tracking'

/**
 * Sending what a visitor entered in a free tool into Subly. The app stores it for 7 days
 * (POST /api/public/handoff) and returns an id; the signup link carries the id with the visit's
 * source, and after sign-up the welcome step offers the items for review. Someone who already
 * has an account lands on the same review. If the app can't be reached, the visitor still goes
 * to sign-up, just without the items.
 */

export type ToolKind = 'stack' | 'appsumo' | 'runway' | 'builder'

export type ToolItem = {
  name: string
  /** What one charge costs in total (seats already multiplied in) */
  amount: number
  currency?: string
  cadence?: 'week' | 'month' | 'year'
  every?: number
  direction?: 'out' | 'in'
  website?: string
  category?: string
  nextDate?: string
  purchasedOn?: string
  plan?: string
}

export const logoUrl = (website?: string | null) =>
  website ? `https://img.logo.dev/${website.replace(/^https?:\/\//, '').replace(/^www\./, '')}?token=pk_WB761igcRjKR72C3FbRenQ` : null

/** The signup address for this tool, with the visit's source and, when there is one, the handoff id */
export function signupHref(tool: string, handoff?: string) {
  const url = new URL(withSource(SIGNUP_URL, currentSource()))
  // A visitor with no external source still says which tool sent them
  if (!url.searchParams.has('utm_source')) {
    url.searchParams.set('utm_source', 'subly.app')
    url.searchParams.set('utm_medium', 'tool')
    url.searchParams.set('utm_campaign', tool)
  }
  if (handoff) url.searchParams.set('handoff', handoff)
  return url.toString()
}

/** Stores the items and goes to sign-up. Resolves only if it could not leave the page. */
export async function sendToSubly(kind: ToolKind, items: ToolItem[], meta: Record<string, string | number> = {}) {
  const tool = window.location.pathname
  // `tool` is the same short key the tool's other events use (stack, appsumo, runway, builder, scan)
  send('tool_handoff', { tool: kind, items: String(items.length) })
  let id: string | undefined
  try {
    const response = await fetch(`${APP_URL}/api/public/handoff`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, items: items.slice(0, 100), meta })
    })
    if (response.ok) id = ((await response.json()) as { id?: string }).id
  } catch {
    // the app is unreachable: sign-up still works, without the items
  }
  window.location.assign(signupHref(tool, id))
}
