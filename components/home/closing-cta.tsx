import { ArrowRight } from 'lucide-react'
import { AnchorButton } from '@/components/ui/button'
import { Container } from '@/components/ui/section'
import { SIGNUP_URL } from '@/lib/site'

export function ClosingCta({
  title = 'Run your money like the company you are becoming.',
  body = 'Upload one statement, connect a bank or just start typing. In two minutes you will see the whole picture.',
}: {
  title?: string
  body?: string
}) {
  return (
    <section className="pb-16 sm:pb-24">
      <Container>
        <div className="hero-glow rounded-3xl border border-border bg-card px-6 py-14 text-center sm:px-12 sm:py-20">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground sm:text-lg">{body}</p>
          <AnchorButton href={SIGNUP_URL} size="lg" className="mt-8 w-full sm:w-auto">
            Start free trial
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </AnchorButton>
          <p className="mt-3 text-sm text-faint">Free for 14 days with the full Business plan. The Free plan is yours to keep.</p>
        </div>
      </Container>
    </section>
  )
}
