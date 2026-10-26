import { ArrowRight } from 'lucide-react'
import { AnchorButton } from '@/components/ui/button'
import { Container } from '@/components/ui/section'
import { SIGNUP_URL } from '@/lib/site'

export function ClosingCta({
  title = 'Find out what you really pay for.',
  body = 'Upload one statement and see your recurring money in a couple of minutes.',
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
            Start free
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </AnchorButton>
          <p className="mt-3 text-sm text-faint">14-day Business trial. Free plan stays free.</p>
        </div>
      </Container>
    </section>
  )
}
