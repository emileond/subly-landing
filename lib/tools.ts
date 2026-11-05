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
} satisfies Record<string, Tool>

export type ToolKey = keyof typeof TOOLS
