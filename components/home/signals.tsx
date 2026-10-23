import { CalendarClock, Clock, TrendingUp, Undo2, Unplug, Timer } from 'lucide-react'
import { FakeButton, Pill } from '@/components/home/mock'
import { Section, SectionHeading } from '@/components/ui/section'

const signals = [
  { icon: CalendarClock, name: 'A big renewal is coming', line: 'Adobe Creative Cloud renews in 13 days. About $720 a year, and nobody owns it.' },
  { icon: TrendingUp, name: 'A price went up', line: 'Notion Plus went up 20%. The last two charges were $12.00, it used to be $10.00.' },
  { icon: Undo2, name: 'Charged after you cancelled', line: 'Hulu charged $17.99 on Oct 14. You cancelled it on Sep 3.' },
  { icon: Timer, name: 'A refund window is closing', line: 'The refund window for Calmy closes Friday. Nobody has used it yet.' },
  { icon: Clock, name: 'A client is late', line: 'Northlight is 3 days late. $2,500 was due on Nov 1.' },
  { icon: Unplug, name: 'A bank needs attention', line: 'Your bank connection needs a new login. Subly cannot see new charges until then.' },
]

const channels = ['Email', 'Slack', 'Microsoft Teams', 'Discord', 'Telegram']

export function Signals() {
  return (
    <Section tone="sunken">
      <SectionHeading
        eyebrow="Signals"
        title="Subly tells you what needs you"
        lede="It watches every charge and payment. When something needs a decision, it tells you where you already work. When nothing does, it stays quiet."
      />

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <ul className="grid gap-3 sm:grid-cols-2">
          {signals.map(({ icon: Icon, name, line }) => (
            <li key={name} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand-ink">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <h3 className="text-sm font-semibold">{name}</h3>
              </div>
              <p className="mt-2.5 text-sm text-muted-foreground">{line}</p>
            </li>
          ))}
        </ul>

        <div className="space-y-4">
          <div
            role="img"
            aria-label="Mock-up of a Slack message from Subly with Keep, Plan to cancel and Snooze buttons"
            className="rounded-2xl border border-input bg-card p-4 shadow-[0_24px_48px_-32px_rgb(0_0_0/0.3)]"
          >
            <div aria-hidden="true" className="grid grid-cols-[36px_minmax(0,1fr)] gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary font-display font-bold text-primary-foreground">S</span>
              <div className="min-w-0 text-sm">
                <p className="font-bold">
                  Subly <span className="ml-1 text-xs font-normal text-faint">APP · 9:02 AM</span>
                </p>
                <div className="my-2 border-l-[3px] border-attention pl-3">
                  <p className="font-semibold">Adobe Creative Cloud renews in 3 days</p>
                  <p className="text-muted-foreground">$59.99 a month, about $720 a year. Owner: none. Two other design tools are active.</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <FakeButton primary>Keep</FakeButton>
                  <FakeButton>Plan to cancel</FakeButton>
                  <FakeButton>Snooze 1 week</FakeButton>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-faint">Delivered to</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {channels.map((c) => (
                <li key={c}>
                  <Pill tone="neutral">{c}</Pill>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              Act in Slack and Subly updates everywhere. One tap closes it on Today, too.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
