'use client'

import { ArrowRight, Check } from 'lucide-react'
import { useState } from 'react'
import { AnchorButton } from '@/components/ui/button'
import { type Interval, PLANS, perMonthWhenYearly } from '@/lib/plans'
import { SIGNUP_URL } from '@/lib/site'

export function PricingPlans() {
  const [interval, setInterval] = useState<Interval>('year')

  return (
    <div>
      <div className="flex flex-col items-center gap-3">
        <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-money-in" aria-hidden="true" />
          Every new account starts with a free 14-day Business trial. No card needed.
        </p>
        <div role="group" aria-label="Billing period" className="inline-flex rounded-lg border border-border bg-card p-1">
          {(['month', 'year'] as const).map((i) => (
            <button
              key={i}
              type="button"
              aria-pressed={interval === i}
              onClick={() => setInterval(i)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                interval === i ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {i === 'month' ? 'Monthly' : 'Yearly'}
              {i === 'year' && (
                <span className={`ml-2 text-xs ${interval === 'year' ? 'opacity-80' : 'text-brand-ink'}`}>2 months free</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
        {PLANS.map((p) => {
          const free = p.month === 0
          // Yearly shows the monthly equivalent big, so plans compare on the same unit
          const price = interval === 'year' ? perMonthWhenYearly(p) : p.month
          return (
            <li
              key={p.id}
              className={`relative flex flex-col rounded-2xl border bg-card p-6 ${
                p.popular ? 'border-brand shadow-[0_24px_60px_-30px_color-mix(in_srgb,var(--brand)_60%,transparent)] ring-1 ring-brand lg:-my-3 lg:py-9' : 'border-border'
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-6 rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-medium text-brand-foreground">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold tracking-tight">{p.name}</h3>
              <p className="mt-1 min-h-10 text-sm text-muted-foreground">{p.forWho}</p>

              <p className="mt-5">
                <span className="font-mono text-4xl tabular-nums tracking-tight">${price}</span>
                <span className="text-sm text-muted-foreground">{free ? '' : ' / month'}</span>
              </p>
              <p className="mt-1 min-h-5 text-xs text-faint">
                {free
                  ? 'Free for good'
                  : interval === 'year'
                    ? `$${p.year} a year, or $${p.month} monthly`
                    : `or $${p.year} a year`}
              </p>

              <AnchorButton
                href={SIGNUP_URL}
                data-cta={`pricing-${p.id}`}
                variant={p.popular ? 'primary' : 'outline'}
                className="mt-5 w-full"
              >
                {free ? 'Start free' : 'Start free trial'}
                {p.popular && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
              </AnchorButton>
              <p className="mt-2 h-4 text-center text-xs text-faint">{free ? 'No card needed' : 'Trial runs on Business, no card'}</p>

              <div className="mt-5 flex-1 border-t border-border pt-5">
                {p.includes && <p className="mb-3 text-sm font-semibold">{p.includes}</p>}
                <ul className="space-y-2.5 text-sm">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          )
        })}
      </ul>
      <p className="mt-8 text-center text-sm text-muted-foreground">Prices are in US dollars. Cancel any time.</p>
    </div>
  )
}
