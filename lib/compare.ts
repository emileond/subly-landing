import type { Faq } from '@/lib/faq'
import type { PageMeta } from '@/lib/seo'

/**
 * Subly next to other subscription trackers. One table of facts drives every comparison page
 * (/compare and /compare/<product>), so a price or a feature changes in one place.
 *
 * Rules for this file:
 * - Facts about other products come from docs/marketing/competitor-facts-2026-11.md, which
 *   cites each one. Re-check the vendor's own page before changing a cell, and move CHECKED.
 * - Facts about Subly come from docs/blog-writing-guide.md ("the only claims you may make").
 * - When a vendor's site doesn't say, the cell is `unknown` ("Not stated"), never `no`.
 */

export const CHECKED = 'November 5, 2026'
export const CHECKED_SHORT = 'Nov 2026'

/** yes: does it · partial: some of it, or only with a workaround · no: doesn't · unknown: its site doesn't say */
export type Mark = 'yes' | 'partial' | 'no' | 'unknown'
export type Cell = { mark: Mark; text: string }

export const GROUPS = [
  { id: 'data', title: 'Getting your data in' },
  { id: 'alerts', title: 'Hearing about it in time' },
  { id: 'picture', title: 'The whole picture' },
  { id: 'team', title: 'People and owners' },
  { id: 'agents', title: 'AI and automation' },
  { id: 'basics', title: 'Price and reach' },
] as const

export const ROWS = [
  { id: 'statement', group: 'data', label: 'Reads a bank or card statement', hint: 'Upload a file and it finds what repeats' },
  { id: 'bank', group: 'data', label: 'Bank connection' },
  { id: 'receipts', group: 'data', label: 'Picks up receipts or invoices' },
  { id: 'stripe', group: 'data', label: 'Imports revenue from Stripe' },
  { id: 'deals', group: 'data', label: 'Lifetime deals and refund windows' },
  { id: 'email', group: 'alerts', label: 'Renewal alerts by email' },
  { id: 'slack', group: 'alerts', label: 'Alerts in Slack' },
  { id: 'chat', group: 'alerts', label: 'Teams, Discord or Telegram' },
  { id: 'priceRise', group: 'alerts', label: 'Tells you about price rises' },
  { id: 'afterCancel', group: 'alerts', label: 'Catches charges after you cancelled' },
  { id: 'moneyIn', group: 'picture', label: 'Money coming in', hint: 'Client retainers, payouts, recurring revenue' },
  { id: 'forecast', group: 'picture', label: 'Cash forecast' },
  { id: 'currencies', group: 'picture', label: 'Several currencies' },
  { id: 'people', group: 'team', label: 'People on the account' },
  { id: 'owners', group: 'team', label: 'An owner on every item' },
  { id: 'agent', group: 'agents', label: 'AI assistant' },
  { id: 'api', group: 'agents', label: 'API and webhooks' },
  { id: 'free', group: 'basics', label: 'Free plan' },
  { id: 'regions', group: 'basics', label: 'Where it works' },
] as const

export type RowId = (typeof ROWS)[number]['id']
export type GroupId = (typeof GROUPS)[number]['id']

/** What one product costs for a given team, with renewal alerts switched on (the point of a tracker) */
export type Quote = { plan: string; price: string; monthly: number | null; note?: string }
export type Scenario = { id: string; label: string; people: number; items: number }

export const SCENARIOS: Scenario[] = [
  { id: 'solo', label: 'Just you, 30 tools', people: 1, items: 30 },
  { id: 'three', label: '3 people', people: 3, items: 40 },
  { id: 'ten', label: '10 people', people: 10, items: 60 },
]

export type ProductId = 'subly' | 'trackmysubs' | 'costloop' | 'subtracker' | 'rocket-money' | 'cledara' | 'wallos' | 'spreadsheet'

export type Product = {
  id: ProductId
  name: string
  /** For the logo; none for a spreadsheet */
  website?: string
  /** Who it is built for, in a few words */
  bestFor: string
  /** Starting price line for cards */
  from: string
  cells: Record<RowId, Cell>
  quote: (s: Scenario) => Quote | null
}

const y = (text: string): Cell => ({ mark: 'yes', text })
const p = (text: string): Cell => ({ mark: 'partial', text })
const n = (text: string): Cell => ({ mark: 'no', text })
const u = (text = 'Not stated on its site'): Cell => ({ mark: 'unknown', text })

