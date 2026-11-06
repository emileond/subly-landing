import { PRICED_TOOLS, type PricedTool } from '@/lib/tool-prices'

/**
 * Starter stacks for the stack builder: for each kind of business, the jobs its software has to
 * do and the tools people commonly pick for each, first choice first. Tools are named, not
 * priced, here; prices come from data/tool-prices.json, and a tool that isn't priced there is
 * simply skipped. These are common choices, not endorsements: no vendor pays to be listed.
 */
export type Need = { job: string; options: string[]; /** Most small teams can start without it */ optional?: boolean }
export type Template = { id: string; label: string; blurb: string; needs: Need[] }

const EMAIL = { job: 'Email, calendar and documents', options: ['Google Workspace', 'Microsoft 365'] }
const CHAT = { job: 'Team chat', options: ['Slack', 'Microsoft Teams'] }
const CALLS = { job: 'Video calls', options: ['Zoom', 'Google Workspace'] }
const PASSWORDS = { job: 'Passwords', options: ['1Password', 'Bitwarden'] }
const BOOKS = { job: 'Accounting', options: ['QuickBooks Online', 'Xero', 'FreshBooks'] }
const AI = { job: 'AI assistant', options: ['Claude', 'ChatGPT'] }
const SCHEDULING = { job: 'Booking calls', options: ['Calendly', 'Cal.com'] }

export const TEMPLATES: Template[] = [
  {
    id: 'agency',
    label: 'Design or creative agency',
    blurb: 'Client work, design files, proposals and retainers.',
    needs: [
      EMAIL,
      CHAT,
      { job: 'Design', options: ['Figma', 'Adobe Creative Cloud', 'Canva'] },
      { job: 'Projects and tasks', options: ['Asana', 'ClickUp', 'Trello', 'monday.com', 'Linear'] },
      { job: 'Proposals and contracts', options: ['PandaDoc', 'DocuSign'] },
      { job: 'Time tracking', options: ['Harvest', 'Toggl Track'], optional: true },
      BOOKS,
      PASSWORDS,
    ],
  },
  {
    id: 'saas',
    label: 'Software startup',
    blurb: 'A small team building and selling a software product.',
    needs: [
      EMAIL,
      CHAT,
      { job: 'Code and deploys', options: ['GitHub', 'GitLab'] },
      { job: 'Hosting', options: ['Vercel', 'Netlify'] },
      { job: 'Issues and roadmap', options: ['Linear', 'Jira'] },
      { job: 'Docs and notes', options: ['Notion'] },
      { job: 'Design', options: ['Figma'] },
      { job: 'Customer support', options: ['Intercom', 'Help Scout', 'Zendesk'], optional: true },
      { job: 'AI coding', options: ['Cursor'], optional: true },
      PASSWORDS,
    ],
  },
  {
    id: 'store',
    label: 'Online store',
    blurb: 'Selling products online, with email marketing.',
    needs: [
      { job: 'Store', options: ['Shopify', 'Squarespace', 'Wix'] },
      EMAIL,
      { job: 'Email marketing', options: ['Kit', 'Mailchimp'] },
      { job: 'Graphics', options: ['Canva'] },
      { job: 'Social posts', options: ['Buffer'], optional: true },
      { job: 'Customer support', options: ['Help Scout', 'Zendesk'], optional: true },
      BOOKS,
    ],
  },
  {
    id: 'freelancer',
    label: 'Freelancer or consultant',
    blurb: 'Working alone for clients, billing by project or retainer.',
    needs: [
      EMAIL,
      SCHEDULING,
      { job: 'Notes and client docs', options: ['Notion'] },
      { job: 'Invoices and books', options: ['FreshBooks', 'QuickBooks Online', 'Xero'] },
      { job: 'Contracts', options: ['DocuSign', 'PandaDoc'], optional: true },
      { job: 'Time tracking', options: ['Toggl Track', 'Harvest'], optional: true },
      AI,
      PASSWORDS,
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing or content team',
    blurb: 'Campaigns, content, SEO and social for clients or your own brand.',
    needs: [
      EMAIL,
      CHAT,
      { job: 'SEO research', options: ['Semrush', 'Ahrefs'] },
      { job: 'Email marketing', options: ['Kit', 'HubSpot', 'Mailchimp'] },
      { job: 'Graphics', options: ['Canva', 'Adobe Creative Cloud'] },
      { job: 'Social posts', options: ['Buffer'] },
      { job: 'Website', options: ['Webflow', 'Framer', 'WordPress.com', 'Squarespace'] },
      { job: 'Video', options: ['Loom', 'Descript'], optional: true },
      AI,
    ],
  },
  {
    id: 'services',
    label: 'Professional services firm',
    blurb: 'Accountants, lawyers, architects: client meetings, documents and signatures.',
    needs: [
      EMAIL,
      CALLS,
      SCHEDULING,
      { job: 'Signatures', options: ['DocuSign', 'PandaDoc'] },
      { job: 'File storage', options: ['Dropbox', 'Box', 'Google Workspace'] },
      BOOKS,
      { job: 'Forms and intake', options: ['Typeform', 'Tally'], optional: true },
      PASSWORDS,
    ],
  },
]

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '')
const byName = new Map(PRICED_TOOLS.map((t) => [norm(t.name), t]))
// Some vendors list their product under a longer name ("QuickBooks" for "QuickBooks Online")
const find = (name: string): PricedTool | undefined =>
  byName.get(norm(name)) ?? PRICED_TOOLS.find((t) => norm(t.name).startsWith(norm(name)) || norm(name).startsWith(norm(t.name)))

/** A template's needs with the tools the price list knows, first choice first; needs with none are dropped */
export function resolveTemplate(template: Template) {
  return template.needs
    .map((need) => ({ ...need, tools: need.options.map(find).filter((t): t is PricedTool => !!t) }))
    .filter((need) => need.tools.length > 0)
}
