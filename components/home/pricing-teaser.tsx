import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Section, SectionHeading } from '@/components/ui/section'
import { PLANS } from '@/lib/plans'

export function PricingTeaser() {
  return (
    <Section id="pricing">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Pricing"
          title="Priced for small teams"
          lede="Start free. Every new account gets a 14-day Business trial, so you can try the full thing first."
        />
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1.5 text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-brand"
        >
          See plans and limits <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((p) => (
          <li
            key={p.id}
            className={`relative rounded-xl border bg-card p-5 ${p.popular ? 'border-brand ring-1 ring-brand' : 'border-border'}`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-5 rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-medium text-brand-foreground">
                Most popular
              </span>
            )}
            <h3 className="font-display text-lg font-bold tracking-tight">{p.name}</h3>
            <p className="mt-3">
              <span className="font-mono text-3xl tabular-nums tracking-tight">${p.month}</span>
              <span className="text-sm text-muted-foreground"> / month</span>
            </p>
            {p.year > 0 && <p className="text-xs text-faint">or ${p.year} a year</p>}
            {p.year === 0 && <p className="text-xs text-faint">free for good</p>}
            <p className="mt-3 text-sm text-muted-foreground">{p.forWho}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
