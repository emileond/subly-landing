import { ArrowRight } from 'lucide-react'
import { ClosingCta } from '@/components/home/closing-cta'
import { AnchorButton } from '@/components/ui/button'
import { SIGNUP_URL } from '@/lib/site'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Roadmap',
  description: 'What the Subly team is working on now, next and later.',
  path: '/roadmap',
})

type Item = { title: string; type: 'Enhancement' | 'New feature'; status: 'now' | 'next' | 'later' }

const items: Item[] = [
  { title: 'Bulk edit reminders', type: 'Enhancement', status: 'now' },
  { title: 'Show past transactions for subscriptions', type: 'Enhancement', status: 'now' },
  { title: 'Connect bank accounts', type: 'New feature', status: 'now' },
  { title: 'Notification control in projects', type: 'Enhancement', status: 'next' },
  { title: 'API', type: 'New feature', status: 'next' },
  { title: 'User mentions and assignees', type: 'Enhancement', status: 'next' },
  { title: 'Files explorer', type: 'New feature', status: 'next' },
  { title: 'Invoice generator for recurring revenue', type: 'New feature', status: 'later' },
  { title: 'AI powered insights', type: 'New feature', status: 'later' },
  { title: 'Logos API', type: 'Enhancement', status: 'later' },
]

const sections = [
  { status: 'now', title: 'Now', body: 'A quick look at what the Subly team is actively working on right now.' },
  { status: 'next', title: 'Next', body: 'A sneak peek at what we’re stirring up next. We’ll get to this in the next 3 months.' },
  { status: 'later', title: 'Later', body: "A glance at where we're going in the future. We'll get to this in approximately 6 months." },
] as const

const badge = {
  Enhancement: 'bg-brand-soft text-brand-ink',
  'New feature': 'bg-secondary text-secondary-foreground',
} as const

export default function RoadmapPage() {
  return (
    <>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="text-center">
          <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl">Roadmap</h1>
          <p className="mt-4 text-lg text-muted-foreground">What’s on the horizon for Subly</p>
          <AnchorButton href={SIGNUP_URL} variant="outline" size="lg" className="mt-8 rounded-full">
            Get started for free <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </AnchorButton>
        </div>

        <div className="mt-20 space-y-20">
          {sections.map((s) => (
            <section key={s.status} aria-labelledby={`roadmap-${s.status}`}>
              <h2 id={`roadmap-${s.status}`} className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {s.title}
              </h2>
              <p className="mt-3 text-muted-foreground">{s.body}</p>
              <ul className="mt-8 divide-y divide-border border-y border-border">
                {items
                  .filter((i) => i.status === s.status)
                  .map((i) => (
                    <li key={i.title} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-4">
                      <span className="text-lg font-medium">{i.title}</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${badge[i.type]}`}>{i.type}</span>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
      <ClosingCta title="Get started today" body="Sign up now and see where your recurring money goes." />
    </>
  )
}
