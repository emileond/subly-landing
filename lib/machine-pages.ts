import { ABOUT } from '@/lib/about'
import { getAuthor } from '@/lib/authors'
import { CHECKED, COMPARISONS, GROUPS, HUB, PRODUCTS, PRODUCT_ORDER, ROWS, SCENARIOS, type Cell, type ProductId } from '@/lib/compare'
import { formatDate, getPosts } from '@/lib/content'
import { type Faq, faqs } from '@/lib/faq'
import { PAGES } from '@/lib/pages'
import { personaSlugs, personas } from '@/lib/personas'
import { PLAN_ORDER, featureGroups } from '@/lib/plan-features'
import { AI_ADDON, PLANS } from '@/lib/plans'
import { DISAMBIGUATION } from '@/lib/seo'
import { APP_URL, DEFAULT_DESCRIPTION, SIGNUP_URL, SITE_URL, absoluteUrl } from '@/lib/site'
import { TOOLS } from '@/lib/tools'

/**
 * The site as plain Markdown, for AI assistants and agents. Every page that answers a buyer's
 * question has a twin at the same address plus `.md` (/pricing → /pricing.md, / → /index.md),
 * built from the same data as the HTML page, so the two cannot disagree. /llms.txt lists them
 * and /llms-full.txt is all of them in one file.
 *
 * Why: an assistant that fetches a page reads the text, not the layout. Tables drawn by client
 * components, tabs and accordions are easy to misread; a Markdown table is not.
 */
export type MachinePage = {
  /** The HTML page's path, e.g. /compare/trackmysubs */
  path: string
  title: string
  description: string
  section: 'Product' | 'Compare' | 'Free tools' | 'Who it is for' | 'Guides'
  body: string
}

/** /pricing → /pricing.md, / → /index.md */
export const markdownPath = (path: string) => (path === '/' ? '/index.md' : `${path}.md`)

const faqBlock = (items: Faq[]) => (items.length ? ['## Questions', '', ...items.flatMap((f) => [`### ${f.q}`, '', f.a, ''])].join('\n') : '')
const table = (head: string[], rows: string[][]) =>
  [`| ${head.join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`, ...rows.map((r) => `| ${r.map((c) => c.replaceAll('|', '\\|')).join(' | ')} |`)].join('\n')
const MARK = { yes: 'Yes', partial: 'Partly', no: 'No', unknown: 'Not stated' } as const
const cell = (c: Cell) => `${MARK[c.mark]}: ${c.text}`
const faqNamed = (...starts: string[]) => faqs.filter((f) => starts.some((s) => f.q.startsWith(s)))

const ONE_LINE = DISAMBIGUATION

const plansTable = () =>
  table(
    ['Plan', 'Monthly', 'Yearly', 'For', 'Items', 'People', 'Bank connections'],
    PLANS.map((p) => [p.name, p.month ? `$${p.month}/month` : 'Free', p.year ? `$${p.year}/year` : 'Free', p.forWho, p.limits.items, String(p.limits.people), String(p.limits.banks)]),
  )

function home(): MachinePage {
  const s = PRODUCTS.subly
  const body = [
    ONE_LINE,
    '',
    DEFAULT_DESCRIPTION,
    '',
    '## What it does',
    '',
    ...GROUPS.flatMap((g) => [`### ${g.title}`, '', ...ROWS.filter((r) => r.group === g.id).map((r) => `- ${r.label}: ${s.cells[r.id].text}`), '']),
    '## Pricing',
    '',
    plansTable(),
    '',
    `Every new account starts with a 14-day Business trial, no credit card needed. Lifetime-deal customers can add the newer features with the AI & Automation add-on at $${AI_ADDON.month}/month or $${AI_ADDON.year}/year. Details: ${absoluteUrl('/pricing')}`,
    '',
    '## Links',
    '',
    `- Sign up: ${SIGNUP_URL}`,
    `- The app: ${APP_URL}`,
    `- Compared with other subscription trackers: ${absoluteUrl('/compare')}`,
    `- Claude connector (MCP), REST API and webhooks: ${absoluteUrl('/agents')}`,
    `- Free tools: ${absoluteUrl('/tools')}`,
    '',
    faqBlock(faqs),
  ]
  return { path: '/', title: 'Subly: what it is, what it does and what it costs', description: DEFAULT_DESCRIPTION, section: 'Product', body: body.join('\n') }
}

