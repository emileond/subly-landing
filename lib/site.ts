export const SITE_URL = 'https://subly.app'
export const APP_URL = 'https://web.subly.app'
export const SIGNUP_URL = `${APP_URL}/signup`
export const LOGIN_URL = `${APP_URL}/login`

export const SITE_NAME = 'Subly'
export const DEFAULT_DESCRIPTION =
  'Subly watches your recurring money, in and out, and tells you what needs a decision. For small teams, solo founders and freelancers.'

export const NAV_LINKS = [
  { label: 'Product', href: '/#how-it-works' },
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
