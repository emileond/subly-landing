// Security headers for every response on subly.app (next.config.mjs → headers()).
// Mirrors subly-web/headers.js, with two differences for a marketing site:
//
// - HSTS covers subly.app only. includeSubDomains (and preload) would force HTTPS on every
//   subdomain, including ones we don't serve here (email link tracking, umami, affiliates);
//   add it once each of those is known to answer on HTTPS.
// - The CSP is deliberately not a script/style allowlist. The site loads GetTerms, Umami, Traks,
//   Partnero and Crisp, which pull in further hosts of their own, and an allowlist that misses one
//   breaks the page silently. What it does enforce: nobody else can frame the site (clickjacking),
//   no <base> hijacking, no plugin content, and any stray http:// subresource is upgraded.
const contentSecurityPolicy = [
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

export const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  // For browsers that predate frame-ancestors
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // The site uses none of these device APIs
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  // Popups stay allowed: Outstatic's GitHub sign-in and the Crisp chat may open them
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
]