function pricing(): MachinePage {
  const yesNo = (v: boolean | string) => (v === true ? 'Yes' : v === false ? 'No' : v)
  const body = [
    `${ONE_LINE} Prices are in US dollars.`,
    '',
    plansTable(),
    '',
    `Yearly billing costs about two months less than paying monthly. Every new account starts with a 14-day Business trial with no credit card; when it ends the account stays on Free unless a paid plan is chosen. Plans are month to month and can be cancelled at any time.`,
    '',
    ...PLANS.flatMap((p) => [`## ${p.name}${p.month ? `: $${p.month} a month or $${p.year} a year` : ': free'}`, '', `${p.forWho}.${p.includes ? ` ${p.includes}:` : ''}`, '', ...p.highlights.map((h) => `- ${h}`), '']),
    '## Lifetime deals',
    '',
    `Lifetime deals (for example from AppSumo) stay exactly as they are. The AI & Automation add-on adds statement reading, receipt forwarding, Ask, the Slack app and the Claude connector for $${AI_ADDON.month} a month or $${AI_ADDON.year} a year.`,
    '',
    '## Every feature by plan',
    '',
    ...featureGroups.flatMap((g) => [`### ${g.title}`, '', table(['Feature', ...PLAN_ORDER.map((id) => PLANS.find((p) => p.id === id)!.name)], g.rows.map((r) => [r.label, ...r.values.map(yesNo)])), '']),
    faqBlock(faqNamed('How many items', 'What plan should I choose', 'Do I need a credit card', 'Is there a contract', 'I have a lifetime deal', 'Does Subly connect to my bank')),
  ]
  return { path: '/pricing', title: 'Subly pricing', description: PAGES.pricing.description, section: 'Product', body: body.join('\n') }
}

function agents(): MachinePage {
  const body = [
    PAGES.agents.description,
    '',
    '- Claude connector: Subly speaks MCP (Model Context Protocol), so Claude and other MCP-compatible agents can read renewals, spend and cash, add items and assign owners.',
    `- REST API with an OpenAPI description: ${APP_URL}/api/v2/openapi.json`,
    '- Signed webhooks for every signal (renewal coming, price rise, charge after cancelling, refund window closing).',
    '- Zapier and Make recipes.',
    '',
    'The connector and API are part of Personal ($5 a month), Business and Team, and of the AI & Automation add-on for lifetime deals.',
    '',
    faqBlock(faqNamed('Can I use Subly with Claude')),
  ]
  return { path: '/agents', title: PAGES.agents.title, description: PAGES.agents.description, section: 'Product', body: body.join('\n') }
}

function about(): MachinePage {
  const body = [
    ABOUT.lede,
    '',
    ...ABOUT.sections.flatMap((s) => [`## ${s.title}`, '', ...s.paragraphs.flatMap((p) => [p, ''])]),
    '## In short',
    '',
    ...ABOUT.facts.map((f) => `- ${f.label}: ${f.value}`),
  ]
  return { path: '/about', title: PAGES.about.title, description: PAGES.about.description, section: 'Product', body: body.join('\n') }
}

const priceRows = (ids: ProductId[]) =>
  table(
    ['Product', ...SCENARIOS.map((s) => s.label)],
    ids.map((id) => [
      PRODUCTS[id].name,
      ...SCENARIOS.map((s) => {
        const q = PRODUCTS[id].quote(s)
        return q ? `${q.price}${q.monthly ? '/month' : ''} (${q.plan})${q.note ? `. ${q.note}` : ''}` : 'Not offered'
      }),
    ]),
  )

