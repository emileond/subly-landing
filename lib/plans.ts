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
    forWho: 'For trying it out',
    month: 0,
    year: 0,
    highlights: [
      'Up to 20 items',
      '1 statement read',
      'Renewal and price alerts by email',
      'Monthly summary',
    ],
    limits: { items: '20', people: 1, banks: 0, storage: '100 MB', webhooks: 0 },
  },
  {
    id: 'personal',
    name: 'Personal',
    forWho: 'For individuals who want it automatic',
    month: 5,
    year: 48,
    highlights: [
      'Unlimited items',
      'Statement reading and receipt forwarding',
      'Ask Subly about your numbers',
      '3 people and 1 bank connection',
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
    highlights: [
      'Everything in Personal',
      '8 people and 3 bank connections',
      'Slack app with buttons',
      '13-week "how long your money lasts"',
      'Claude connector and API',
    ],
    limits: { items: 'Unlimited', people: 8, banks: 3, storage: '5 GB', webhooks: 5 },
  },
  {
    id: 'team',
    name: 'Team',
    forWho: 'For agencies and growing teams',
    month: 49,
    year: 490,
    highlights: [
      'Everything in Business',
      '20 people',
      '10 bank connections',
      'Priority support',
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
