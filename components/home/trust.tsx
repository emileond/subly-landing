import { Eye, FileDown, KeyRound, Lock } from 'lucide-react'
import { Section, SectionHeading } from '@/components/ui/section'

const points = [
  {
    icon: Eye,
    title: 'Read-only, always',
    body: 'Subly can see transactions. It cannot move money, pay anyone or change anything at your bank.',
  },
  {
    icon: KeyRound,
    title: 'Your bank login never reaches us',
    body: 'Bank connections go through Plaid, the service behind many well-known finance apps. Or skip the bank and upload a statement.',
  },
  {
    icon: Lock,
    title: 'Encrypted in transit and at rest',
    body: 'Everything travels over an encrypted connection and is stored encrypted.',
  },
  {
    icon: FileDown,
    title: 'Yours to take or delete',
    body: 'Never sold, never used for anything else. Export everything any time. Leave, and it is deleted.',
  },
]

export function Trust() {
  return (
    <Section id="security" className="!pt-4 sm:!pt-6">
      <div className="rounded-3xl border border-border bg-card px-6 py-10 sm:px-10 sm:py-12">
        <SectionHeading
          eyebrow="Safe by design"
          title="Your money stays where it is"
          lede="Subly watches. It never touches."
        />
        <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {points.map(({ icon: Icon, title, body }) => (
            <li key={title}>
              <Icon className="h-5 w-5 text-brand-ink" aria-hidden="true" />
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
