import type { PlanId } from '@/lib/plans'

/** true = included, false = not included, string = shown as text. Order: free, personal, business, team. */
export type Cell = boolean | string
export type FeatureRow = { label: string; hint?: string; values: [Cell, Cell, Cell, Cell] }
export type FeatureGroup = { title: string; rows: FeatureRow[] }

export const PLAN_ORDER: PlanId[] = ['free', 'personal', 'business', 'team']

export const featureGroups: FeatureGroup[] = [
  {
    title: 'Bring data in',
    rows: [
      { label: 'Items you can track', values: ['20', 'Unlimited', 'Unlimited', 'Unlimited'] },
      { label: 'Statement reading', hint: 'PDF or CSV from your bank or card', values: ['1 statement', 'Unlimited', 'Unlimited', 'Unlimited'] },
      { label: 'Receipt forwarding', hint: 'Your own address; forward a receipt and it adds itself', values: [false, true, true, true] },
      { label: 'Bank connections', hint: 'US, Canada and Europe', values: ['None', '1', '5', '10'] },
      { label: 'Import recurring revenue from Stripe', values: [false, false, true, true] },
      { label: 'AppSumo import', values: [true, true, true, true] },
      { label: 'Money in next to money out', values: [true, true, true, true] },
      { label: 'Any currency', values: [true, true, true, true] },
    ],
  },
  {
    title: 'Get alerted',
    rows: [
      { label: 'Signals on Today', hint: 'Renewals, price rises, charges after cancelling, refund windows, late payments, bank issues', values: [true, true, true, true] },
      { label: 'Alerts by email', values: [true, true, true, true] },
      { label: 'Push, Discord, Telegram and Teams', values: [false, true, true, true] },
      { label: 'Slack app with buttons', values: [false, false, true, true] },
    ],
  },
  {
    title: 'Understand',
    rows: [
      { label: 'Monthly summary in plain words', values: [true, true, true, true] },
      { label: 'Share this month', values: [true, true, true, true] },
      { label: 'Ask Subly and reports', hint: 'Ask about your numbers in plain words', values: [false, true, true, true] },
      { label: 'Cash forecast', hint: '13 weeks of your balance, with what-ifs', values: [false, false, true, true] },
    ],
  },
  {
    title: 'Team and builders',
    rows: [
      { label: 'People', values: ['1', '3', '10', '20'] },
      { label: 'Owners, notes, mentions and a For you feed', values: [false, true, true, true] },
      { label: 'Claude connector (MCP)', values: [false, true, true, true] },
      { label: 'API', hint: 'REST API with an OpenAPI spec', values: [false, true, true, true] },
      { label: 'Signed webhooks', values: ['None', '3', '5', '10'] },
      { label: 'File storage', values: ['100 MB', '1 GB', '5 GB', '20 GB'] },
      { label: 'Support', values: ['Help center', 'Email', 'Priority', 'Priority'] },
    ],
  },
]
