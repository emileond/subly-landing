import type { Faq } from '@/lib/faq'
import type { PageMeta } from '@/lib/seo'

/**
 * The free tools on subly.app. Each one answers its question on the page, with no sign-up, and
 * ends with one button that sends what the visitor entered into Subly (lib/handoff.ts). The
 * words here follow docs/blog-writing-guide.md: outcomes first, only claims the guide allows.
 */
export type Tool = {
  slug: string
  /** Short name in lists and the hub */
  name: string
  meta: PageMeta
  eyebrow: string
  h1: string
  lede: string
  /** The question the page answers, answered in a few sentences: what AI assistants quote */
  answer: { question: string; paragraphs: string[] }
  steps: { title: string; body: string }[]
  faq: Faq[]
  /** One line for the hub */
  blurb: string
}

const tool = (t: Omit<Tool, 'meta'> & { title: string; description: string; ogTitle?: string }): Tool => ({
  ...t,
  meta: { title: t.title, description: t.description, path: `/tools/${t.slug}`, ogTitle: t.ogTitle ?? t.h1, ogEyebrow: 'Free tool' },
})

export const TOOLS = {
  appsumo: tool({
    slug: 'appsumo-refund-checker',
    name: 'AppSumo refund checker',
    title: 'AppSumo refund checker: days left on every deal',
    description: 'Upload your AppSumo export or type in a deal and see which purchases you can still refund, how many days are left and when each 60-day window closes.',
    eyebrow: 'Free tool',
    h1: 'Which AppSumo deals can you still refund?',
    lede: 'Upload your AppSumo export or add a deal by hand. You will see every deal you can still refund and how many days are left, in seconds. The file is read in your browser.',
    blurb: 'See which AppSumo deals you can still refund and how many days are left.',
    answer: {
      question: 'How long do you have to refund an AppSumo deal?',
      paragraphs: [
        'AppSumo gives you 60 days from the purchase date to ask for a refund on most deals. Check the deal page for its own terms, since some deals differ. After the window closes, the purchase is yours whether you use it or not.',
        'The quickest way to check every deal at once is your purchase history: on AppSumo, open Account → Products and export it as a CSV. Drop that file in the checker above and it lists the deals still inside their window, with the days left and the date each one closes.',
      ],
    },
    steps: [
      { title: 'Export your purchases', body: 'On AppSumo, go to Account → Products and export your purchases as a CSV.' },
      { title: 'Drop the file in', body: 'The checker reads it in your browser. Refunded, transferred and non-tool purchases are left out.' },
      { title: 'Decide before the window closes', body: 'Open deals are sorted by days left. Anything under a week is marked.' },
    ],
    faq: [
      { q: 'Is my AppSumo export uploaded anywhere?', a: 'No. The file is read in your browser and nothing leaves your device unless you press the button to send your deals to Subly.' },
      { q: 'How many days do I have to refund an AppSumo purchase?', a: 'Most deals have a 60-day refund window from the purchase date. Some deals have their own terms, so check the deal page if you are unsure.' },
      { q: 'Where do I find my AppSumo purchase history?', a: 'Sign in to AppSumo and open Account → Products. The export button downloads your purchases as a CSV file.' },
      { q: 'Can Subly remind me before a refund window closes?', a: 'Yes. Subly tracks lifetime deals on every plan, Free included, and tells you before a refund window closes. The Free plan tracks up to 20 items.' },
    ],
  }),
  runway: tool({
    slug: 'runway-calculator',
    name: 'Cash runway calculator',
    title: 'Cash runway calculator for small businesses',
    description: 'Enter your cash, what comes in and what goes out each month, and see how many weeks your money lasts, week by week for the next 13 weeks. Free, no sign-up.',
    eyebrow: 'Free tool',
    h1: 'How long will your cash last?',
    lede: 'Enter what is in the bank and what comes in and goes out on repeat. You will see your runway and the next 13 weeks, and you can switch off a cost to see what cancelling it changes.',
    blurb: 'See how many weeks your cash lasts, and what cancelling a cost would change.',
    answer: {
      question: 'How do you calculate cash runway?',
      paragraphs: [
        'Runway is the cash you have divided by how much more you spend than you take in each month. With $30,000 in the bank, $8,000 coming in and $11,000 going out, you burn $3,000 a month, so the cash lasts 10 months. If more comes in than goes out, there is no runway to count: your cash grows.',
        'The number is only as good as the list behind it. Count every recurring cost, including the yearly ones (divide them by 12), and only the income you can rely on, like retainers and subscriptions. A 13-week view, week by week, shows the dip before a big renewal that a monthly average hides.',
      ],
    },
    steps: [
      { title: 'Start with your cash', body: 'Enter what is in the bank today, across your business accounts.' },
      { title: 'List what repeats', body: 'Add what comes in and goes out each week, month or year. Yearly costs are spread across the months.' },
      { title: 'Test a change', body: 'Switch a line off to see how a cancel or a lost client moves your runway.' },
    ],
    faq: [
      { q: 'What is a good cash runway for a small business?', a: 'There is no single number. Plan for several months of costs, and more when income is uneven. What matters most is seeing a shortfall weeks ahead, while you can still act on it.' },
      { q: 'Should yearly subscriptions count in my runway?', a: 'Yes. Divide a yearly charge by 12 so it counts every month. In Subly, the 13-week forecast also shows the week a yearly charge actually lands.' },
      { q: 'Is anything I enter saved?', a: 'No. The calculator runs in your browser and nothing is stored unless you press the button to send your numbers to Subly.' },
      { q: 'How is this different from Subly’s forecast?', a: 'This calculator spreads everything evenly across the weeks. Subly’s 13-week forecast is built from each item’s real dates and lets you test a cancel or a price change before you commit. It is part of the Business and Team plans.' },
    ],
  }),
  scan: tool({
    slug: 'find-subscriptions',
    name: 'Subscription finder',
    title: 'Find every subscription on your bank statement, free',
    description: 'Upload a bank or card statement and see every recurring charge, what it costs a year, what went up in price and what renews soon. Free, no bank login.',
    eyebrow: 'Free tool',
    h1: 'Find every subscription on your statement',
    lede: 'Upload a bank or card statement as a PDF or CSV. In about a minute you will see everything that repeats, what it costs a year, what went up and what renews in the next two weeks.',
    blurb: 'Upload a statement and see every recurring charge, with price rises and renewals coming up.',
    answer: {
      question: 'How do I find all my subscriptions?',
      paragraphs: [
        'Start with a bank or card statement that covers two or three months. Anything that appears at the same amount every week, month or year is a subscription or a bill; a charge that grew between months is a price rise. Check every card and account you pay from, since subscriptions spread out across them.',
        'Doing that by hand means reading every line. The finder above reads the statement for you, groups the charges that repeat, and lists each one with what it costs a year, sorted by cost, so the expensive ones you forgot are at the top.',
      ],
    },
    steps: [
      { title: 'Download a statement', body: 'From your bank or card app, export a PDF or CSV covering a month or more. Two or three months shows more.' },
      { title: 'Upload it here', body: 'No bank login. The file is read and then deleted.' },
      { title: 'See what repeats', body: 'Every recurring charge with its yearly cost, price rises and what renews in the next two weeks.' },
    ],
    faq: [
      {
        q: 'What happens to my statement?',
        a: 'The file is read by an AI model, the same way Subly reads statements in the app, and deleted right after. The recurring charges it found are kept for up to 7 days so you can add them after signing up, then deleted. Nobody at Subly looks at them.',
      },
      { q: 'Do I need to connect my bank?', a: 'No. Upload a PDF or CSV statement you download yourself. Subly never needs your bank login for this.' },
      { q: 'Which statements work?', a: 'Most bank and credit card statements, as a PDF or a CSV export, up to 5 MB. A statement that covers two or three months finds more, since a charge has to repeat to count.' },
      { q: 'Is there a limit?', a: 'You can scan 3 statements a day here. In Subly, the Free plan reads one statement and paid plans read as many as you like.' },
    ],
  }),
} satisfies Record<string, Tool>

export type ToolKey = keyof typeof TOOLS
