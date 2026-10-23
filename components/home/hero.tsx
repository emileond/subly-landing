import { ArrowRight } from 'lucide-react'
import { AnchorButton } from '@/components/ui/button'
import { Container, Mark } from '@/components/ui/section'
import { TodayScreen } from '@/components/home/today-screen'
import { SIGNUP_URL } from '@/lib/site'

export function Hero({
  eyebrow = 'Subly 2.0',
  title = (
    <>
      Every renewal, price rise and refund deadline, <Mark>caught before it costs you.</Mark>
    </>
  ),
  sub = 'Upload a statement and Subly finds every recurring charge in two minutes. Then it tells you the few things that need a decision, in Slack, Teams or email, with the charges behind every number. Built for small teams, solo founders and freelancers.',
  cta = 'Start free',
  note = "The CFO you can't afford yet. 14-day Business trial, and the Free plan stays free.",
}: {
  eyebrow?: string
  title?: React.ReactNode
  sub?: string
  cta?: string
  note?: string
}) {
  return (
    <section className="hero-glow relative overflow-hidden pb-16 pt-12 sm:pb-24 sm:pt-20">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-brand-ink">
            {eyebrow}
          </p>
          <h1 className="mt-6 font-display text-[2.1rem] font-bold leading-[1.06] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-pretty text-muted-foreground sm:text-lg">{sub}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <AnchorButton href={SIGNUP_URL} size="lg" className="w-full sm:w-auto">
              {cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </AnchorButton>
            <a
              href="#how-it-works"
              className="inline-flex h-12 items-center justify-center rounded-lg px-4 text-base font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-brand"
            >
              See how it works
            </a>
          </div>
          <p className="mt-3 text-sm text-faint">{note}</p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl sm:mt-16">
          <TodayScreen />
        </div>
      </Container>
    </section>
  )
}
