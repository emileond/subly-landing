'use client'

import { BellRing, Check, LineChart, Mail, MessageSquareText, NotebookText, Share2, Sparkles, type LucideIcon } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { Pill, ServiceLogo } from '@/components/home/mock'
import { CountUp, Play, useCycle } from '@/components/home/motion'
import { Section, SectionHeading } from '@/components/ui/section'

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

/** A button that looks pressed at `at` ms */
function Press({ at, children, className = '' }: { at: number; children: ReactNode; className?: string }) {
  return (
    <span
      className={`anim-pressed inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-2.5 py-1 text-xs font-medium ${className}`}
      style={d(at)}
    >
      {children}
    </span>
  )
}

const Btn = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center rounded-md border border-input bg-card px-2.5 py-1 text-xs font-medium">{children}</span>
)

/* ---------- Stage 1: signals ---------- */

function SignalsStage() {
  return (
    <div className="space-y-3">
      <div className="anim-fade flex items-center justify-between text-xs text-muted-foreground" style={d(100)}>
        <span className="flex items-center gap-2">
          <span className="anim-ping h-2 w-2 rounded-full bg-money-in" aria-hidden="true" />
          Watching 47 items, 3 banks, 2 currencies
        </span>
        <span className="text-faint">live</span>
      </div>

      <div className="anim-rise rounded-xl border border-border bg-background p-3.5" style={d(400)}>
        <div className="flex items-center gap-3">
          <ServiceLogo logo="adobecc" className="h-10 w-10" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Adobe renews in 13 days</p>
            <p className="truncate text-xs text-muted-foreground">$720 a year, and nobody owns it</p>
          </div>
          <Pill tone="attention">Renewal</Pill>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 pl-[52px]">
          <span className="anim-fade flex gap-2" style={d(1500)}>
            <Btn>Keep</Btn>
            <Press at={3000}>Plan to cancel</Press>
            <Btn>Snooze</Btn>
          </span>
        </div>
        <p
          className="anim-rise mt-3 flex items-center gap-2 rounded-lg bg-money-in-soft px-3 py-2 text-xs"
          style={d(3500)}
        >
          <Check className="h-3.5 w-3.5 shrink-0 text-money-in" aria-hidden="true" />
          Plan saved for Nov 4. <strong className="font-mono tabular-nums">$720 a year</strong> kept.
        </p>
      </div>

      {[
        { logo: 'notion', title: 'Notion Plus went up 20%', line: '$10.00 → $12.00 a month', tone: 'attention' as const, tag: 'Price', at: 900 },
        { logo: 'hulu', title: 'Hulu charged $17.99', line: 'You cancelled it on Sep 3', tone: 'problem' as const, tag: 'After cancel', at: 1400 },
      ].map((r) => (
        <div key={r.title} className="anim-rise flex items-center gap-3 rounded-xl border border-border bg-background p-3.5" style={d(r.at)}>
          <ServiceLogo logo={r.logo} className="h-10 w-10" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{r.title}</p>
            <p className="truncate text-xs text-muted-foreground">{r.line}</p>
          </div>
          <Pill tone={r.tone}>{r.tag}</Pill>
        </div>
      ))}

      <div className="anim-fade flex flex-wrap items-center justify-between gap-3 pt-1" style={d(2600)}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-faint">Sent to</span>
          {['Slack', 'Teams', 'Email'].map((c, i) => (
            <span key={c} className="anim-pop" style={d(2700 + i * 150)}>
              <Pill tone="neutral">{c}</Pill>
            </span>
          ))}
        </div>
        <p className="text-sm">
          <span className="text-muted-foreground">Found for you this month </span>
          <strong className="font-mono text-base tabular-nums">
            <CountUp to={1284} prefix="$" delay={3300} />
          </strong>
        </p>
      </div>
    </div>
  )
}

/* ---------- Stage 2: ask ---------- */

