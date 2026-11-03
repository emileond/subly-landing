export const SITE_URL = 'https://subly.app'
export const APP_URL = 'https://web.subly.app'
export const SIGNUP_URL = `${APP_URL}/signup`
export const LOGIN_URL = `${APP_URL}/login`

export const SITE_NAME = 'Subly'
export const HOME_TITLE = 'Subly: track subscriptions, bills and cash flow for your business'
export const DEFAULT_DESCRIPTION =
  'Subly watches every payment in and out, remembers every renewal and tells you what to do next. For founders, freelancers and small teams. Free 14-day trial, no credit card needed.'

export const NAV_LINKS = [
  { label: 'Product', href: '/#value' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Changelog', href: '/releases' },
] as const

export const PERSONAS = [
  { slug: 'teams', label: 'Teams' },
  { slug: 'founders', label: 'Founders and freelancers' },
  { slug: 'households', label: 'Households' },
] as const

export function absoluteUrl(path = '/') {
  return new URL(path, SITE_URL).toString()
}
