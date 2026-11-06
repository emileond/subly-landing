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
  stack: tool({
    slug: 'stack-cost-calculator',
    name: 'Software stack cost calculator',
    title: 'Software stack cost calculator: what your tools cost',
    description: 'Pick the software your business pays for, with plans and seats, and see the monthly and yearly total, the cost per person and what paying yearly would save.',
    eyebrow: 'Free tool',
    h1: 'What does your software stack cost?',
    lede: 'Pick the tools you pay for, choose the plan and seats, and see your monthly and yearly total, the cost per person and what yearly billing would save. Share the stack with one link.',
    blurb: 'Add your tools, plans and seats and see the monthly and yearly total and what yearly billing would save.',
    answer: {
      question: 'How do I work out what our software costs?',
      paragraphs: [
        'List every tool, its plan and how many seats you pay for, then turn each one into a monthly cost: per-seat price times seats, and yearly plans divided by 12. Add them up and multiply by 12 for the year. Divide by the number of people on the team to see the cost per person, a useful number when you hire or budget.',
        'The calculator above does the arithmetic with list prices from each vendor. Two things are worth checking once you see the total: seats nobody uses any more, and monthly plans you have kept for a year or more, since most tools charge less a month on yearly billing.',
      ],
    },
    steps: [
      { title: 'Add your tools', body: 'Search the list or type a tool that is not on it, with your own price.' },
      { title: 'Set plans and seats', body: 'Pick the plan you are on, the seats you pay for and how you are billed.' },
      { title: 'See the total', body: 'Monthly and yearly cost, cost per person and what yearly billing would save. Copy a link to share it.' },
    ],
    faq: [
      { q: 'Where do the prices come from?', a: 'From each vendor’s own pricing page, in US dollars, checked on the date shown under the total. Prices change, and taxes or discounts are not included, so use the plan menu to match what you actually pay.' },
      { q: 'Is my stack saved anywhere?', a: 'Only in the link. The tools you pick are kept in the page address, so a copied link opens the same stack. Nothing is stored unless you press the button to send it to Subly.' },
      { q: 'How much should a small business spend on software?', a: 'There is no standard number; it depends on the work. The useful checks are the cost per person, whether each tool has someone who decides on it, and whether monthly plans you have kept for a year would be cheaper billed yearly.' },
      { q: 'Can Subly track this for me?', a: 'Yes. Send the stack to Subly and check the items before they are added. Subly tells you before each renewal and price rise and lets you put an owner on every tool. The Free plan tracks up to 20 items.' },
    ],
  }),
  builder: tool({
    slug: 'stack-builder',
    name: 'Software stack builder',
    title: 'Software stack builder: tools and costs for a new business',
    description: 'Pick the kind of business you are setting up and your team size, and see a common software stack for it with what it costs a month, a year and per person.',
    eyebrow: 'Free tool',
    h1: 'What software will your business need, and what will it cost?',
    lede: 'Choose what you are setting up and how many people it is for. You will see the jobs your software has to do, a common pick for each, and the monthly and yearly cost before you sign up for anything.',
    blurb: 'Pick a kind of business and team size and see a typical stack with its monthly and yearly cost.',
    answer: {
      question: 'What software does a small business need?',
      paragraphs: [
        'Most small businesses start with the same core: email, calendar and documents, a place for the team to talk, accounting, and a password manager. On top of that comes the software for the work itself, like design tools for a studio, code hosting for a software team or a store for an online shop.',
        'Cost depends less on which tools you pick than on how many people need a seat and whether you pay monthly or yearly. Start each tool on the plan you need today, put the yearly renewal dates somewhere you will see them, and review the list every few months as the team grows.',
      ],
    },
    steps: [
      { title: 'Pick what you are setting up', body: 'An agency, a software startup, an online store, freelance work, a marketing team or a services firm.' },
      { title: 'Set the team size', body: 'Per-seat tools are priced for everyone. Choose lean or standard plans.' },
      { title: 'Swap and compare', body: 'Change any pick to see the difference, then fine-tune it in the stack calculator.' },
    ],
    faq: [
      { q: 'Are these recommendations sponsored?', a: 'No. They are common choices for each kind of business, and no vendor pays to be listed. Swap any of them for the tool you prefer.' },
      { q: 'How accurate are the costs?', a: 'They use list prices in US dollars from each vendor’s pricing page, on the date shown. Taxes, discounts and add-ons are not included, so treat the total as a planning number.' },
      { q: 'Should I pay monthly or yearly?', a: 'Monthly while you are still deciding, yearly once a tool has earned its place: most vendors charge less a month on yearly billing. Note each yearly renewal date, since that charge is large and easy to forget.' },
      { q: 'What happens if I send the stack to Subly?', a: 'You check the tools before anything is added. Subly then tells you before each renewal and price rise, and you can give every tool an owner. The Free plan tracks up to 20 items.' },
    ],
  }),
} satisfies Record<string, Tool>

export type ToolKey = keyof typeof TOOLS
