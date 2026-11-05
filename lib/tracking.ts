/**
 * Traks custom events the tag cannot see on its own. A no-op wherever the tag is not
 * loaded (previews, local builds, ad blockers): `window.traks` only exists on subly.app.
 *
 * - `signup_click` with `placement` (the link's data-cta) and `page`, so we can tell which
 *   sign-up button works. The tag's own outbound-link event still fires as well.
 * - `pricing_viewed` once per tab, on /pricing or when the home page pricing section
 *   scrolls into view. The "Pricing seen" goal and the pricing funnels count this event.
 */
declare global {
  interface Window {
    traks?: (name: string, props?: Record<string, string | number | boolean>, value?: number) => void
  }
}

function send(name: string, props?: Record<string, string>) {
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

export function startTracking() {
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
