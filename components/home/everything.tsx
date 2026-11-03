import { Banknote, BellRing, FileDown, Globe, Languages, PiggyBank, Tags, Users } from 'lucide-react'
import { Section, SectionHeading } from '@/components/ui/section'

const items = [
  { icon: Banknote, title: '150+ currencies', body: 'Each item keeps its own currency. Totals and forecasts use yours, with rates refreshed daily.' },
  { icon: Languages, title: 'Nine languages', body: 'English, Spanish, Portuguese, French, German, Italian, Norwegian, Swedish and Danish.' },
  { icon: BellRing, title: 'Alerts where you are', body: 'Email, Slack, Microsoft Teams, Discord or Telegram, in a rhythm you choose.' },
  { icon: PiggyBank, title: 'Budgets that speak up', body: 'Set a monthly limit per category or project and hear at 80% and again when you cross it.' },
  { icon: Tags, title: 'Categories and projects', body: 'See where the money goes by type of spend or by client, not just by tool.' },
  { icon: Users, title: 'Owners and teammates', body: 'Every item can have an owner, notes and mentions, so nothing renews unseen.' },
  { icon: Globe, title: 'Banks in the US, Canada and Europe', body: 'Connect an account, or skip the bank entirely with a statement upload. It works anywhere.' },
  { icon: FileDown, title: 'Your data stays yours', body: 'Export everything whenever you like. Leave, and it is deleted.' },
]

export function Everything() {
  return (
    <Section>
      <SectionHeading
        eyebrow="And the details"
        title="Made for the way you really work"
        lede="The small things that make the daily use easy."
      />
      <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, body }) => (
          <li key={title}>
            <Icon className="h-5 w-5 text-brand-ink" aria-hidden="true" />
            <h3 className="mt-3 font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