function compareHub(): MachinePage {
  const body = [
    `Subscription trackers for small businesses, side by side. Each vendor's own pricing and help pages were read on ${CHECKED}. "Not stated" means the vendor's site does not mention the feature; it does not mean no.`,
    '',
    '## Which one fits',
    '',
    ...HUB.choose.map((c) => `- ${c.when}: ${PRODUCTS[c.pick].name}`),
    '',
    '## What each costs with renewal alerts on',
    '',
    priceRows(PRODUCT_ORDER),
    '',
    '## Feature by feature',
    '',
    ...GROUPS.flatMap((g) => [
      `### ${g.title}`,
      '',
      table(['', ...PRODUCT_ORDER.map((id) => PRODUCTS[id].name)], ROWS.filter((r) => r.group === g.id).map((r) => [r.label, ...PRODUCT_ORDER.map((id) => cell(PRODUCTS[id].cells[r.id]))])),
      '',
    ]),
    '## One-to-one comparisons',
    '',
    ...COMPARISONS.map((c) => `- [${c.h1}](${absoluteUrl(markdownPath(c.meta.path))})`),
    '',
    faqBlock(HUB.faq),
  ]
  return { path: '/compare', title: HUB.meta.title, description: HUB.meta.description, section: 'Compare', body: body.join('\n') }
}

function comparisons(): MachinePage[] {
  return COMPARISONS.map((c) => {
    const them = PRODUCTS[c.competitor]
    const body = [
      c.verdict,
      '',
      `Checked against ${them.name}'s own pricing and help pages on ${CHECKED}.`,
      '',
      '## Where Subly is ahead',
      '',
      ...c.wins.flatMap((w) => [`### ${w.title}`, '', `Subly: ${w.us}. ${them.name}: ${w.them}.`, '', w.body, '']),
      `## What ${them.name} does well`,
      '',
      ...c.theyDoWell.map((t) => `- ${t}`),
      '',
      `Pick ${them.name} if: ${c.pickThem}`,
      '',
      '## What each costs',
      '',
      priceRows(['subly', c.competitor]),
      '',
      '## Line by line',
      '',
      table(['', 'Subly', them.name], ROWS.map((r) => [r.label, cell(PRODUCTS.subly.cells[r.id]), cell(them.cells[r.id])])),
      '',
      ...(c.footnote ? [c.footnote, ''] : []),
      ...(c.switching ? [`## Switching from ${them.name}`, '', ...c.switching.map((s, i) => `${i + 1}. ${s.title}. ${s.body}`), ''] : []),
      faqBlock(c.faq),
    ]
    return { path: c.meta.path, title: c.meta.title, description: c.meta.description ?? '', section: 'Compare' as const, body: body.join('\n') }
  })
}

function tools(): MachinePage[] {
  return Object.values(TOOLS).map((t) => {
    const body = [
      t.lede,
      '',
      `Use it, free and with no sign-up: ${absoluteUrl(t.meta.path)}`,
      '',
      `## ${t.answer.question}`,
      '',
      ...t.answer.paragraphs.flatMap((p) => [p, '']),
      '## How it works',
      '',
      ...t.steps.map((s, i) => `${i + 1}. ${s.title}. ${s.body}`),
      '',
      faqBlock(t.faq),
    ]
    return { path: t.meta.path, title: t.meta.title, description: t.meta.description ?? '', section: 'Free tools' as const, body: body.join('\n') }
  })
}

