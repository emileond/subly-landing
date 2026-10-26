import { Mail, MessageSquare, Share2 } from 'lucide-react'
import { FakeButton, WindowFrame } from '@/components/home/mock'
import { Section, SectionHeading } from '@/components/ui/section'

/** Balance over the next 13 weeks, in dollars (illustrative) */
const balance = [14500, 14120, 13700, 13650, 12900, 12100, 11200, 10300, 8240, 9800, 10900, 11500, 12300]

function Forecast() {
  const w = 560
  const h = 150
  const padL = 8
  const padR = 8
  const padT = 14
  const padB = 24
  const max = 16000
  const x = (i: number) => padL + (i * (w - padL - padR)) / (balance.length - 1)
  const y = (v: number) => padT + (1 - v / max) * (h - padT - padB)
  const line = balance.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
  const area = `${line} L${x(balance.length - 1)} ${y(0)} L${x(0)} ${y(0)} Z`
  const low = balance.indexOf(Math.min(...balance))

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="block h-auto w-full" aria-hidden="true">
      <defs>
        <linearGradient id="forecast-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1={padL} x2={w - padR} y1={y(0)} y2={y(0)} stroke="var(--border)" />
      <line x1={padL} x2={w - padR} y1={y(8000)} y2={y(8000)} stroke="var(--border)" strokeDasharray="3 4" />
      <path d={area} fill="url(#forecast-fill)" />
      <path d={line} fill="none" stroke="var(--brand)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x(low)} cy={y(balance[low])} r="5" fill="var(--card)" stroke="var(--brand)" strokeWidth="2.5" />
      <text x={x(0)} y={h - 6} fontSize="11" fill="var(--faint)" fontFamily="var(--font-geist-mono)">Now</text>
      <text x={x(low)} y={h - 6} fontSize="11" textAnchor="middle" fill="var(--faint)" fontFamily="var(--font-geist-mono)">Week 9</text>
      <text x={x(balance.length - 1)} y={h - 6} fontSize="11" textAnchor="end" fill="var(--faint)" fontFamily="var(--font-geist-mono)">Week 13</text>
    </svg>
  )
}

const changes = [
  { label: 'Notion Plus price rise', value: '+$24 a year' },
  { label: 'New: Krisp, found on your statement', value: '+$14.99 a month' },
  { label: 'Cancelled: Hulu', value: '−$17.99 a month' },
]

export function Summary() {
  return (
    <Section tone="sunken">
      <SectionHeading
        eyebrow="Monthly summary"
        title="A monthly summary you'll actually read"
        lede="On the first of the month, Subly writes you a short note in plain words: what changed, what it means and what to do. No dashboards to dig through."
      />

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1.15fr_1fr]">
        <WindowFrame url="web.subly.app/insights/2026-10" label="Mock-up of the October summary: a headline, a short paragraph, three changes and a Share this month button">
          <div className="bg-background p-4 sm:p-6">
            <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-faint">October 2026</p>
              <p className="mt-2 font-display text-xl font-bold leading-snug tracking-tight text-balance sm:text-2xl">
                Spending is flat, money in is up 6%, and one renewal needs a decision
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                You spent <strong className="font-semibold text-foreground">$3,420</strong> on recurring costs, about the
                same as September. Money in reached <strong className="font-semibold text-foreground">$5,980</strong>, up
                6% because Northlight moved to a higher tier. That leaves about{' '}
                <strong className="font-semibold text-foreground">$2,560</strong> after costs.
              </p>
              <ul className="mt-4 divide-y divide-dashed divide-border border-y border-dashed border-border">
                {changes.map((c) => (
                  <li key={c.label} className="flex items-center justify-between gap-3 py-2 text-sm">
                    <span>{c.label}</span>
                    <span className="shrink-0 font-mono text-[13px] tabular-nums">{c.value}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <FakeButton primary className="gap-1.5 px-3 py-1.5">
                  <Share2 className="h-3.5 w-3.5" /> Share this month
                </FakeButton>
                <FakeButton className="px-3 py-1.5">Why did Krisp appear?</FakeButton>
              </div>
            </div>
          </div>
        </WindowFrame>

        <div className="space-y-4">
          <div
            role="img"
            aria-label="Mock-up of the 13-week chart: your money stays above zero, with the lowest point of $8,240 in week 9"
            className="rounded-2xl border border-input bg-card p-5 shadow-[0_24px_48px_-32px_rgb(0_0_0/0.3)]"
          >
            <div aria-hidden="true">
              <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-faint">How long your money lasts</p>
              <p className="mt-2 font-display text-lg font-bold leading-snug tracking-tight sm:text-xl">
                Your money lasts through the next 13 weeks
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                The lowest point is <span className="font-mono tabular-nums text-foreground">$8,240</span> in week 9, after
                the yearly renewals.
              </p>
              <div className="mt-4">
                <Forecast />
              </div>
            </div>
          </div>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" aria-hidden="true" />
              Arrives by email, in Slack or in Microsoft Teams.
            </li>
            <li className="flex items-start gap-2.5">
              <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" aria-hidden="true" />
              Every number comes from your real charges, and every line links back to them.
            </li>
            <li className="flex items-start gap-2.5">
              <Share2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" aria-hidden="true" />
              &quot;Share this month&quot; sends a clean copy to a partner or your accountant.
            </li>
          </ul>
        </div>
      </div>
    </Section>
  )
}
