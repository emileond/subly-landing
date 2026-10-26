import { Check } from 'lucide-react'
import { Container, Eyebrow } from '@/components/ui/section'
import { AI_ADDON } from '@/lib/plans'

const adds = [
  'Statement reading and receipt forwarding',
  'Ask Subly about your numbers',
  'The Slack app with buttons',
  'The Claude connector and the API',
]

export function Lifetime() {
  return (
    <Container>
      <div className="grid gap-8 rounded-2xl border border-border bg-card p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        <div>
          <Eyebrow>Lifetime deals</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-4xl">
            Bought Subly on AppSumo? Keep it as it is.
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Your lifetime deal stays exactly as you bought it, for good. The newest features cost us real money to run, so
            they come as an add-on at a lifetime-deal price. It only adds to your deal, and you can cancel it any time.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-background p-5">
          <p className="font-display text-lg font-bold tracking-tight">AI &amp; Automation add-on</p>
          <p className="mt-2">
            <span className="font-mono text-3xl tabular-nums">${AI_ADDON.month}</span>
            <span className="text-sm text-muted-foreground"> / month</span>
            <span className="mx-2 text-faint">·</span>
            <span className="font-mono text-3xl tabular-nums">${AI_ADDON.year}</span>
            <span className="text-sm text-muted-foreground"> / year</span>
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {adds.map((a) => (
              <li key={a} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" aria-hidden="true" />
                {a}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-faint">Add it from Plans inside Subly once you are signed in.</p>
        </div>
      </div>
    </Container>
  )
}
