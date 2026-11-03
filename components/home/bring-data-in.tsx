'use client'

import { CreditCard, FileText, Landmark, Mail, Check, PenLine, Table2, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Pill, ServiceLogo } from '@/components/home/mock'
import { Play, useCycle } from '@/components/home/motion'
import { Section, SectionHeading } from '@/components/ui/section'

type Way = {
  id: string
  icon: LucideIcon
  title: string
  body: string
  input: ReactNode
  found: ReactNode
  detail: string
}

/** Grey bar standing in for a line of text */
const Bar = ({ w, className = '' }: { w: string; className?: string }) => (
  <span className={`block h-1.5 rounded-full bg-muted ${className}`} style={{ width: w }} />
)

const ways: Way[] = [
  {
    id: 'statement',
    icon: FileText,
    title: 'A statement or CSV',
    body: 'Drop in a PDF or CSV from your bank or card. No bank login needed.',
    input: (
      <div className="relative mx-auto w-full max-w-[21rem] overflow-hidden rounded-lg border border-border bg-background p-4">
        <p className="mb-3 flex items-center gap-2 font-mono text-[11px] text-faint">
          <FileText className="h-3.5 w-3.5" aria-hidden="true" /> september-statement.pdf
        </p>
        <div className="space-y-2.5">
          {['70%', '55%', '82%', '48%', '66%', '74%'].map((w, i) => (
            <div
              key={i}
              className={`rounded-sm py-0.5 ${i % 2 === 1 ? 'anim-highlight' : ''}`}
              style={{ '--d': `${500 + i * 230}ms` } as React.CSSProperties}
            >
              <Bar w={w} />
            </div>
          ))}
        </div>
        <span
          aria-hidden="true"
          className="absolute inset-x-0 h-0.5 bg-brand shadow-[0_0_12px_var(--brand)]"
          style={{ animation: 'scan 1.8s ease-in-out 0.3s both' }}
        />
      </div>
    ),
    found: (
      <>
        <strong className="font-mono tabular-nums">23 recurring charges</strong>, about{' '}
        <strong className="font-mono tabular-nums">$1,184 a month</strong>
      </>
    ),
    detail: '4 look forgotten · 3 renew soon · 1 price increase',
  },
  {
    id: 'bank',
    icon: Landmark,
    title: 'Your bank',
    body: 'Link an account in the US, Canada or Europe. New charges show up on their own.',
    input: (
      <div className="mx-auto w-full max-w-[21rem] rounded-lg border border-border bg-background p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-muted text-muted-foreground">
            <Landmark className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="whitespace-nowrap text-sm font-medium">Oakline Business</p>
            <p className="text-xs text-faint">••••  4821</p>
          </div>
          <span className="anim-pop" style={{ '--d': '500ms' } as React.CSSProperties}>
            <Pill tone="money">Connected</Pill>
          </span>
        </div>
        <div className="mt-4 flex items-center gap-2">
          {['adobecc', 'notion', 'figma', 'zoom', 'basecamp'].map((l, i) => (
            <span key={l} className="anim-pop" style={{ '--d': `${900 + i * 260}ms` } as React.CSSProperties}>
              <ServiceLogo logo={l} className="h-9 w-9" />
            </span>
          ))}
        </div>
      </div>
    ),
    found: (
      <>
        <strong className="font-mono tabular-nums">26 recurring charges</strong> found, and new ones appear as they happen
      </>
    ),
    detail: 'Synced 2 hours ago',
  },
  {
    id: 'receipt',
    icon: Mail,
    title: 'A forwarded receipt',
    body: 'Your workspace gets its own address. Forward a receipt and it adds itself.',
    input: (
      <div className="mx-auto w-full max-w-[21rem] rounded-lg border border-border bg-background p-4 text-xs">
        <p className="flex justify-between gap-2 border-b border-border pb-2">
          <span className="text-faint">To</span>
          <span className="truncate font-mono">oakline@in.subly.app</span>
        </p>
        <p className="flex justify-between gap-2 border-b border-border py-2">
          <span className="text-faint">Subject</span>
          <span className="truncate">Fwd: Your Krisp receipt</span>
        </p>
        <div className="space-y-2 py-3">
          <Bar w="90%" />
          <Bar w="60%" />
        </div>
        <span className="anim-pop inline-block" style={{ '--d': '700ms' } as React.CSSProperties}>
          <Pill tone="brand">Read by Subly</Pill>
        </span>
      </div>
    ),
    found: (
      <>
        <strong>Krisp</strong> added: <strong className="font-mono tabular-nums">$14.99 a month</strong>
      </>
    ),
    detail: 'Next charge Nov 12 · category Software',
  },
  {
    id: 'stripe',
    icon: CreditCard,
    title: 'Stripe',
    body: 'Pull in your recurring revenue, so money in sits next to money out from day one.',
    input: (
      <div className="mx-auto w-full max-w-[21rem] rounded-lg border border-border bg-background p-4">
        <div className="flex items-center gap-2.5">
          <ServiceLogo logo="stripe" className="h-8 w-8" />
          <p className="text-sm font-medium">Stripe</p>
          <span className="anim-pop ml-auto" style={{ '--d': '400ms' } as React.CSSProperties}>
            <Pill tone="money">Connected</Pill>
          </span>
        </div>
        <ul className="mt-3 divide-y divide-border text-sm">
          {[
            ['Northlight retainer', '$2,500'],
            ['Pro plan × 38', '$1,862'],
            ['Coastline Bakery', '$1,560'],
          ].map(([n, v], i) => (
            <li
              key={n}
              className="anim-rise flex justify-between py-2"
              style={{ '--d': `${700 + i * 320}ms` } as React.CSSProperties}
            >
              <span className="text-muted-foreground">{n}</span>
              <span className="font-mono tabular-nums">
                <span className="mr-px text-money-in">+</span>
                {v}
              </span>
            </li>
          ))}
        </ul>
      </div>
    ),
    found: (
      <>
        <strong className="font-mono tabular-nums">$5,980 a month</strong> coming in, next to what goes out
      </>
    ),
    detail: '5 recurring payments found',
  },
  {
    id: 'sheet',
    icon: Table2,
    title: 'A spreadsheet or AppSumo export',
    body: 'Bring what you already track. Subly matches each row to a service.',
    input: (
      <div className="mx-auto w-full max-w-[21rem] rounded-lg border border-border bg-background p-3 text-xs">
        {[
          ['Calmy', 'AppSumo', '$69'],
          ['Webflow', 'Yearly', '$168'],
          ['Hetzner', 'Monthly', '€38'],
          ['Canva', 'Yearly', '$119'],
        ].map(([a, b, c], i) => (
          <div
            key={a}
            className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 border-b border-border py-2 last:border-0"
          >
            <span className="font-medium">{a}</span>
            <span className="text-faint">{b}</span>
            <span className="font-mono tabular-nums">{c}</span>
            <span
              className="anim-pop grid h-4 w-4 place-items-center rounded-full bg-money-in-soft text-money-in"
              style={{ '--d': `${600 + i * 300}ms` } as React.CSSProperties}
            >
              <Check className="h-3 w-3" aria-hidden="true" />
            </span>
          </div>
        ))}
      </div>
    ),
    found: (
      <>
        <strong className="font-mono tabular-nums">38 of 41 rows</strong> matched, with prices and renewal dates
      </>
    ),
    detail: '3 lifetime deals still refundable',
  },
  {
    id: 'type',
    icon: PenLine,
    title: 'Just type it',
    body: 'Start typing a service. Subly fills in the logo, price and billing cycle.',
    input: (
      <div className="mx-auto w-full max-w-[21rem]">
        <div className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm">
          <span className="anim-type" style={{ '--t': '0.8s', '--steps': 3, '--d': '300ms' } as React.CSSProperties}>
            Fig
          </span>
        </div>
        <div className="anim-rise mt-2 flex items-center gap-3 rounded-lg border border-border bg-background p-3" style={{ '--d': '1300ms' } as React.CSSProperties}>
          <ServiceLogo logo="figma" className="h-9 w-9" />
          <div>
            <p className="text-sm font-medium">Figma</p>
            <p className="text-xs text-muted-foreground">Design · $15.00 monthly</p>
          </div>
        </div>
      </div>
    ),
    found: (
      <>
        <strong>Figma</strong> added: <strong className="font-mono tabular-nums">$15.00 a month</strong>
      </>
    ),
    detail: 'Next charge Nov 15',
  },
]

