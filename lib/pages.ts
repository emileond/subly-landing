import { HOME_META, type PageMeta } from '@/lib/seo'

/**
 * Every fixed page: its metadata (read by the page itself, the Open Graph images and the
 * sitemap) and its sitemap priority. Blog posts, releases and persona pages are added from
 * their own sources in lib/routes.ts.
 */
export const PAGES = {
  home: { ...HOME_META, priority: 1 },
  pricing: {
    title: 'Pricing',
    description:
      'Free, Personal at $5 a month, Business at $19 and Team at $49. Every new account starts with a 14-day Business trial.',
    path: '/pricing',
    priority: 0.9,
  },
  agents: {
    title: 'Subly for Claude and AI agents',
    description:
      'Connect Claude or any MCP-compatible agent to Subly. Ask about renewals, spend and cash, add items and assign owners, with a REST API, signed webhooks and Zapier and Make.',
    path: '/agents',
    ogTitle: 'Your AI finally knows your money.',
    priority: 0.8,
  },
  blog: {
    title: 'Blog',
    description: 'Practical guides on subscriptions, renewals, cash flow and software spend for founders, freelancers and small teams.',
    path: '/blog',
    priority: 0.7,
  },
  releases: {
    title: 'Changelog',
    description: 'Everything new in Subly: features, improvements and fixes, newest first.',
    path: '/releases',
    priority: 0.7,
  },
  currencyConverter: {
    title: 'Currency converter',
    description: 'Convert any amount between more than 100 currencies at current exchange rates. Rates are refreshed twice a day.',
    path: '/currency-converter',
    priority: 0.6,
  },
  roadmap: {
    title: 'Roadmap',
    description: 'What the Subly team is working on now, next and later.',
    path: '/roadmap',
    priority: 0.5,
  },
  affiliates: {
    title: 'Join our affiliate program',
    description: 'Partner with Subly and earn a recurring 30% commission for every referral.',
    path: '/affiliates',
    priority: 0.5,
  },
  manifesto: {
    title: 'Manifesto',
    description: 'Why Subly is an independent, bootstrapped product that answers to the people who use it.',
    path: '/manifesto',
    priority: 0.4,
  },
  privacy: {
    title: 'Privacy policy',
    description: 'What information Subly collects, how it is used and how it is protected.',
    path: '/legal/privacy-policy',
    priority: 0.2,
  },
  terms: {
    title: 'Terms of service',
    description: 'The terms that govern your use of Subly.',
    path: '/legal/terms',
    priority: 0.2,
  },
  cookies: {
    title: 'Cookie policy',
    description: 'How Subly uses cookies and similar technologies.',
    path: '/legal/cookie-policy',
    priority: 0.2,
  },
  acceptableUse: {
    title: 'Acceptable use policy',
    description: 'What you can and cannot do with Subly.',
    path: '/legal/acceptable-use',
    priority: 0.2,
  },
} satisfies Record<string, PageMeta & { priority: number }>
