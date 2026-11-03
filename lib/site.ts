export const SITE_URL = 'https://subly.app'
export const APP_URL = 'https://web.subly.app'
export const SIGNUP_URL = `${APP_URL}/signup`
export const LOGIN_URL = `${APP_URL}/login`

export const SITE_NAME = 'Subly'
export const DEFAULT_DESCRIPTION =
  'Subly brings every payment, in and out, into one clear picture, warns you before it matters and tells you your next move. Built into how you work, and ready for your agents.'

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