export const PRODUCTS: Record<ProductId, Product> = {
  subly: {
    id: 'subly',
    name: 'Subly',
    website: 'subly.app',
    bestFor: 'Small businesses that want every recurring payment, in and out, found and watched for them',
    from: 'Free up to 20 items; paid from $5/month',
    cells: {
      statement: y('PDF or CSV, no bank login. One on Free, unlimited from Personal'),
      bank: y('US, Canada and Europe, read-only through Plaid. From Personal'),
      receipts: y('Forward receipts to your own Subly address. From Personal'),
      stripe: y('Recurring revenue from Stripe. Business and Team'),
      deals: y('AppSumo import and a heads-up before each refund window closes. Every plan'),
      email: y('Every plan, Free included'),
      slack: y('A Slack app with Keep, Plan to cancel and Snooze buttons. From Business'),
      chat: y('Microsoft Teams, Discord, Telegram and push. From Personal'),
      priceRise: y('“Notion Plus went up 20%: $10 → $12”. Every plan'),
      afterCancel: y('Every plan'),
      moneyIn: y('Retainers, payouts and recurring revenue next to costs. Every plan'),
      forecast: y('13 weeks of your balance, with what-ifs. Business and Team'),
      currencies: y('150+, each item in its own, totals in yours'),
      people: y('3 on Personal, 10 on Business, 20 on Team'),
      owners: y('Renewals go to the owner, who decides. From Personal'),
      agent: y('Claude connector (MCP) and Ask Subly. From Personal'),
      api: y('REST API and signed webhooks. From Personal'),
      free: y('Up to 20 items, with email alerts'),
      regions: y('Anywhere. Statement upload needs no bank'),
    },
    quote: ({ people, items }) => {
      if (people <= 1 && items <= 20) return { plan: 'Free', price: '$0', monthly: 0 }
      if (people <= 3) return { plan: 'Personal', price: '$5', monthly: 5 }
      if (people <= 10) return { plan: 'Business', price: '$19', monthly: 19, note: 'Slack app and forecast included' }
      if (people <= 20) return { plan: 'Team', price: '$49', monthly: 49 }
      return null
    },
  },
  trackmysubs: {
    id: 'trackmysubs',
    name: 'TrackMySubs',
    website: 'trackmysubs.com',
    bestFor: 'Simple manual tracking for solo businesses and agencies',
    from: 'Free up to 10 subscriptions; paid from $10/month',
    cells: {
      statement: n('No. You type each one or upload a CSV list'),
      bank: n('No, by choice'),
      receipts: n('No'),
      stripe: u(),
      deals: u(),
      email: y('Before each payment, to several addresses'),
      slack: p('Only through Zapier'),
      chat: p('SMS through Zapier'),
      priceRise: u(),
      afterCancel: u(),
      moneyIn: u('Not stated; positioned as expense tracking'),
      forecast: p('A calendar of upcoming payments'),
      currencies: y('160+, crypto included'),
      people: p('Multiple users on Enterprise only, $30/month'),
      owners: u(),
      agent: u(),
      api: p('Zapier'),
      free: y('Up to 10 subscriptions'),
      regions: y('No restriction stated'),
    },
    quote: ({ people, items }) => {
      if (people <= 1) return items <= 10 ? { plan: 'Starter', price: '$0', monthly: 0 } : { plan: 'Unlimited', price: '$10', monthly: 10 }
      return { plan: 'Enterprise', price: '$30', monthly: 30, note: 'Seat count not stated' }
    },
  },
  costloop: {
    id: 'costloop',
    name: 'CostLoop',
    website: 'costloop.app',
    bestFor: 'Cost tracking with inbox scanning',
    from: 'Free up to 5 subscriptions; Pro $9/month',
    cells: {
      statement: p('A bank or card CSV; PDF not stated'),
      bank: n('No bank connection'),
      receipts: y('Scans Gmail and Outlook through a Chrome extension. Pro'),
      stripe: u(),
      deals: u(),
      email: y('Renewal reminders on Pro, $9/month'),
      slack: u(),
      chat: u(),
      priceRise: u(),
      afterCancel: u(),
      moneyIn: u('Not stated; tracks costs'),
      forecast: u(),
      currencies: p('Yes, but its pages disagree on converting totals'),
      people: p('Team visibility on Business, $39/month'),
      owners: u(),
      agent: u(),
      api: p('REST API and webhooks on Business, $39/month'),
      free: p('Up to 5 subscriptions, no reminders'),
      regions: y('No restriction stated; EU data processing'),
    },
    quote: ({ people }) =>
      people <= 1 ? { plan: 'Pro', price: '$9', monthly: 9 } : { plan: 'Business', price: '$39', monthly: 39 },
  },
  subtracker: {
    id: 'subtracker',
    name: 'SubTracker',
    website: 'subtracker.io',
    bestFor: 'Households and families',
    from: 'Free; Plus $5.90/month',
    cells: {
      statement: n('No. Manual, with a quick-add list of 180+ services'),
      bank: n('Never links to your bank'),
      receipts: u(),
      stripe: u(),
      deals: u(),
      email: y('On Plus, $5.90/month'),
      slack: u(),
      chat: u(),
      priceRise: y('On Plus'),
      afterCancel: u(),
      moneyIn: u(),
      forecast: u('Not stated; shows monthly and yearly totals'),
      currencies: y('USD, EUR, GBP, CHF and 20+ more'),
      people: y('Up to 10 on Family, $9.90/month'),
      owners: u('Not stated; Family has roles'),
      agent: u(),
      api: u(),
      free: y('No item limit; alerts are paid'),
      regions: y('No restriction stated'),
    },
    quote: ({ people }) => {
      if (people <= 1) return { plan: 'Plus', price: '$5.90', monthly: 5.9 }
      if (people <= 10) return { plan: 'Family', price: '$9.90', monthly: 9.9, note: 'Built for households' }
      return null
    },
  },
  'rocket-money': {
    id: 'rocket-money',
    name: 'Rocket Money',
    website: 'rocketmoney.com',
    bestFor: 'Personal finances in the US',
    from: 'Free; Premium is pay what you think is fair',
    cells: {
      statement: n('No. Linked US bank accounts only'),
      bank: p('US banks only, through Plaid'),
      receipts: u(),
      stripe: n('No business plan'),
      deals: u(),
      email: y('Push and email'),
      slack: u(),
      chat: u(),
      priceRise: u(),
      afterCancel: u(),
      moneyIn: p('Personal income against spending'),
      forecast: p('A bill timeline on Premium'),
      currencies: n('US-only service with US banks'),
      people: n('Two people sharing one account'),
      owners: n('No business seats or roles'),
      agent: p('Rowan, by text message, on Premium+ at $15/month'),
      api: u(),
      free: y('Yes'),
      regions: n('US only'),
    },
    quote: ({ people }) =>
      people <= 2 ? { plan: 'Free', price: '$0', monthly: 0, note: 'Personal use, US banks only' } : null,
  },
  cledara: {
    id: 'cledara',
    name: 'Cledara',
    website: 'cledara.com',
    bestFor: 'Finance and IT teams that need virtual cards and approvals',
    from: 'From £75/month',
    cells: {
      statement: u(),
      bank: p('Its own virtual cards, plus Xero and QuickBooks'),
      receipts: y('Automatic invoice capture on Premium'),
      stripe: u(),
      deals: u(),
      email: y('Renewal reminders to app owners'),
      slack: y('Slack and email'),
      chat: u(),
      priceRise: p('In the Spend Optimisation add-on, £150/month'),
      afterCancel: u(),
      moneyIn: u('Not stated; manages software spend'),
      forecast: y('Reporting and forecasting on Premium, £200/month'),
      currencies: p('Priced in GBP; multiple entities on request'),
      people: y('10 members on Premium, more at £5 each'),
      owners: y('App owners'),
      agent: p('Cledara Agent add-on, £200/month'),
      api: y('API on every plan'),
      free: n('No free plan or trial stated'),
      regions: y('UK, EU and US'),
    },
    quote: ({ items }) => {
      if (items <= 20) return { plan: 'Basic', price: '£75', monthly: null, note: 'Up to 20 apps' }
      if (items <= 75) return { plan: 'Premium', price: '£200', monthly: null, note: 'Up to 75 apps' }
      return { plan: 'Pro', price: 'from £500', monthly: null }
    },
  },
  wallos: {
    id: 'wallos',
    name: 'Wallos',
    website: 'wallosapp.com',
    bestFor: 'People who run their own server',
    from: 'Free, open source; you pay for hosting',
    cells: {
      statement: u('Not stated; manual entry'),
      bank: u(),
      receipts: u(),
      stripe: u(),
      deals: u(),
      email: y('Email'),
      slack: u(),
      chat: y('Discord, Telegram, Pushover, Gotify, webhooks'),
      priceRise: u(),
      afterCancel: u(),
      moneyIn: u(),
      forecast: u(),
      currencies: y('Yes, with a free Fixer API key'),
      people: y('Household members and users'),
      owners: u(),
      agent: p('Recommendations through your own AI model'),
      api: y('API'),
      free: y('Open source; you host it'),
      regions: y('Wherever you host it'),
    },
    quote: () => ({ plan: 'Self-hosted', price: '$0', monthly: 0, note: 'Plus your server' }),
  },
  spreadsheet: {
    id: 'spreadsheet',
    name: 'Spreadsheet',
    bestFor: 'Under about 15 items in one currency',
    from: 'Free',
    cells: {
      statement: n('You type every row'),
      bank: n('No'),
      receipts: n('No'),
      stripe: n('No'),
      deals: n('Only if you add the date and remember it'),
      email: n('Not without scripts'),
      slack: n('No'),
      chat: n('No'),
      priceRise: n('Only if someone compares statements'),
      afterCancel: n('No'),
      moneyIn: p('If you add the rows'),
      forecast: p('If you build and keep it up'),
      currencies: p('Formulas you maintain'),
      people: y('Anyone you share it with'),
      owners: p('A column; nobody gets reminded'),
      agent: n('No'),
      api: n('No'),
      free: y('Free'),
      regions: y('Anywhere'),
    },
    quote: () => ({ plan: 'Sheet', price: '$0', monthly: 0, note: 'No alerts' }),
  },
}

