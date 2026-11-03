import { FakeButton, Flow, ServiceLogo, WindowFrame } from '@/components/home/mock'
import { LogoMark } from '@/components/site/logo'

const signals = [
  {
    logo: 'adobecc',
    title: 'Adobe Creative Cloud renews in 13 days',
    body: '$59.99 a month, about $720 a year. It is your most expensive tool and nobody owns it.',
  },
  {
    logo: 'notion',
    title: 'Notion Plus went up 20%',
    body: 'The last two charges were $12.00. It used to be $10.00. Paying yearly would save $24.',
  },
  {
    abbr: 'Ca',
    title: 'The refund window for Calmy closes Friday',
    body: 'AppSumo deal bought 53 days ago. Nobody on the team has used it yet.',
    problem: true,
  },
] as const

const upcoming = [
  { date: 'Oct 26', abbr: 'AP', name: 'Affiliate payout', amount: '$300.00', incoming: true },
  { date: 'Oct 28', logo: 'basecamp', name: 'Basecamp', amount: '$15.00' },
  { date: 'Nov 1', abbr: 'NL', name: 'Northlight retainer', amount: '$2,500.00', incoming: true },
  { date: 'Nov 5', logo: 'adobecc', name: 'Adobe Creative Cloud', amount: '$59.99' },
  { date: 'Nov 9', logo: 'zoom', name: 'Zoom', amount: '$15.99' },
  { date: 'Nov 15', logo: 'figma', name: 'Figma', amount: '$15.00' },
] as const

const nav = [
  { label: 'Today', active: true, badge: '3' },
  { label: 'Recurring' },
  { label: 'Insights' },
  { label: 'Settings' },
]

export function TodayScreen({ className = '' }: { className?: string }) {
  return (
    <WindowFrame url="web.subly.app/today" label="Mock-up of the Subly Today screen: three numbers, three things that need you, and what is coming up in the next 30 days" className={className}>
      <div className="grid md:grid-cols-[176px_minmax(0,1fr)]">
        <div className="hidden flex-col gap-0.5 border-r border-border bg-sidebar p-3 md:flex">
          <div className="flex items-center gap-2 px-2 pb-3 pt-1 text-[13px] font-semibold">
            <LogoMark className="h-4 w-auto" />
            Oakline Studio
          </div>
          {nav.map((n) => (
            <div
              key={n.label}
              className={`flex items-center justify-between rounded-md px-2 py-1.5 text-[13px] ${
                n.active ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground'
              }`}
            >
              {n.label}
              {n.badge && (
                <span className="rounded-full bg-brand px-1.5 font-mono text-[10px] leading-4 text-brand-foreground">{n.badge}</span>
              )}
            </div>
          ))}
          <div className="mt-24 flex items-center justify-between rounded-md border border-border px-2 py-1.5 text-[12px] text-faint">
            <span>Ask or do…</span>
            <span className="font-mono">⌘K</span>
          </div>
        </div>

        <div className="min-w-0 bg-background p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-xl font-bold tracking-tight">Good morning, Maya</p>
              <p className="text-[13px] text-muted-foreground">3 things need you this week. The rest is on track.</p>
            </div>
            <dl className="grid grid-cols-3 gap-3 sm:flex sm:gap-5">
              <div>
                <dt className="text-[11px] text-faint">Money out <span className="block sm:inline">/ month</span></dt>
                <dd className="font-mono text-[15px] tabular-nums sm:text-[17px]"><Flow dir="out">$3,420</Flow></dd>
              </div>
              <div>
                <dt className="text-[11px] text-faint">Money in <span className="block sm:inline">/ month</span></dt>
                <dd className="font-mono text-[15px] tabular-nums sm:text-[17px]"><Flow dir="in">$5,980</Flow></dd>
              </div>
              <div>
                <dt className="text-[11px] text-faint">Next <span className="block sm:inline">30 days</span></dt>
                <dd className="font-mono text-[15px] tabular-nums sm:text-[17px]"><Flow dir="out">$4,112</Flow></dd>
              </div>
            </dl>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.07em] text-faint">Needs you</p>
              <div className="space-y-2">
                {signals.map((s, i) => (
                  <div
                    key={s.title}
                    className={`grid-cols-[32px_minmax(0,1fr)] gap-3 rounded-xl border border-border bg-card p-3 ${
                      i === 2 ? 'hidden sm:grid' : 'grid'
                    }`}
                  >
                    <ServiceLogo logo={'logo' in s ? s.logo : undefined} abbr={'abbr' in s ? s.abbr : ''} />
                    <div className="min-w-0">
                      <p className="flex items-center gap-2 text-[13.5px] font-semibold leading-snug">
                        {'problem' in s && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-attention" aria-hidden="true" />}
                        {s.title}
                      </p>
                      <p className="mt-0.5 text-[12.5px] leading-snug text-muted-foreground">{s.body}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        <FakeButton primary>Keep</FakeButton>
                        <FakeButton>Plan to cancel</FakeButton>
                        <FakeButton>Snooze</FakeButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.07em] text-faint">Coming up</p>
              <ul className="rounded-xl border border-border bg-card px-3 py-1">
                {upcoming.map((u, i) => (
                  <li
                    key={u.name}
                    className={`grid grid-cols-[40px_28px_minmax(0,1fr)_auto] items-center gap-2 border-b border-border py-2 last:border-b-0 ${
                      i >= 4 ? 'hidden md:grid' : ''
                    }`}
                  >
                    <span className="font-mono text-[11px] text-faint">{u.date}</span>
                    <ServiceLogo logo={'logo' in u ? u.logo : undefined} abbr={'abbr' in u ? u.abbr : ''} className="h-6 w-6 rounded-md text-[10px]" />
                    <span className="truncate text-[13px]">{u.name}</span>
                    <span className="font-mono text-[12.5px] tabular-nums">
                      <Flow dir={'incoming' in u ? 'in' : 'out'}>{u.amount}</Flow>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 flex items-center gap-1.5 text-[12px] text-faint">
                <span className="h-1.5 w-1.5 rounded-full bg-money-in" /> Bank synced 2 hours ago · 31 items on track
              </p>
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  )
}
