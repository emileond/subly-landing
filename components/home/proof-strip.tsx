import Image from 'next/image'
import { Container } from '@/components/ui/section'
import { testimonials } from '@/lib/testimonials'

/**
 * Real numbers from the Subly database (2 Nov 2026), rounded down. Update them
 * from time to time; never round up. Savings: recurring money-out items marked
 * inactive, as a yearly amount in USD, leaving out items over $10k a year
 * (outliers and test data): $5.29M across 9,776 items.
 */
const stats = [
  { value: '26,000+', label: 'accounts opened' },
  { value: '95,000+', label: 'recurring payments tracked' },
  { value: '$5M+', label: 'a year saved in cancelled charges' },
]

const logos = testimonials.slice(1, 7)

export function ProofStrip() {
  return (
    <section aria-label="Who uses Subly" className="border-y border-border bg-secondary/60 py-10 sm:py-12">
      <Container>
        <dl className="grid grid-cols-3 gap-4 text-center sm:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</dt>
              <dd className="font-display text-3xl font-bold tabular-nums tracking-tight sm:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <p className="text-sm text-muted-foreground">Used by teams like</p>
          <ul className="flex flex-wrap justify-center gap-2">
            {logos.map((t) => (
              <li
                key={t.name}
                title={t.company}
                className="relative h-12 w-12 overflow-hidden rounded-full border border-border bg-white"
              >
                <Image src={t.logo} alt={t.company} fill sizes="48px" className="object-contain p-1.5" />
              </li>
            ))}
          </ul>
          <a href="#testimonials" className="text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-brand">
            Read their stories
          </a>
        </div>
      </Container>
    </section>
  )
}
