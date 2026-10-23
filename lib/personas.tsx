import type { ReactNode } from 'react'

export type Persona = {
  slug: 'teams' | 'founders' | 'households'
  navLabel: string
  metaTitle: string
  metaDescription: string
  eyebrow: string
  title: ReactNode
  ogTitle: string
  sub: string
  benefitsTitle: string
  benefits: { title: string; body: string }[]
  scenesTitle: string
  scenes: { label: string; line: string }[]
  plan: { name: string; line: string }
  closing: { title: string; body: string }
}

export const personas: Record<Persona['slug'], Persona> = {
  teams: {
    slug: 'teams',
    navLabel: 'Teams',
    metaTitle: 'Subly for teams: an owner on every tool',
    metaDescription:
      'Put a name next to every tool and renewal. Subly tells the right person before a renewal, a price rise or a late client payment becomes a problem.',
    eyebrow: 'For teams and agencies',
    title: (
      <>
        An owner on every tool. No surprise renewals.
      </>
    ),
    ogTitle: 'An owner on every tool. No surprise renewals.',
    sub: 'Subly puts a name next to every tool and client retainer, and tells the right person before a renewal, a price rise or a late payment turns into your problem.',
    benefitsTitle: 'Everyone knows who decides',
    benefits: [
      {
        title: 'Owners on every item',
        body: 'Assign each tool to a person. Items nobody owns show up on Today, so the expensive ones never go unclaimed.',
      },
      {
        title: 'Notes and mentions',
        body: 'Ask "is anyone still using this?" right on the item and mention the person who knows. It lands in their Inbox.',
      },
      {
        title: 'Slack and Microsoft Teams',
        body: 'Renewals and price rises arrive where the team already talks. Keep, plan to cancel or snooze from the message.',
      },
    ],
    scenesTitle: 'What a week looks like',
    scenes: [
      { label: 'Monday', line: 'Webflow renews in 9 days and has no owner. Subly asks who should take it.' },
      { label: 'Wednesday', line: 'Figma went up from $12 to $15 a seat. Dana gets a note and decides.' },
      { label: 'Friday', line: 'Northlight is 3 days late on a $2,500 retainer. It shows up on Today.' },
    ],
    plan: {
      name: 'Business or Team',
      line: 'Business covers 8 people and 3 banks for $19 a month. Team covers 20 people and 10 banks for $49.',
    },
    closing: {
      title: 'Give every tool a name.',
      body: 'Upload one statement and see what your team really pays for.',
    },
  },
  founders: {
    slug: 'founders',
    navLabel: 'Founders and freelancers',
    metaTitle: 'Subly for founders and freelancers',
    metaDescription:
      'See what clients pay you next to what you pay for tools, in any currency, and catch lifetime deals before the refund window closes.',
    eyebrow: 'For founders and freelancers',
    title: (
      <>
        Know what is left after the tools and the clients.
      </>
    ),
    ogTitle: 'Know what is left after the tools and the clients.',
    sub: 'Subly shows what clients pay you next to what you pay for software, in any currency. It flags the lifetime deals you can still refund and tells you when someone pays late.',
    benefitsTitle: 'One picture of the whole business',
    benefits: [
      {
        title: 'Money in next to money out',
        body: 'Retainers and subscriptions you sell sit beside your costs. You see what is left each month, not just what you spend.',
      },
      {
        title: 'Any currency, one total',
        body: 'Pay in euros, get paid in pounds, report in dollars. Every item keeps its own currency.',
      },
      {
        title: 'Lifetime deals, tracked',
        body: 'Import your AppSumo export. See what you paid, what you actually use, and the days left to get a refund.',
      },
    ],
    scenesTitle: 'The things you would have missed',
    scenes: [
      { label: 'Refund window', line: 'Calmy can still be refunded for 7 days. Nobody has used it yet.' },
      { label: 'Late payment', line: 'Coastline Bakery is 3 days late. £1,200 was due on the 1st.' },
      { label: 'Price rise', line: 'Notion Plus went from $10 to $12. Paying yearly would save $24.' },
    ],
    plan: {
      name: 'Personal or Business',
      line: 'Personal is $5 a month. Business is $19 a month and adds more banks, the Slack app, the 13-week view of how long your money lasts, and the Claude connector.',
    },
    closing: {
      title: 'See what is left, in plain words.',
      body: 'Upload one statement and get your first total in a couple of minutes.',
    },
  },
  households: {
    slug: 'households',
    navLabel: 'Households',
    metaTitle: 'Subly for households',
    metaDescription:
      'A calm, private place for every subscription and recurring bill your household pays, with a heads-up before each renewal.',
    eyebrow: 'For households',
    title: (
      <>
        Stop paying for things you forgot you had.
      </>
    ),
    ogTitle: 'Stop paying for things you forgot you had.',
    sub: 'One calm place for every subscription and recurring bill in your home. Subly tells you before each renewal and shows what it all adds up to.',
    benefitsTitle: 'Calm, private and easy',
    benefits: [
      {
        title: 'See the total',
        body: 'Streaming, insurance, memberships and bills in one list, with what they cost a month and a year.',
      },
      {
        title: 'A heads-up before each renewal',
        body: 'Get an email before a big renewal or a price rise, and decide while you still can.',
      },
      {
        title: 'Share it with your household',
        body: 'Personal includes 3 people, and everyone sees the same list. Your data stays yours and you can download it any time.',
      },
    ],
    scenesTitle: 'Small things that add up',
    scenes: [
      { label: 'Price rise', line: 'Your streaming plan went up $2 a month. That is $24 a year.' },
      { label: 'Charged after cancelling', line: 'A gym charged you on Oct 14. You cancelled it on Sep 3.' },
      { label: 'Yearly renewal', line: 'Your antivirus renews in 13 days for $89.' },
    ],
    plan: {
      name: 'Free or Personal',
      line: 'Free tracks up to 20 items. Personal is $5 a month or $48 a year, with unlimited items, 3 people and statement reading.',
    },
    closing: {
      title: 'Find out what you really pay for.',
      body: 'Upload one statement and see everything that repeats.',
    },
  },
}

export const personaSlugs = Object.keys(personas) as Persona['slug'][]
