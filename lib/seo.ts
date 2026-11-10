import { PLANS } from '@/lib/plans'
import { APP_URL, DEFAULT_DESCRIPTION, HOME_TITLE, SITE_NAME, SITE_URL, absoluteUrl } from '@/lib/site'

export const ORG_ID = `${SITE_URL}/#organization`
export const FOUNDER_ID = `${SITE_URL}/about#emilio`
export const SOFTWARE_ID = `${SITE_URL}/#software`

/** One sentence that says which Subly this is; the same words open /llms.txt and /about */
export const DISAMBIGUATION =
  'Subly (subly.app) is a web app that tracks subscriptions, bills, recurring revenue and cash flow for founders, freelancers and small teams. It is not related to the subtitling tool or the mobile apps that share the name.'

/**
 * Who we are, on every page. Many unrelated apps are called "Subly", so the entity says
 * plainly which one this is (subly.app, the subscription and cash-flow tracker), for search
 * engines and AI assistants alike. Add a profile to `sameAs` once it is ours (G2, Capterra,
 * Product Hunt, LinkedIn).
 */
export const SITE_JSONLD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: SITE_NAME,
      alternateName: ['Subly.app', 'Subly app'],
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      description:
        'Subly (subly.app) tracks subscriptions, bills, recurring revenue and cash flow for founders, freelancers and small teams.',
      disambiguatingDescription: DISAMBIGUATION,
      foundingDate: '2021',
      founder: { '@type': 'Person', '@id': FOUNDER_ID, name: 'Emilio Sanchez', jobTitle: 'Founder of Subly', url: `${SITE_URL}/about` },
      contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: 'hello@subly.app' },
      // Add a profile here once it is ours and filled in (G2, Capterra, Product Hunt, LinkedIn, AlternativeTo)
      sameAs: ['https://twitter.com/sublyweb'],
    },
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: SITE_NAME, alternateName: 'Subly.app', url: SITE_URL, publisher: { '@id': ORG_ID } },
  ],
}

const FEATURES = [
  'Finds recurring charges in a bank or card statement (PDF or CSV)',
  'Read-only bank connections in the US, Canada and Europe',
  'Receipt forwarding by email',
  'Alerts before renewals, price rises and refund deadlines by email, Slack, Microsoft Teams, Discord and Telegram',
  'Recurring revenue and client retainers next to costs',
  '13-week cash forecast',
  'An owner on every item, for teams',
  'Claude connector (MCP), REST API and signed webhooks',
  'AppSumo lifetime deal import',
]

const offer = (name: string, description: string, price: number, unit?: 'MON' | 'ANN') => ({
  '@type': 'Offer',
  name,
  description,
  price: String(price),
  priceCurrency: 'USD',
  url: `${SITE_URL}/pricing`,
  availability: 'https://schema.org/InStock',
  ...(unit ? { priceSpecification: { '@type': 'UnitPriceSpecification', price: String(price), priceCurrency: 'USD', billingDuration: 1, unitCode: unit } } : {}),
})

/**
 * Subly as a product, with one Offer per plan and billing period, so the prices a search
 * engine or an assistant reads are the ones in lib/plans.ts. On the home page and /pricing.
 */
export const SOFTWARE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': SOFTWARE_ID,
  name: SITE_NAME,
  alternateName: 'Subly.app',
  applicationCategory: 'FinanceApplication',
  applicationSubCategory: 'Subscription and recurring payment tracker',
  operatingSystem: 'Web',
  url: SITE_URL,
  installUrl: `${APP_URL}/signup`,
  description: DEFAULT_DESCRIPTION,
  disambiguatingDescription: DISAMBIGUATION,
  featureList: FEATURES,
  publisher: { '@id': ORG_ID },
  offers: PLANS.flatMap((p) =>
    p.month === 0
      ? [offer('Free', p.forWho, 0)]
      : [offer(`${p.name}, billed monthly`, p.forWho, p.month, 'MON'), offer(`${p.name}, billed yearly`, p.forWho, p.year, 'ANN')],
  ),
}

/**
 * What a page says about itself: <title>, description, canonical and social cards
 * (layouts/Site.astro writes the tags). Every page component exports one as `meta`.
 */
export type PageMeta = {
  title: string
  description?: string
  path: string
  type?: 'website' | 'article'
  /** The headline drawn on the Open Graph image, when it should differ from the title */
  ogTitle?: string
  /** A small label on the Open Graph card in place of the tagline (e.g. the blog category) */
  ogEyebrow?: string
  publishedTime?: string
  modifiedTime?: string
}

export const HOME_META: PageMeta = { title: HOME_TITLE, description: DEFAULT_DESCRIPTION, path: '/', ogTitle: '' }

/**
 * The Open Graph image for a page: a PNG drawn at build time by src/pages/og/[key].png.ts.
 * Keyed by path, so /blog/my-post → /og/blog--my-post.png. The home page's is /og/default.png.
 */
export const ogKey = (path: string) => (path === '/' ? 'default' : path.replace(/^\/|\/$/g, '').replaceAll('/', '--'))
export const ogImagePath = (path: string) => `/og/${ogKey(path)}.png`

/** The tags in <head>, as plain values */
export function headTags(meta: PageMeta) {
  const home = meta.path === '/'
  const fullTitle = home ? meta.title : `${meta.title} | ${SITE_NAME}`
  return {
    title: fullTitle,
    description: meta.description ?? DEFAULT_DESCRIPTION,
    canonical: home ? SITE_URL : absoluteUrl(meta.path),
    type: meta.type ?? 'website',
    image: absoluteUrl(ogImagePath(meta.path)),
    imageAlt: meta.title,
    publishedTime: meta.publishedTime,
    modifiedTime: meta.modifiedTime,
  }
}
