/**
 * /about, as data: the page, its Markdown twin and its structured data all read from here.
 * It exists so that anyone, a person or an AI assistant, can tell which Subly this is, who
 * makes it and what it does and does not do. Product claims follow docs/blog-writing-guide.md.
 */
export const ABOUT = {
  h1: 'About Subly',
  lede: 'Subly is a web app that tracks every recurring payment in and out of a small business, and tells you what needs a decision before the money moves.',
  sections: [
    {
      title: 'What Subly is',
      paragraphs: [
        'Subly keeps one list of the money that repeats: software, tools, domains, insurance and lifetime deals going out, and client retainers, payouts and subscriptions you sell coming in. Each item keeps its own currency, with totals in yours.',
        'You do not have to type the list. Upload a bank or card statement (PDF or CSV, no bank login needed), forward receipts to your own Subly address, connect a bank in the US, Canada or Europe, or import an AppSumo export. Subly finds what repeats and shows what renews soon, what went up and what looks forgotten.',
        'From then on it speaks up before a renewal, a price rise, a refund deadline or a late client payment, by email, Slack, Microsoft Teams, Discord or Telegram. You can also ask it questions in plain words, or connect Claude through the Subly connector.',
      ],
    },
    {
      title: 'Who it is for',
      paragraphs: [
        'Founders, freelancers, agencies and small teams who want to see where their money goes without hiring a finance team or learning accounting software. Households use it too.',
        'More than 26,000 accounts have been opened since 2021.',
      ],
    },
    {
      title: 'Who makes it',
      paragraphs: [
        'Subly is built by Emilio Sanchez, who started it in 2021. It is independent and bootstrapped: there are no investors, so the product answers to the people who use it.',
      ],
    },
    {
      title: 'What Subly is not',
      paragraphs: [
        'Subly is read-only. It can see transactions, but it cannot move money, pay anyone or cancel a subscription for you. It does not replace an accountant or accounting software, and it does not close books or file taxes.',
        'Several unrelated products share the name. This Subly lives at subly.app and web.subly.app. It is not the subtitling and transcription tool, and it is not any of the mobile apps called Subly in the app stores.',
      ],
    },
  ],
  facts: [
    { label: 'Website', value: 'subly.app' },
    { label: 'App', value: 'web.subly.app' },
    { label: 'Started', value: '2021' },
    { label: 'Founder', value: 'Emilio Sanchez' },
    { label: 'Funding', value: 'Independent, bootstrapped' },
    { label: 'Plans', value: 'Free, Personal $5, Business $19 and Team $49 a month' },
    { label: 'Languages', value: 'English, Spanish, Portuguese (Brazil), French, German, Italian, Norwegian, Swedish, Danish' },
    { label: 'Contact', value: 'hello@subly.app' },
  ],
} as const
