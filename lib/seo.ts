import { DEFAULT_DESCRIPTION, HOME_TITLE, SITE_NAME, SITE_URL, absoluteUrl } from '@/lib/site'

export const ORG_ID = `${SITE_URL}/#organization`

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
      sameAs: ['https://twitter.com/sublyweb'],
    },
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: SITE_NAME, alternateName: 'Subly.app', url: SITE_URL, publisher: { '@id': ORG_ID } },
  ],
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
