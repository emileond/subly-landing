import { ArrowRight } from 'lucide-react'
import { AnchorButton } from '@/components/ui/button'
import { Container } from '@/components/ui/section'
import { TodayScreen } from '@/components/home/today-screen'
import { SIGNUP_URL } from '@/lib/site'

export function Hero({
  eyebrow = 'For founders, freelancers and small teams',
  title = 'Everything you need to run your money with confidence.',
  sub = 'Subly is the part of your business that watches every payment, remembers every date and tells you what to do next.',
  cta = 'Start free trial',
  note = '14 days of the full Business plan, no credit card needed. The Free plan is yours to keep.',
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
        <div className="mx-auto max-w-5xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-brand-ink">
            {eyebrow}
          </p>
          <h1 className="mt-6 font-display text-[2.3rem] font-bold leading-[1.06] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">{sub}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <AnchorButton href={SIGNUP_URL} data-cta="hero" size="lg" className="w-full sm:w-auto">
              {cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </AnchorButton>
            <a
              href="#value"
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
