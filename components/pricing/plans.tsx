'use client'

import { Check } from 'lucide-react'
import { useState } from 'react'
import { AnchorButton } from '@/components/ui/button'
import { Container } from '@/components/ui/section'
import { type Interval, PLANS, monthsFree, perMonthWhenYearly } from '@/lib/plans'
import { SIGNUP_URL } from '@/lib/site'

export function PricingPlans() {
  const [interval, setInterval] = useState<Interval>('year')

  return (
    <Container>
      <div className="flex justify-center">
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

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((p) => {
          const free = p.month === 0
          const price = interval === 'year' ? p.year : p.month
          return (
            <li
              key={p.id}
              className={`relative flex flex-col rounded-2xl border bg-card p-6 ${p.popular ? 'border-brand ring-1 ring-brand' : 'border-border'}`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-6 rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-medium text-brand-foreground">
                  Most popular
                </span>
              )}
              <h2 className="font-display text-xl font-bold tracking-tight">{p.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.forWho}</p>

              <p className="mt-6">
                <span className="font-mono text-4xl tabular-nums tracking-tight">${price}</span>
                <span className="text-sm text-muted-foreground">
                  {free ? '' : interval === 'year' ? ' / year' : ' / month'}
                </span>
              </p>
              <p className="mt-1 h-5 text-xs text-faint">
                {free
                  ? 'Free for good'
                  : interval === 'year'
                    ? `About $${perMonthWhenYearly(p)} a month, ${monthsFree(p)} months free`
                    : `or $${p.year} a year`}
              </p>

              <AnchorButton href={SIGNUP_URL} variant={p.popular ? 'primary' : 'outline'} className="mt-6 w-full">
                {free ? 'Start free' : `Try ${p.name}`}
              </AnchorButton>

              <ul className="mt-6 space-y-2.5 border-t border-border pt-6 text-sm">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Every new account starts with a 14-day Business trial. Prices are in US dollars.
      </p>
    </Container>
  )
}
