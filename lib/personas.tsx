import type { ReactNode } from 'react'
import type { Faq } from '@/lib/faq'

export type Persona = {
  slug: 'teams' | 'agencies' | 'founders' | 'households'
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
  /**
   * The question this page answers, answered in the first lines after the hero. Search engines
   * and AI assistants quote this kind of block, so it must stand on its own.
   */
  answer: { question: string; paragraphs: string[]; points: string[] }
  /** Questions people in this situation ask; shown before the shared ones and sent as FAQ data */
  faq: Faq[]
}

export const personas: Record<Persona['slug'], Persona> = {
  teams: {
    slug: 'teams',
    navLabel: 'Teams',
    metaTitle: 'Software subscription tracker for small teams',
    metaDescription:
      'Track every tool your team pays for, with an owner on each and a heads-up before renewals and price rises. Start from one statement, no bank login needed.',
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
      line: 'Business covers 10 people and 5 banks for $19 a month. Team covers 20 people and 10 banks for $49.',
    },
    closing: {
      title: 'Give every tool a name.',
      body: 'Upload one statement and see what your team really pays for.',
    },
    answer: {
      question: 'How does a small team keep track of the software it pays for?',
      paragraphs: [
        'Put every recurring charge in one list, give each one an owner, and send each renewal to that person before it charges. Subly gets you there without a migration: upload one bank or card statement and it finds the recurring charges for you, then you assign owners.',
        'From then on, the person who can decide hears about a renewal, a price rise or a charge after you cancelled, by email, in Slack or in Microsoft Teams. Anything without an owner shows up on Today until someone takes it.',
      ],
      points: [
        'Every tool, domain and retainer in one list, in any currency',
        'An owner on every item; unowned ones show up on Today',
        'Notes and mentions on items: "is anyone still using this?"',
        'Renewals, price rises and crossed budgets sent to the right person',
      ],
    },
    faq: [
      {
        q: 'How many people can use Subly?',
        a: 'Personal includes 3 people, Business 10 and Team 20. Everyone in the workspace sees the same list, and each item can have its own owner.',
      },
      {
        q: 'Can renewals go to Slack?',
        a: 'Yes. The Slack app is part of Business and Team, and each alert has Keep, Plan to cancel and Snooze buttons on it. Microsoft Teams, Discord and Telegram alerts are available from Personal, and email is on every plan.',
      },
      {
        q: 'Do we have to connect a bank account?',
        a: 'No. Upload a bank or card statement (PDF or CSV) and Subly finds the recurring charges, with no bank login. If you prefer, you can connect banks in the US, Canada and Europe through Plaid, read-only.',
      },
      {
        q: 'Is Subly a SaaS management platform?',
        a: 'It covers what a small team needs from one: what you pay for, who owns it and what renews when. It finds tools from your statements and receipts, and it does not cancel subscriptions or negotiate prices for you.',
      },
    ],
  },
  agencies: {
    slug: 'agencies',
    navLabel: 'Agencies',
    metaTitle: 'Track agency software costs and client retainers',
    metaDescription:
      'See what your agency pays for each client next to the retainer they pay you, with an owner on every tool. Late payments and renewals reach the right person.',
    eyebrow: 'For agencies and studios',
    title: <>Every tool and every retainer, by client.</>,
    ogTitle: 'Every tool and every retainer, by client.',
    sub: 'Subly groups what you pay for and what clients pay you by client, puts an owner on every tool, and tells the right person before a renewal, a price rise or a late retainer becomes your problem.',
    benefitsTitle: 'Know what each client really costs',
    benefits: [
      {
        title: 'A project per client',
        body: 'Put tools, domains and retainers in a project for each client. Set a budget, and Subly speaks up at 80% and again when it is crossed.',
      },
      {
        title: 'Late retainers on Today',
        body: 'When a client is late, the retainer shows up on Today with the amount, so nobody has to remember to check.',
      },
      {
        title: 'Owners and Slack',
        body: 'Every tool gets an owner. Renewals and price rises go to that person in Slack, with Keep, Plan to cancel and Snooze on the message.',
      },
    ],
    scenesTitle: 'A week at a small agency',
    scenes: [
      { label: 'Monday', line: 'The Webflow plan for Harbor & Co renews in 9 days. Sam owns it and gets the heads-up.' },
      { label: 'Wednesday', line: 'The Northlight project has used 82% of its $600 tools budget this month.' },
      { label: 'Friday', line: 'Fieldwork Studio is 5 days late on a $3,000 retainer. It shows up on Today.' },
    ],
    plan: {
      name: 'Business or Team',
      line: 'Business covers 10 people and 5 banks for $19 a month and adds the Slack app and Stripe import. Team covers 20 people and 10 banks for $49.',
    },
    closing: {
      title: 'See what each client really costs.',
      body: 'Upload one statement, then sort what you find by client.',
    },
    answer: {
      question: 'How do agencies track software costs and retainers per client?',
      paragraphs: [
        'Make a project for each client and put two kinds of items in it: the tools and services you pay for on their behalf, and the retainer they pay you. Give each tool an owner on your team. That is enough to see what each client costs, what they bring in, and who decides when something renews.',
        'Subly builds the list from a bank or card statement, so you sort charges into clients instead of typing them in. After that it watches for renewals, price rises, crossed budgets and late retainers, and tells the owner by email or in Slack.',
      ],
      points: [
        'Tools and retainers grouped by client, with budgets',
        'An owner on every tool; unowned ones show up on Today',
        'Late retainers and price rises flagged',
        'Recurring revenue imported from Stripe (Business and Team)',
      ],
    },
    faq: [
      {
        q: 'Can I bill tools back to clients with Subly?',
        a: 'Subly does not send invoices. It shows what you pay for each client, so you know what to bill back, and you can share a clean view-only copy of the month with your accountant.',
      },
      {
        q: 'How many people on my team can use it?',
        a: 'Business includes 10 people and Team 20. Each tool can have its own owner, and notes and mentions keep questions next to the charge.',
      },
      {
        q: 'Can renewals go to Slack?',
        a: 'Yes. The Slack app is part of Business and Team, and each alert has Keep, Plan to cancel and Snooze buttons on it. Microsoft Teams, Discord and Telegram alerts are available from Personal, and email is on every plan.',
      },
      {
        q: 'What if clients pay in other currencies?',
        a: 'Each retainer and tool keeps its own currency, and totals are shown in yours, with rates refreshed daily. Subly supports more than 150 currencies.',
      },
    ],
  },
  founders: {
    slug: 'founders',
    navLabel: 'Founders and freelancers',
    metaTitle: 'Subscription and revenue tracker for founders and freelancers',
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
      line: 'Personal is $5 a month. Business is $19 a month and adds more people and banks, the Slack app, the 13-week view of how long your money lasts and priority support. The Claude connector and API are already in Personal.',
    },
    closing: {
      title: 'See what is left, in plain words.',
      body: 'Upload one statement and get your first total in a couple of minutes.',
    },
    answer: {
      question: 'How do founders and freelancers keep track of recurring money?',
      paragraphs: [
        'Track both sides in one place: the software you pay for and the retainers or subscriptions clients pay you. The difference is what is left each month, and it tells you whether you can take on a new tool, a hire or a slow month.',
        'Subly builds that picture from a bank or card statement in a couple of minutes, keeps each item in its own currency and totals it in yours. Then it tells you when a client pays late, a price goes up or a lifetime deal is about to leave its refund window. On Business, the 13-week forecast shows how long your money lasts and lets you test a cancel or a price change before you commit.',
      ],
      points: [
        'Money in next to money out, in 150+ currencies',
        'Late client payments and price rises on Today',
        'AppSumo import, with refund windows tracked',
        'Recurring revenue imported from Stripe (Business and Team)',
      ],
    },
    faq: [
      {
        q: 'Can Subly track the money clients pay me?',
        a: 'Yes. Add retainers, subscriptions you sell and payouts as money coming in, or import recurring revenue from Stripe on Business and Team. Subly tells you when a payment is late.',
      },
      {
        q: 'I get paid in one currency and pay in another. Does that work?',
        a: 'Yes. Every item keeps its own currency and totals are shown in yours, with rates refreshed daily. Subly supports more than 150 currencies.',
      },
      {
        q: 'How does Subly handle AppSumo lifetime deals?',
        a: 'Import your AppSumo export (Account → Products → export purchases as CSV) on any plan, Free included. Subly lists what you paid and how many days are left to ask for a refund.',
      },
      {
        q: 'Can I ask Claude about my spending?',
        a: 'Yes. From Personal, the Claude connector lets you ask what renews this quarter or where the money goes, add items and set owners. It checks with you before it changes anything.',
      },
    ],
  },
  households: {
    slug: 'households',
    navLabel: 'Households',
    metaTitle: 'Household subscription and bill tracker',
    metaDescription:
      'One private list of every subscription and recurring bill in your home, with an email before each renewal. Start from a statement, no bank login needed.',
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
      line: 'Free tracks up to 20 items. Personal is $5 a month or $48 a year, with unlimited items, 3 people, statement reading and the Claude connector.',
    },
    closing: {
      title: 'Find out what you really pay for.',
      body: 'Upload one statement and see everything that repeats.',
    },
    answer: {
      question: 'How do I find every subscription my household pays for?',
      paragraphs: [
        'Start from a bank or card statement: everything that repeats on it is a subscription or a bill. Subly reads the statement for you (PDF or CSV, no bank login needed) and lists each recurring charge with what it costs a month and a year.',
        'After that you get an email before a renewal or a price rise, so you decide while you can still cancel. Free tracks up to 20 items; Personal is unlimited and shared with up to 3 people.',
      ],
      points: [
        'Streaming, insurance, memberships and bills in one list',
        'An email before renewals and price rises',
        'Charges after you cancelled, flagged',
        'One shared list for up to 3 people on Personal',
      ],
    },
    faq: [
      {
        q: 'Is there a free plan?',
        a: 'Yes. Free tracks up to 20 items, reads one statement and sends email alerts, with no time limit. New accounts start with a 14-day Business trial and keep Free afterwards.',
      },
      {
        q: 'Do I have to give Subly my bank login?',
        a: 'No. Upload a statement instead and Subly never needs a bank login. If you do connect a bank, it goes through Plaid: your login never reaches Subly and the connection is read-only.',
      },
      {
        q: 'Will Subly cancel subscriptions for me?',
        a: 'No. Subly tells you what renews and what looks forgotten, and you cancel with the provider. It also flags a charge that arrives after you cancelled.',
      },
      {
        q: 'Can my partner see the same list?',
        a: 'Yes. Personal includes 3 people, and everyone sees the same list.',
      },
    ],
  },
}

export const personaSlugs = Object.keys(personas) as Persona['slug'][]