/** Subly first, then the order of the hub */
export const PRODUCT_ORDER: ProductId[] = ['subly', 'trackmysubs', 'costloop', 'subtracker', 'rocket-money', 'cledara', 'wallos', 'spreadsheet']

/** A headline difference: Subly's answer against theirs, in a few words each */
export type Win = { title: string; us: string; them: string; body: string }

export type Comparison = {
  slug: string
  competitor: Exclude<ProductId, 'subly'>
  meta: PageMeta
  h1: string
  /** The answer in two sentences: who should pick which */
  verdict: string
  /** Where Subly is ahead, the reasons people switch */
  wins: Win[]
  /** Said plainly, so the page can be trusted */
  theyDoWell: string[]
  pickThem: string
  switching?: { title: string; body: string }[]
  faq: Faq[]
  /** Shown under the table: what is in neither column, or worth knowing */
  footnote?: string
}

const compare = (c: Omit<Comparison, 'meta'> & { title: string; description: string }): Comparison => ({
  ...c,
  meta: { title: c.title, description: c.description, path: `/compare/${c.slug}`, ogTitle: c.h1, ogEyebrow: 'Compare' },
})

const importSteps = (them: string): { title: string; body: string }[] => [
  { title: `Export what you have in ${them}`, body: 'Look for an export in its settings or reports. If there is none, copy the list into a spreadsheet; it is a one-time job.' },
  { title: 'Import it into Subly', body: 'The spreadsheet import reads CSV and Excel. Check that names, amounts, billing cycles and renewal dates came through.' },
  { title: 'Upload one statement', body: 'Subly reads it and shows any recurring charge your old list never had.' },
  { title: 'Give each item an owner', body: 'Renewals and price rises go to the person who decides, by email, chat or Slack.' },
]

