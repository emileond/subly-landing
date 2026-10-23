import { Globe, Receipt, Scale } from 'lucide-react'
import { ServiceLogo } from '@/components/home/mock'
import { Section, SectionHeading } from '@/components/ui/section'

const points = [
  {
    icon: Scale,
    title: 'Money in sits next to money out',
    body: 'Client retainers, subscriptions you sell and payouts show up beside what you pay. You see what is left over, not just what you spend.',
  },
  {
    icon: Globe,
    title: 'Every currency, one total',
    body: 'Pay in euros, get paid in pounds, report in dollars. Each item keeps its own currency and the totals use yours.',
  },
  {
    icon: Receipt,
    title: 'Lifetime deals and refund windows',
    body: 'See every lifetime deal you bought, what it cost, and how many days are left to get your money back.',
  },
]

const rows = [
  { abbr: 'NL', name: 'Northlight retainer', note: 'Money in · monthly', amount: '+$2,500.00', incoming: true },
  { abbr: 'Cb', name: 'Coastline Bakery', note: 'Money in · £1,200 monthly', amount: '+$1,560.00', incoming: true },
  { logo: 'hetzner', name: 'Hetzner servers', note: 'Money out · €38.00 monthly', amount: '$41.30' },
  { logo: 'appsumo', name: 'Calmy', note: 'Lifetime deal · refundable for 7 more days', amount: '$69.00' },
]

export function MoneyInOut() {
  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="In and out"
            title="Money in and money out, together"
            lede="Most tools only count what you spend. Subly also watches what you earn, so you know where you stand."
          />
          <ul className="mt-8 space-y-6">
            {points.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-4">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand-ink">
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground sm:text-base">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div
          role="img"
          aria-label="Mock-up: money in $5,980 a month, money out $3,420 a month, $2,560 left over, with example items in several currencies"
          className="rounded-2xl border border-input bg-card p-5 shadow-[0_24px_48px_-32px_rgb(0_0_0/0.3)] sm:p-6"
        >
          <div aria-hidden="true">
            <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-faint">Each month</p>
            <div className="mt-3 space-y-3">
              <div>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-muted-foreground">Money in</span>
                  <span className="font-mono tabular-nums text-money-in">$5,980</span>
                </div>
                <div className="mt-1.5 h-2.5 rounded-full bg-muted">
                  <div className="h-full rounded-full bg-money-in" style={{ width: '100%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-muted-foreground">Money out</span>
                  <span className="font-mono tabular-nums">$3,420</span>
                </div>
                <div className="mt-1.5 h-2.5 rounded-full bg-muted">
                  <div className="h-full rounded-full bg-foreground/70" style={{ width: '57%' }} />
                </div>
              </div>
            </div>
            <p className="mt-4 border-t border-border pt-4 font-display text-xl font-bold tracking-tight">
              <span className="font-mono text-2xl tabular-nums">$2,560</span> left over each month
            </p>

            <ul className="mt-5 divide-y divide-border rounded-xl border border-border bg-background">
              {rows.map((r) => (
                <li key={r.name} className="grid grid-cols-[32px_minmax(0,1fr)_auto] items-center gap-3 px-3 py-2.5">
                  <ServiceLogo logo={'logo' in r ? r.logo : undefined} abbr={'abbr' in r ? r.abbr : ''} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{r.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{r.note}</p>
                  </div>
                  <span className={`font-mono text-sm tabular-nums ${r.incoming ? 'text-money-in' : ''}`}>{r.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
