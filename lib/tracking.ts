/**
 * Traks custom events the tag cannot see on its own. A no-op wherever the tag is not
 * loaded (previews, local builds, ad blockers): `window.traks` only exists on subly.app.
 *
 * - `signup_click` with `placement` (the link's data-cta) and `page`, so we can tell which
 *   sign-up button works. The tag's own outbound-link event still fires as well.
 * - `pricing_viewed` once per tab, on /pricing or when the home page pricing section
 *   scrolls into view. The "Pricing seen" goal and the pricing funnels count this event.
 */
import { SIGNUP_URL } from '@/lib/site'

declare global {
  interface Window {
    traks?: (name: string, props?: Record<string, string | number | boolean>, value?: number) => void
  }
}

export function send(name: string, props?: Record<string, string>) {
  try {
    window.traks?.(name, props)
  } catch {
    // analytics never breaks the page
  }
}

const PRICING_KEY = 'subly:pricing_viewed'

function pricingViewed(page: string) {
  try {
    if (sessionStorage.getItem(PRICING_KEY)) return
    sessionStorage.setItem(PRICING_KEY, '1')
  } catch {
    // storage blocked: send anyway, a duplicate is better than nothing
  }
  send('pricing_viewed', { page })
}

/**
 * Where this visit came from, carried to the app on the sign-up link so Traks on web.subly.app
 * tags the sign-up session with it (the tag reads utm_source, utm_medium and utm_campaign from
 * the URL) and the app can store it on the new account.
 *
 * Captured on the first page of the tab and kept in sessionStorage (gone when the tab closes).
 * A visit that came with utm_* params keeps them. One without gets them from the first touch,
 * so organic visits show up in Traks attribution too:
 *   utm_source   the site that sent the visitor (google.com, chatgpt.com, reddit.com)
 *   utm_medium   organic (search engines), ai (assistants) or referral (anything else)
 *   utm_campaign the first page they saw (/blog/saas-subscription-audit)
 * `ref` and `landing` are always added as well. A direct visit (no referrer, no utm) adds only `landing`.
 */
const SOURCE_KEY = 'subly:first_touch'
const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const
export type Source = Partial<Record<(typeof UTM)[number] | 'ref' | 'landing', string>>

const SEARCH = /(^|\.)(google\.[a-z.]+|bing\.com|duckduckgo\.com|search\.brave\.com|yahoo\.com|ecosia\.org|startpage\.com|yandex\.[a-z]+|baidu\.com|qwant\.com|kagi\.com)$/
const AI = /(^|\.)(chatgpt\.com|openai\.com|perplexity\.ai|claude\.ai|gemini\.google\.com|copilot\.microsoft\.com|you\.com|phind\.com|meta\.ai|grok\.com|deepseek\.com|mistral\.ai)$/

export const mediumOf = (host: string) => (AI.test(host) ? 'ai' : SEARCH.test(host) ? 'organic' : 'referral')

const ownHost = (host: string) => host === 'subly.app' || host.endsWith('.subly.app') || host === 'localhost'

export function sourceOf(url: URL, referrer: string): Source {
  const source: Source = { landing: url.pathname.slice(0, 200) }
  for (const key of UTM) {
    const value = url.searchParams.get(key)?.trim()
    if (value) source[key] = value.slice(0, 200)
  }
  try {
    const host = new URL(referrer).hostname.toLowerCase().replace(/^www\./, '')
    if (host && !ownHost(host)) source.ref = host
  } catch {
    // no referrer, or not a URL
  }
  // Some assistants send no referrer but tag their links (?utm_source=chatgpt.com)
  if (!source.utm_source && source.ref) {
    source.utm_source = source.ref
    source.utm_medium = mediumOf(source.ref)
    source.utm_campaign = source.landing
  } else if (source.utm_source && !source.utm_medium && /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(source.utm_source)) {
    // ChatGPT and others add only ?utm_source=chatgpt.com
    source.utm_medium = mediumOf(source.utm_source.replace(/^www\./, ''))
  }
  return source
}

/** The visit's source as captured on its first page (for links built in code, like the free tools' buttons) */
export function currentSource(): Source {
  try {
    const saved = sessionStorage.getItem(SOURCE_KEY)
    if (saved) return JSON.parse(saved) as Source
  } catch {
    // storage blocked
  }
  return sourceOf(new URL(window.location.href), document.referrer)
}

function firstTouch(): Source {
  const current = sourceOf(new URL(window.location.href), document.referrer)
  try {
    const saved = sessionStorage.getItem(SOURCE_KEY)
    if (saved) return JSON.parse(saved) as Source
    sessionStorage.setItem(SOURCE_KEY, JSON.stringify(current))
  } catch {
    // storage blocked: this page is the best we know
  }
  return current
}

/** The sign-up link with the visit's source added; params already on the link win */
export function withSource(href: string, source: Source): string {
  const url = new URL(href)
  for (const [key, value] of Object.entries(source)) if (value && !url.searchParams.has(key)) url.searchParams.set(key, value)
  return url.toString()
}

const SIGNUP = new URL(SIGNUP_URL)

/**
 * Add the source to a sign-up link as it is followed, then put the link back. This runs in the
 * bubble phase on window, after the Traks tag (capture phase on document) has recorded the click,
 * so its outbound-link event still carries exactly https://web.subly.app/signup and the
 * "Sign-up click (to app)" goal keeps matching. The browser follows the href as it is when the
 * event finishes, so the tagged address is the one that opens, in this tab or a new one.
 */
function tagSignupLinks(source: Source) {
  const tag = (e: MouseEvent) => {
    if (e.defaultPrevented) return
    const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
    if (!a || a.hostname !== SIGNUP.hostname || a.pathname !== SIGNUP.pathname) return
    const original = a.getAttribute('href')
    if (original === null) return
    a.href = withSource(a.href, source)
    setTimeout(() => a.setAttribute('href', original), 0)
  }
  window.addEventListener('click', tag)
  window.addEventListener('auxclick', tag)
}

export function startTracking() {
  tagSignupLinks(firstTouch())

  document.addEventListener('click', (e) => {
    const link = (e.target as Element | null)?.closest?.('a[data-cta]')
    if (!link) return
    send('signup_click', { placement: link.getAttribute('data-cta') ?? 'unknown', page: window.location.pathname })
  })

  const pathname = window.location.pathname
  if (pathname === '/pricing') {
    pricingViewed(pathname)
    return
  }
  const section = document.getElementById('pricing')
  if (!section) return
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      pricingViewed(pathname)
      io.disconnect()
    },
    { threshold: 0.25 },
  )
  io.observe(section)
}