export const COMPARISONS: Comparison[] = [
  compare({
    slug: 'trackmysubs',
    competitor: 'trackmysubs',
    title: 'Subly vs TrackMySubs: a TrackMySubs alternative compared',
    description: 'Subly vs TrackMySubs side by side: how subscriptions get in, Slack alerts, team seats, money coming in and what each costs for 1, 3 or 10 people.',
    h1: 'Subly vs TrackMySubs',
    verdict:
      'TrackMySubs is a tidy list you keep by hand. Subly builds the list for you from a statement, a bank or your receipts, sends renewals to the person who decides, and tracks the money coming in too. For a team, it also costs less.',
    wins: [
      { title: 'The list builds itself', us: 'Statement, bank, receipts', them: 'Type it or upload a CSV', body: 'Upload a PDF or CSV statement and Subly finds every recurring charge, including the ones nobody wrote down. TrackMySubs has no bank or inbox import, so a forgotten charge stays forgotten.' },
      { title: 'Your team, for less', us: '3 people for $5/month', them: 'Multiple users at $30/month', body: 'Subly includes 3 people on Personal and 10 on Business at $19. On TrackMySubs, a second person means the Enterprise plan.' },
      { title: 'Alerts where you work', us: 'Slack app with buttons', them: 'Slack through Zapier', body: 'Keep, Plan to cancel or Snooze a renewal right from Slack, or get it in Teams, Discord or Telegram. No Zapier to set up.' },
      { title: 'Both sides of the money', us: 'Costs and retainers', them: 'Costs only', body: 'Client retainers and Stripe revenue sit next to software and insurance, so you see what you keep, not just what you spend.' },
    ],
    theyDoWell: [
      'More currencies: 160+, crypto included, against Subly’s 150+.',
      'A free plan for up to 10 subscriptions, and email alerts that can go to several addresses.',
      'It never touches a bank, which some people prefer. (Subly doesn’t need one either: a statement upload works without a bank login.)',
    ],
    pickThem: 'You work alone, keep a short list by hand, want only email alerts and never track money coming in.',
    switching: importSteps('TrackMySubs'),
    faq: [
      { q: 'Is Subly a good TrackMySubs alternative?', a: 'If you want subscriptions found for you instead of typed, alerts in Slack without Zapier, or more than one person without the top plan, yes. If a short manual list with email alerts is all you need, TrackMySubs does that well.' },
      { q: 'Is there a free alternative to TrackMySubs?', a: 'Yes. Subly’s Free plan tracks up to 20 items with email alerts and one statement read, against 10 subscriptions on TrackMySubs’ free plan, as of November 2026.' },
      { q: 'Can I move my subscriptions out of TrackMySubs without retyping them?', a: 'If you can export a CSV, Subly’s spreadsheet import reads CSV and Excel. Then upload one statement to catch anything the old list missed.' },
      { q: 'Does TrackMySubs connect to QuickBooks or Xero?', a: 'Its homepage lists them as “coming soon”. We couldn’t confirm whether they have shipped, so ask TrackMySubs if you need them.' },
    ],
  }),
  compare({
    slug: 'costloop',
    competitor: 'costloop',
    title: 'Subly vs CostLoop: subscription trackers compared',
    description: 'Subly vs CostLoop side by side: statements and inbox scanning, bank connections, Slack alerts, money coming in, team pricing and the free plans.',
    h1: 'Subly vs CostLoop',
    verdict:
      'Both find subscriptions for you. CostLoop reads a CSV and scans your inbox, for costs only. Subly also reads PDF statements, connects a bank, tracks money coming in and forecasts your cash, and a team of three pays $5 a month instead of $39.',
    wins: [
      { title: 'More ways in', us: 'PDF or CSV, bank, receipts, Stripe', them: 'CSV and inbox scan', body: 'Upload whatever your bank gives you, PDF or CSV, or connect a bank in the US, Canada or Europe. Forward receipts to your own Subly address, no browser extension needed.' },
      { title: 'A team for $5', us: '3 people for $5/month', them: 'Team visibility at $39/month', body: 'Subly includes 3 people on Personal and 10 on Business at $19. CostLoop’s Pro plan is for one user; workspaces and team visibility start on Business.' },
      { title: 'Money in and the weeks ahead', us: 'Retainers, revenue, 13-week forecast', them: 'Costs only', body: 'Retainers and Stripe revenue sit next to costs, and Business adds a 13-week view of your balance where you can test a cancel before you commit.' },
      { title: 'Alerts on Free', us: 'Email alerts on Free', them: 'Reminders from Pro', body: 'Subly’s Free plan tracks 20 items with email alerts. CostLoop’s free plan covers 5 subscriptions, with renewal reminders on Pro.' },
    ],
    theyDoWell: [
      'Gmail and Outlook scanning finds subscriptions that only show up as receipts in your inbox.',
      'Unused-seat and duplicate-tool detection on Pro.',
      'No per-seat charges on its plans.',
    ],
    pickThem: 'Most of your subscriptions arrive as email receipts, you track costs only, and you work alone.',
    switching: importSteps('CostLoop'),
    faq: [
      { q: 'Does CostLoop connect to a bank?', a: 'No. Its site says no bank connection is required: you upload a bank or card CSV instead. Subly reads CSV or PDF statements and can also connect a bank in the US, Canada and Europe, read-only.' },
      { q: 'Which is cheaper for a small team?', a: 'As of November 2026, Subly is $5 a month for 3 people and $19 for 10. CostLoop’s team features are on Business at $39 a month.' },
      { q: 'Does Subly scan my inbox?', a: 'No. You forward receipts to your own Subly address, and only what you forward is read. Subly also reads statements, which catch charges that never send a receipt.' },
    ],
  }),
  compare({
    slug: 'subtracker',
    competitor: 'subtracker',
    title: 'Subly vs SubTracker: which subscription tracker fits?',
    description: 'Subly vs SubTracker side by side: manual entry or statement reading, bank connections, alerts on the free plan, money coming in and team features.',
    h1: 'Subly vs SubTracker',
    verdict:
      'SubTracker is a cheap, friendly tracker for a household you fill in by hand. Subly is built for a business: it finds the charges for you, routes renewals to an owner, tracks retainers and forecasts cash.',
    wins: [
      { title: 'No typing to start', us: 'Reads your statement', them: 'Manual, with a quick-add list', body: 'Upload one statement and see every recurring charge in about two minutes, or connect a bank. SubTracker never links to your bank and reads no statements.' },
      { title: 'Alerts on the free plan', us: 'Email alerts on Free', them: 'Alerts from Plus', body: 'Subly’s Free plan sends renewal alerts by email for up to 20 items. On SubTracker, alerts start on the $5.90 Plus plan.' },
      { title: 'Built for a business', us: 'Owners, Slack, retainers', them: 'Built for households', body: 'Give each tool an owner, get renewals in Slack or Teams, and track client retainers next to costs.' },
    ],
    theyDoWell: [
      'Calendar sync with Google, Apple and Outlook.',
      'A free plan with no item limit, and a $129 lifetime plan.',
      'Family plan for up to 10 people at $9.90 a month.',
    ],
    pickThem: 'You track a household’s subscriptions by hand and want them in your calendar.',
    switching: importSteps('SubTracker'),
    faq: [
      { q: 'Is SubTracker good for a business?', a: 'It is built for consumers and families; its tiers are “getting started”, “power users” and “families & small teams”. A business that wants owners, Slack alerts or money coming in will want a business tool.' },
      { q: 'Does Subly have a plan for households?', a: 'Yes. Personal is $5 a month or $48 a year with 3 people and unlimited items, and the Free plan covers 20 items.' },
    ],
  }),
  compare({
    slug: 'rocket-money',
    competitor: 'rocket-money',
    title: 'Rocket Money for business? Subly vs Rocket Money',
    description: 'There is no Rocket Money for business: it is a US-only personal app for two people. Here is how Subly compares for a team, side by side.',
    h1: 'Subly vs Rocket Money',
    verdict:
      'Rocket Money is a good personal app for people in the US. It has no business plan, shares with two people, and works only with US banks. Subly is built for the business: a team, owners, retainers, any currency, any country.',
    wins: [
      { title: 'Made for a business', us: 'Business, Team and owners', them: 'No business plan', body: 'Rocket Money’s pages show no business plan; its “business” link goes to a mortgage-lending product. Subly gives every tool an owner and sends renewals to the person who decides.' },
      { title: 'Your whole team', us: 'Up to 20 people', them: 'Two people', body: 'Rocket Money sharing is designed for a primary account holder and one partner. Subly includes 3, 10 or 20 people by plan.' },
      { title: 'Works where you bank', us: 'Anywhere, 150+ currencies', them: 'US banks only', body: 'Upload a statement from any bank, or connect one in the US, Canada or Europe. Each item keeps its own currency, with totals in yours.' },
      { title: 'Money coming in', us: 'Retainers and Stripe revenue', them: 'Personal income', body: 'Track client retainers and recurring revenue next to costs, and see 13 weeks of cash ahead on Business.' },
    ],
    theyDoWell: [
      'Bill negotiation, with no success fee on Premium+ as of November 2, 2026.',
      'A broad personal-finance app: budgets, credit score and balance alerts.',
      'Rowan, an AI agent that works over text message, on Premium+.',
    ],
    pickThem: 'You live and bank in the US and want help with your own household bills. Keep the business on a separate tool.',
    faq: [
      { q: 'Does Rocket Money work for a business?', a: 'It isn’t built for one. As of November 2026, its pages show no business plan, sharing is designed for two people, and there are no business seats or roles.' },
      { q: 'Does Rocket Money work outside the US?', a: 'No. Its help center says it is only available to users in the United States with US-based banks.' },
      { q: 'Can I use Rocket Money at home and Subly for the business?', a: 'Yes. They don’t depend on each other. Subly also has a $5 Personal plan if you’d rather keep both in one place.' },
    ],
  }),
  compare({
    slug: 'cledara',
    competitor: 'cledara',
    title: 'Subly vs Cledara: SaaS management for small teams',
    description: 'Subly vs Cledara side by side: what each costs, how data gets in, alerts, owners and forecasting, and when a small team needs a SaaS management platform.',
    h1: 'Subly vs Cledara',
    verdict:
      'Cledara is a SaaS management platform for finance and IT teams: virtual cards, approvals, onboarding, from £75 a month for 20 apps. Subly covers what most teams under 20 people need, what you pay, who owns it and what renews, from free, and adds money coming in.',
    wins: [
      { title: 'Start today, free', us: 'Free plan, 14-day Business trial', them: 'From £75/month, verification documents', body: 'Upload one statement and see every recurring charge in minutes. Cledara states no free plan or trial and asks for company verification documents to sign up.' },
      { title: 'A forecast for $19', us: '13 weeks, with what-ifs, $19/month', them: 'Forecasting on Premium, £200/month', body: 'See your balance week by week and test a cancel or a price change before you commit, on Business.' },
      { title: 'Not only software', us: 'Software, insurance, retainers', them: 'Software spend', body: 'Domains, insurance, client retainers and Stripe revenue sit on the same list as your tools.' },
    ],
    theyDoWell: [
      'A virtual card per tool, so every subscription is paid on a card you control.',
      'Approval workflows, spend limits, onboarding and offboarding, and Okta SSO on Pro.',
      'Xero, QuickBooks and NetSuite, and an agent that collects invoices from your tools.',
    ],
    pickThem: 'You want a card per tool, purchase approvals, onboarding and offboarding, NetSuite, or you manage more than 75 apps.',
    footnote: 'Zylo and Vertice (which announced its acquisition of Vendr in June 2026) are enterprise platforms sold through a sales team, with quotes or demos instead of self-serve plans.',
    faq: [
      { q: 'Is Cledara worth it for a small business?', a: 'It is if you need what it is built around: virtual cards per tool, approvals, onboarding and offboarding, or NetSuite. If you mainly want to know what you pay and what renews, £75 a month for 20 apps (as of November 2026) is more than that job needs.' },
      { q: 'Can Subly issue virtual cards or approve purchases?', a: 'No. Subly is read-only: it finds and tracks recurring payments and tells the right person before they renew, but it doesn’t issue cards, approve purchases or move money.' },
      { q: 'What happened to Vendr?', a: 'Vertice announced that it acquired Vendr on June 1, 2026. The Vendr pricing page now redirects to Vertice.' },
    ],
  }),
  compare({
    slug: 'wallos',
    competitor: 'wallos',
    title: 'Subly vs Wallos: hosted or self-hosted subscription tracking',
    description: 'Subly vs Wallos side by side: a hosted tracker that reads statements and connects banks, or an open-source one you run on your own server.',
    h1: 'Subly vs Wallos',
    verdict:
      'Wallos is open source and runs on your own server, with entry by hand. Subly runs for you: it reads statements, connects banks, sends renewals to owners in Slack and tracks money coming in, with nothing to host or update.',
    wins: [
      { title: 'Nothing to run', us: 'Hosted, backed up, supported', them: 'Your server, your updates', body: 'No server, updates or backups to look after, and email support from Personal.' },
      { title: 'Finds charges for you', us: 'Statement, bank, receipts', them: 'Manual entry', body: 'Upload a statement or connect a bank, and every recurring charge shows up without typing.' },
      { title: 'For a team', us: 'Owners and a Slack app', them: 'Household members', body: 'Give each item an owner and let renewals reach them in Slack, Teams or email.' },
    ],
    theyDoWell: [
      'Open source under GPL-3.0, and your data stays on your server.',
      'Alerts by email, Discord, Pushover, Telegram, Gotify and webhooks.',
      'Bring your own AI model for recommendations, including a local one.',
    ],
    pickThem: 'You already self-host, want your data on your own machine and are happy to enter items by hand.',
    faq: [
      { q: 'Is Wallos free?', a: 'Yes. It is open source under GPL-3.0; you pay only for the server you run it on.' },
      { q: 'Can I export my data from Subly?', a: 'Yes, everything, at any time. If you leave, your data is deleted.' },
    ],
  }),
  compare({
    slug: 'spreadsheet',
    competitor: 'spreadsheet',
    title: 'Subly vs a subscription spreadsheet: when to switch',
    description: 'A spreadsheet or Subly for tracking subscriptions? Side by side: typing vs statement reading, reminders, price rises, owners and what each costs.',
    h1: 'Subly vs a spreadsheet',
    verdict:
      'A spreadsheet is fine for a short list in one currency that someone checks every month. Once you pass about 15 items, pay in two currencies or share the job, Subly keeps the list current and tells you before anything renews.',
    wins: [
      { title: 'It stays current', us: 'New charges show up', them: 'Out of date by next month', body: 'Upload a statement or connect a bank and new subscriptions appear on their own. A sheet only knows what someone typed.' },
      { title: 'It tells you first', us: 'Renewals, price rises, refund windows', them: 'Nothing, unless you look', body: 'Subly speaks up before a renewal, when a price goes up and when something you cancelled charges again.' },
      { title: 'Someone decides', us: 'An owner, reminded', them: 'A column nobody reads', body: 'Each renewal reaches the person who owns it, by email, chat or Slack, with Keep or Plan to cancel.' },
    ],
    theyDoWell: [
      'Free, or already paid for, and as flexible as you make it.',
      'No data shared with a vendor.',
      'Our free template has the columns and formulas.',
    ],
    pickThem: 'You have under about 15 items, mostly in one currency, and someone likes a monthly check.',
    switching: [
      { title: 'Import the sheet', body: 'Subly reads CSV and Excel. Check names, amounts, billing cycles and renewal dates.' },
      { title: 'Upload one statement', body: 'See what the sheet never had.' },
      { title: 'Give each item an owner', body: 'Renewals reach the person who decides.' },
    ],
    faq: [
      { q: 'Is there a free subscription tracker spreadsheet?', a: 'Yes. Our template has the columns and formulas for monthly and yearly totals. See the subscription tracker spreadsheet guide on the blog.' },
      { q: 'When should I stop using a spreadsheet?', a: 'When the list passes about 15 items, you pay in more than one currency, a price rise slips past, or more than one person needs to keep it up.' },
    ],
  }),
]

