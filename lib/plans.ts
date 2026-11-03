/**
 * Plans and prices as shown on the website. Keep in step with
 * subly-web/lib/plans.ts, which is the source of truth for limits and prices.
 */

export type PlanId = 'free' | 'personal' | 'business' | 'team'
export type Interval = 'month' | 'year'

export type Plan = {
  id: PlanId
  name: string
  forWho: string
  month: number
  year: number
  /** Lead-in above the highlights, e.g. "Everything in Free, plus" */
  includes?: string
  highlights: string[]
  popular?: boolean
  limits: {
    items: string
    people: number
    banks: number
    storage: string
    webhooks: number
  }
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    forWho: 'To see what you really pay',
    month: 0,
    year: 0,
    highlights: [
      'Up to 20 items, money in and out',
      'Any currency',
      '1 statement read by Subly',
      'Renewal and price alerts by email',
      'Monthly summary in plain words',
    ],
    limits: { items: '20', people: 1, banks: 0, storage: '100 MB', webhooks: 0 },
  },
  {
    id: 'personal',
    name: 'Personal',
    forWho: 'For one business or household, on autopilot',
    month: 5,
    year: 48,
    includes: 'Everything in Free, plus',
    highlights: [
      'Unlimited items and statement reading',
      'Receipt forwarding to your own address',
      'Ask Subly and reports',
      'Claude connector (MCP) and API',
      'Alerts by email, push and chat apps',
      '3 people, 1 bank connection',
    ],
    limits: { items: 'Unlimited', people: 3, banks: 1, storage: '1 GB', webhooks: 3 },
  },
  {
    id: 'business',
    name: 'Business',
    forWho: 'For founders, freelancers and small teams',
    month: 19,
    year: 190,
    popular: true,
    includes: 'Everything in Personal, plus',
    highlights: [
      'Slack app with buttons',
      '13-week cash forecast with what-ifs',
      'Import recurring revenue from Stripe',
      '10 people, 5 bank connections',
      'Priority support',
    ],
    limits: { items: 'Unlimited', people: 10, banks: 5, storage: '5 GB', webhooks: 5 },
  },
  {
    id: 'team',
    name: 'Team',
    forWho: 'For agencies and growing teams',
    month: 49,
    year: 490,
    includes: 'Everything in Business, plus',
    highlights: [
      '20 people',
      '10 bank connections',
      '20 GB of file storage',
      '10 outgoing webhooks',
    ],
    limits: { items: 'Unlimited', people: 20, banks: 10, storage: '20 GB', webhooks: 10 },
  },
]

export const AI_ADDON = { month: 3, year: 30 }

/** Yearly price per month, rounded to the nearest dollar */
export function perMonthWhenYearly(plan: Plan) {
  return Math.round(plan.year / 12)
}

export function monthsFree(plan: Plan) {
  return Math.round((plan.month * 12 - plan.year) / plan.month)
}