const CYCLE_MS = 6500

export function BringDataIn() {
  const { ref, index, select, running, hoverProps } = useCycle(ways.length, CYCLE_MS)
  const way = ways[index]

  return (
    <Section id="how-it-works">
      <SectionHeading
        eyebrow="Start in minutes"
        title="Start wherever your money already lives."
        lede="No migration project. Pick what you have in front of you, and Subly builds the picture around it."
      />

      <div ref={ref} {...hoverProps} className="mt-10 grid items-stretch gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6">
        <div role="tablist" aria-label="Ways to get started" className="grid gap-2">
          {ways.map((w, i) => {
            const active = i === index
            const Icon = w.icon
            return (
              <button
                key={w.id}
                type="button"
                role="tab"
                id={`start-tab-${w.id}`}
                aria-selected={active}
                aria-controls="start-panel"
                onClick={() => select(i)}
                className={`relative overflow-hidden rounded-xl border p-4 text-left transition-colors ${
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
                  <span className={`font-display text-lg font-bold tracking-tight ${active ? '' : 'text-muted-foreground'}`}>
                    {w.title}
                  </span>
                </span>
                {active && <span className="mt-2 block pl-12 text-sm text-muted-foreground">{w.body}</span>}
                {active && running && (
                  <span
                    key={`${w.id}-progress`}
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
          id="start-panel"
          role="tabpanel"
          aria-labelledby={`start-tab-${way.id}`}
          className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
        >
          <Play key={way.id} className="flex flex-1 flex-col">
            <div aria-hidden="true" className="grid min-h-[16rem] flex-1 place-items-center bg-secondary/60 px-4 py-8 sm:py-10">
              {way.input}
            </div>
            <div className="border-t border-border p-5 sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-faint">Subly found</p>
              <p className="anim-rise mt-2 font-display text-xl leading-snug tracking-tight sm:text-2xl" style={{ '--d': '1900ms' } as React.CSSProperties}>
                {way.found}
              </p>
              <p className="anim-fade mt-1.5 text-sm text-muted-foreground" style={{ '--d': '2300ms' } as React.CSSProperties}>
                {way.detail}
              </p>
            </div>
          </Play>
        </div>
      </div>
    </Section>
  )
}