function personaPages(): MachinePage[] {
  return personaSlugs.map((slug) => {
    const p = personas[slug]
    const body = [
      p.sub,
      '',
      `## ${p.answer.question}`,
      '',
      ...p.answer.paragraphs.flatMap((x) => [x, '']),
      ...p.answer.points.map((x) => `- ${x}`),
      '',
      `## ${p.benefitsTitle}`,
      '',
      ...p.benefits.map((b) => `- ${b.title}: ${b.body}`),
      '',
      `Suggested plan: ${p.plan.name}. ${p.plan.line}`,
      '',
      faqBlock(p.faq),
    ]
    return { path: `/for/${slug}`, title: p.metaTitle, description: p.metaDescription, section: 'Who it is for' as const, body: body.join('\n') }
  })
}

/** Blog directives (:::tip[Title] … :::, ::cta[…]{…}) as plain Markdown */
const plainDirectives = (md: string) =>
  md
    .replace(/^::(?:cta|download)\[[^\]]*\](?:\{[^}]*\})?\s*$/gm, '')
    .replace(/^:::+\s*\w+\[([^\]]+)\]\s*$/gm, '**$1**')
    .replace(/^:::+\s*\w*\s*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

function posts(): MachinePage[] {
  return getPosts().map((post) => {
    const author = getAuthor(post.author)
    const updated = post.updatedAt && post.updatedAt !== post.publishedAt ? `, updated ${formatDate(post.updatedAt)}` : ''
    const body = [
      `By ${author.name}, ${author.role}. Published ${formatDate(post.publishedAt)}${updated}.`,
      '',
      post.lede,
      '',
      ...(post.summary.length ? ['## In short', '', ...post.summary.map((s) => `- ${s}`), ''] : []),
      plainDirectives(post.content),
      '',
      faqBlock(post.faq),
    ]
    return { path: `/blog/${post.slug}`, title: post.title, description: post.description, section: 'Guides' as const, body: body.join('\n') }
  })
}

let cache: MachinePage[] | undefined

export function machinePages(): MachinePage[] {
  cache ??= [home(), pricing(), agents(), about(), compareHub(), ...comparisons(), ...tools(), ...personaPages(), ...posts()]
  return cache
}

export const hasMarkdown = (path: string) => machinePages().some((p) => p.path === path)

/** One page as a Markdown document: title, where the HTML lives, then the body */
export function renderMarkdown(page: MachinePage) {
  return [`# ${page.title}`, '', `> ${page.description}`, '', `Source: ${absoluteUrl(page.path)}`, '', page.body.trim(), ''].join('\n')
}

const SECTIONS: MachinePage['section'][] = ['Product', 'Compare', 'Free tools', 'Who it is for', 'Guides']

/** /llms.txt: what Subly is and where each answer lives (llmstxt.org) */
export function llmsIndex() {
  const pages = machinePages()
  return [
    '# Subly',
    '',
    `> ${ONE_LINE} It reads a bank or card statement, a bank connection or forwarded receipts, finds what repeats, and warns before renewals, price rises and refund deadlines. Free up to 20 items; paid plans from $5 a month.`,
    '',
    `Website: ${SITE_URL}. App: ${APP_URL}. Made by an independent, bootstrapped team since 2021. Each page below is plain Markdown built from the same data as the website; prices and competitor facts carry the date they were checked.`,
    '',
    ...SECTIONS.flatMap((section) => [`## ${section}`, '', ...pages.filter((p) => p.section === section).map((p) => `- [${p.title}](${absoluteUrl(markdownPath(p.path))}): ${p.description}`), '']),
    '## Optional',
    '',
    `- [Everything in one file](${absoluteUrl('/llms-full.txt')}): all of the pages above`,
    `- [Changelog](${absoluteUrl('/releases')}): what shipped and when`,
    `- [API description (OpenAPI)](${APP_URL}/api/v2/openapi.json)`,
    `- [Privacy policy](${absoluteUrl('/legal/privacy-policy')})`,
    '',
  ].join('\n')
}

/** /llms-full.txt: every page, one after the other */
export function llmsFull() {
  return machinePages().map(renderMarkdown).join('\n---\n\n')
}