export const comparisonFor = (slug: string) => COMPARISONS.find((c) => c.slug === slug)

/** The hub: /compare */
export const HUB = {
  meta: {
    title: 'Subscription trackers for small business, compared',
    description:
      'Subly, TrackMySubs, CostLoop, SubTracker, Rocket Money, Cledara, Wallos and a spreadsheet side by side: data in, alerts, team, money in and price, checked November 2026.',
    path: '/compare',
    ogTitle: 'Subscription trackers, side by side.',
    ogEyebrow: 'Compare',
  } satisfies PageMeta,
  choose: [
    { when: 'You want the list built for you, money in and out, owners and Slack', pick: 'subly' },
    { when: 'A short manual list with email alerts', pick: 'trackmysubs' },
    { when: 'Costs only, found in your Gmail or Outlook', pick: 'costloop' },
    { when: 'A household’s subscriptions in your calendar', pick: 'subtracker' },
    { when: 'Personal bills in the US', pick: 'rocket-money' },
    { when: 'Virtual cards and approvals at a larger company', pick: 'cledara' },
    { when: 'You self-host already', pick: 'wallos' },
    { when: 'Under 15 items in one currency', pick: 'spreadsheet' },
  ] satisfies { when: string; pick: ProductId }[],
  faq: [
    { q: 'What is the best subscription tracker for a small business?', a: 'It depends on how you want data to get in and who needs to see it. For a short manual list, TrackMySubs or a spreadsheet is enough. To start from a statement, give each tool an owner and track retainers next to costs, look at Subly. For virtual cards and approvals at a larger company, look at Cledara.' },
    { q: 'Is there a free subscription tracker for small business?', a: 'Several, as of November 2026. Subly’s Free plan covers 20 items with email alerts and one statement read, TrackMySubs is free for 10 subscriptions, Wallos is free if you host it, and a spreadsheet costs nothing.' },
    { q: 'Do I have to connect my bank to track subscriptions?', a: 'No. Subly reads a PDF or CSV statement without a bank login, CostLoop reads a CSV, and TrackMySubs, SubTracker and Wallos are manual. A bank connection only saves the monthly upload.' },
    { q: 'How were these products checked?', a: `We read each vendor’s own pricing and help pages on ${CHECKED}. Where its pages disagree, we say so. Where a site doesn’t mention a feature, the table says “Not stated” rather than no.` },
  ] satisfies Faq[],
}
