import { Eye, Radar, Scale, Plug } from 'lucide-react'
import { ClaudeMark } from '@/components/home/mock'
import { Section, SectionHeading } from '@/components/ui/section'

const outcomes = [
  {
    icon: Eye,
    title: 'See everything, finally',
    body: 'Subscriptions, bills, client retainers, payouts and lifetime deals, in every currency, in one picture that is always current.',
    proof: 'Money in next to money out',
  },
  {
    icon: Radar,
    title: 'Know before it happens',
    body: 'A renewal about to hit, a price that crept up, a client running late, a tight week for cash. You hear about it first, where you already work.',
    proof: 'Alerts only when it matters',
  },
  {
    icon: Scale,
    title: 'Decide with the numbers in front of you',
    body: 'Ask in plain words, read a monthly summary that says what changed, and test a cancel or a price change against the next 90 days before you commit.',
    proof: 'Every answer links to the charges',
  },
  {
    icon: Plug,
    title: 'Built into how you work',
    body: 'Slack, Microsoft Teams, email, your accountant and your agents. Subly shows up in the tools you use, instead of asking you to visit another dashboard.',
    proof: 'claude',
  },
]

export function Outcomes() {
  return (
    <Section id="value">
      <SectionHeading
        eyebrow="What you get"
        title="Everything you need to run your money with confidence"
        lede="Subly is the part of your business that watches every payment, remembers every date and tells you what to do next, so you can spend your attention on the work."
      />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {outcomes.map(({ icon: Icon, title, body, proof }) => (
          <li key={title} className="flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-7">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-soft text-brand-ink">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold leading-snug tracking-tight text-balance sm:text-2xl">{title}</h3>
            <p className="mt-2 text-muted-foreground">{body}</p>
            <p className="mt-5 flex items-center gap-2 border-t border-dashed border-border pt-4 font-mono text-[11px] uppercase tracking-[0.07em] text-faint">
              {proof === 'claude' ? (
                <>
                  <ClaudeMark className="h-3.5 w-3.5" /> Claude connector, API and webhooks
                </>
              ) : (
                proof
              )}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