function AskStage() {
  const bars = [
    { name: 'Adobe', v: 719.88, w: '100%' },
    { name: 'Figma', v: 180, w: '25%' },
    { name: 'Canva', v: 179.88, w: '25%' },
  ]
  return (
    <div className="space-y-3">
      <p className="flex items-center gap-2 rounded-xl border border-input bg-background px-3.5 py-3 text-sm">
        <Sparkles className="h-4 w-4 shrink-0 text-brand-ink" aria-hidden="true" />
        <span className="anim-type" style={{ '--t': '1.4s', '--steps': 32, '--d': '200ms' } as CSSProperties}>
          What do we pay for design tools?
        </span>
      </p>

      <p
        className="font-mono text-[11px] text-faint"
        style={{ animation: 'fade-in 0.4s ease 1800ms both, fade-out 0.4s ease 3300ms forwards' }}
      >
        Looking at 14 design items · Comparing with August…
      </p>

      <div className="anim-rise rounded-xl border border-border bg-background p-4" style={d(3300)}>
        <p className="font-display text-2xl font-bold tracking-tight">
          <span className="font-mono tabular-nums">$1,079.76</span>{' '}
          <span className="text-base font-medium text-muted-foreground">a year, across 3 tools</span>
        </p>
        <ul className="mt-3 space-y-2">
          {bars.map((b, i) => (
            <li key={b.name} className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-3 text-xs">
              <span className="text-muted-foreground">{b.name}</span>
              <span className="h-2 rounded-full bg-muted">
                <span className="anim-grow block h-full rounded-full bg-foreground/70" style={{ ...d(3600 + i * 200), width: b.w }} />
              </span>
              <span className="font-mono tabular-nums">${b.v.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="anim-rise rounded-xl border border-border bg-background p-4 text-sm" style={d(4500)}>
        <p>
          <strong>Adobe and Figma overlap.</strong> Two people use both. Dropping Figma would save{' '}
          <strong className="font-mono tabular-nums">$180 a year</strong>.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Press at={5900}>Plan to cancel Figma</Press>
          <Btn>Open the 3 items</Btn>
        </div>
        <p className="anim-rise mt-3 flex items-center gap-2 text-xs text-muted-foreground" style={d(6400)}>
          <Check className="h-3.5 w-3.5 text-money-in" aria-hidden="true" /> Saved to your plan. Nothing changes until you say so.
        </p>
      </div>
    </div>
  )
}

/* ---------- Stage 3: monthly summary ---------- */

function SummaryStage() {
  const changes = [
    ['Notion Plus price rise', '+$24 a year'],
    ['New: Krisp, found on your statement', '+$14.99 a month'],
    ['Cancelled: Hulu', '−$17.99 a month'],
  ]
  return (
    <div className="rounded-xl border border-border bg-background p-4 sm:p-5">
      <p className="anim-fade flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.07em] text-faint" style={d(100)}>
        <Mail className="h-3.5 w-3.5" aria-hidden="true" /> First of the month · 8:00
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { l: 'Spent', v: '$3,420', n: 'about the same' },
          { l: 'Money in', v: '$5,980', n: 'up 6%' },
          { l: 'Left over', v: '$2,560', n: 'after costs' },
        ].map((k, i) => (
          <div key={k.l} className="anim-rise rounded-lg border border-border bg-card px-2.5 py-2" style={d(300 + i * 150)}>
            <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-faint">{k.l}</p>
            <p className="font-mono text-base tabular-nums sm:text-lg">{k.v}</p>
            <p className="text-[11px] text-muted-foreground">{k.n}</p>
          </div>
        ))}
      </div>
      <p className="anim-rise mt-4 font-display text-lg font-bold leading-snug tracking-tight text-balance sm:text-xl" style={d(1000)}>
        Spending is flat, money in is up 6%, and one renewal needs a decision
      </p>
      <ul className="mt-3 divide-y divide-dashed divide-border border-y border-dashed border-border">
        {changes.map(([a, b], i) => (
          <li key={a} className="anim-rise flex items-center justify-between gap-3 py-2 text-sm" style={d(1500 + i * 400)}>
            <span>{a}</span>
            <span className="shrink-0 font-mono text-[13px] tabular-nums">{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Press at={3400}>Why did Krisp appear?</Press>
        <Press at={5400} className="gap-1.5">
          <Share2 className="h-3.5 w-3.5" aria-hidden="true" /> Share this month
        </Press>
      </div>
      <p className="anim-rise mt-3 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground" style={d(3900)}>
        Found on your Oct 9 statement: $14.99 a month, first charged 11 days ago. Nobody has opened it yet.
      </p>
      <p className="anim-rise mt-2 flex items-center gap-2 text-xs text-muted-foreground" style={d(5900)}>
        <Check className="h-3.5 w-3.5 text-money-in" aria-hidden="true" /> Link copied. A clean, view-only copy for your accountant.
      </p>
    </div>
  )
}

/* ---------- Stage 4: forecast ---------- */

const base = [14500, 14120, 13700, 13650, 12900, 12100, 11200, 10300, 8240, 9800, 10900, 11500, 12300]
const whatIf = base.map((v, i) => v + Math.round(i * 5 * 12))

function ForecastStage() {
  const w = 520
  const h = 170
  const pad = { l: 8, r: 8, t: 22, b: 24 }
  const max = 16000
  const x = (i: number) => pad.l + (i * (w - pad.l - pad.r)) / (base.length - 1)
  const y = (v: number) => pad.t + (1 - v / max) * (h - pad.t - pad.b)
  const path = (a: number[]) => a.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
  const low = base.indexOf(Math.min(...base))

  return (
    <div className="rounded-xl border border-border bg-background p-4 sm:p-5">
      <div className="anim-fade grid grid-cols-4 gap-2" style={d(100)}>
        {[
          ['In 30 days', '$13,650'],
          ['In 60 days', '$11,200'],
          ['In 90 days', '$12,300'],
        ].map(([l, v]) => (
          <div key={l} className="rounded-lg border border-border bg-card px-2 py-1.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.05em] text-faint">{l}</p>
            <p className="font-mono text-sm tabular-nums sm:text-base">{v}</p>
          </div>
        ))}
        <div className="relative rounded-lg border border-border bg-card px-2 py-1.5">
          <p className="font-mono text-[10px] uppercase tracking-[0.05em] text-faint">Lowest</p>
          <p className="anim-out font-mono text-sm tabular-nums sm:text-base" style={d(3500)}>$8,240</p>
          <p className="anim-fade absolute inset-x-2 top-[1.25rem] font-mono text-sm tabular-nums text-money-in sm:text-base" style={d(3500)}>
            $8,720
          </p>
        </div>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 block h-auto w-full" aria-hidden="true">
        <line x1={pad.l} x2={w - pad.r} y1={y(0)} y2={y(0)} stroke="var(--border)" />
        <line x1={pad.l} x2={w - pad.r} y1={y(8000)} y2={y(8000)} stroke="var(--border)" strokeDasharray="3 4" />
        <path d={path(base)} pathLength={1} fill="none" stroke="var(--brand)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" className="anim-draw" style={{ ...d(300), '--t': '1.5s' } as CSSProperties} />
        <path d={path(whatIf)} pathLength={1} fill="none" stroke="var(--foreground)" strokeOpacity="0.6" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" className="anim-draw" style={{ ...d(3100), '--t': '1.2s' } as CSSProperties} />
        <g className="anim-pop" style={{ ...d(1800), transformOrigin: `${x(low)}px ${y(base[low])}px` }}>
          <circle cx={x(low)} cy={y(base[low])} r="5.5" fill="var(--card)" stroke="var(--brand)" strokeWidth="2.5" />
        </g>
        <text className="anim-fade" style={d(2000)} x={x(low)} y={y(base[low]) + 20} fontSize="10.5" textAnchor="middle" fill="var(--muted-foreground)" fontFamily="var(--font-geist-sans)">
          Yearly renewals land
        </text>
        <text x={x(0)} y={h - 6} fontSize="11" fill="var(--faint)" fontFamily="var(--font-geist-mono)">Now</text>
        <text x={x(low)} y={h - 6} fontSize="11" textAnchor="middle" fill="var(--faint)" fontFamily="var(--font-geist-mono)">Week 9</text>
        <text x={x(base.length - 1)} y={h - 6} fontSize="11" textAnchor="end" fill="var(--faint)" fontFamily="var(--font-geist-mono)">Week 13</text>
      </svg>

      <div className="anim-fade mt-3 rounded-lg border border-border bg-card p-3" style={d(2300)}>
        <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-faint">What if</p>
        <ul className="mt-2 space-y-2 text-sm">
          {[
            { l: 'Cancel Adobe', n: '+$720 a year', on: true },
            { l: 'Delay a client payment by 2 weeks', n: '', on: false },
            { l: 'Plan a new hire, $4,000 a month', n: '', on: false },
          ].map((s) => (
            <li key={s.l} className="flex items-center gap-3">
              <span className={`relative h-5 w-9 shrink-0 rounded-full bg-muted ${s.on ? 'anim-track' : ''}`} style={d(2900)}>
                <span
                  className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow ${s.on ? 'anim-knob' : ''}`}
                  style={d(2900)}
                />
              </span>
              <span className="flex-1">{s.l}</span>
              {s.on && (
                <span className="anim-fade font-mono text-xs tabular-nums text-money-in" style={d(3400)}>
                  {s.n}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ---------- Section ---------- */

type Tab = { id: string; icon: LucideIcon; title: string; body: string; stage: ReactNode; label: string }

const tabs: Tab[] = [
  {
    id: 'signals',
    icon: BellRing,
    title: 'Spots what needs you',
    body: 'Renewals, price rises, charges after you cancelled. It tells you where you already work, and every alert comes with the decision one tap away.',
    stage: <SignalsStage />,
    label: 'Signals: alerts arrive, one is resolved with a tap, and a counter shows the money found this month',
  },
  {
    id: 'ask',
    icon: MessageSquareText,
    title: 'Answers anything',
    body: 'Ask in plain words. It does the digging, shows the numbers behind the answer and proposes the next step. You decide.',
    stage: <AskStage />,
    label: 'Ask Subly: a question about design tools answered, with an overlap found and a cancel proposed',
  },
  {
    id: 'summary',
    icon: NotebookText,
    title: 'Writes your month',
    body: 'On the first, a short note: what changed, why, and what to do. Every line explains itself, and sharing it takes one click.',
    stage: <SummaryStage />,
    label: 'Monthly summary with key numbers, three changes, an explanation and a share link',
  },
  {
    id: 'forecast',
    icon: LineChart,
    title: 'Sees ahead',
    body: 'Your balance for the next 90 days with the lowest point marked. Flip a what-if to see what a cancel, a late client or a hire does to it.',
    stage: <ForecastStage />,
    label: 'Cash forecast with the lowest point in week 9 and a what-if switch that raises it',
  },
]

const CYCLE_MS = 11000

export function SmartFeatures() {
  const { ref, index, select, running, hoverProps } = useCycle(tabs.length, CYCLE_MS)
  const tab = tabs[index]

  return (
    <Section id="smart">
      <SectionHeading eyebrow="See it work" title="Four jobs Subly does while you get on with yours." />

      <div ref={ref} {...hoverProps} className="mt-10 grid items-stretch gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-6">
        <div role="tablist" aria-label="What Subly does" className="grid content-start gap-2">
          {tabs.map((t, i) => {
            const active = i === index
            const Icon = t.icon
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`smart-tab-${t.id}`}
                aria-selected={active}
                aria-controls="smart-panel"
                onClick={() => select(i)}
                className={`relative overflow-hidden rounded-xl border p-4 text-left transition-colors sm:p-5 ${
                  active ? 'border-input bg-card shadow-sm' : 'border-transparent hover:bg-card/60'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors ${
                      active ? 'bg-brand-soft text-brand-ink' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <span className={`font-display text-lg font-bold tracking-tight sm:text-xl ${active ? '' : 'text-muted-foreground'}`}>
                    {t.title}
                  </span>
                </span>
                {active && <span className="mt-2 block pl-12 text-sm text-muted-foreground sm:text-base">{t.body}</span>}
                {active && running && (
                  <span
                    key={`${t.id}-progress`}
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand"
                    style={{ animation: `grow-x ${CYCLE_MS}ms linear both` }}
                  />
                )}
              </button>
            )
          })}
        </div>

        <div
          id="smart-panel"
          role="tabpanel"
          aria-labelledby={`smart-tab-${tab.id}`}
          aria-label={tab.label}
          className="min-h-[30rem] rounded-2xl border border-border bg-secondary/60 p-4 sm:p-6"
        >
          <Play key={tab.id}>
            <div aria-hidden="true">{tab.stage}</div>
          </Play>
        </div>
      </div>
    </Section>
  )
}
