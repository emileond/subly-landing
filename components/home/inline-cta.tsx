import { ArrowRight } from 'lucide-react'
import { AnchorButton } from '@/components/ui/button'
import { Container } from '@/components/ui/section'
import { SIGNUP_URL } from '@/lib/site'

/** A slim call to action between sections. */
export function InlineCta({
  title = 'Try it on your own numbers.',
  body = 'Free for 14 days with the full Business plan, no credit card needed. Keep the Free plan afterwards.',
  label = 'Start free trial',
}: {
  title?: string
  body?: string
  label?: string
}) {
  return (
    <div className="pb-4 sm:pb-8">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-card px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-bold tracking-tight">{title}</p>
            <p className="text-sm text-muted-foreground">{body}</p>
          </div>
          <AnchorButton href={SIGNUP_URL} data-cta="inline" size="lg" className="w-full shrink-0 sm:w-auto">
            {label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </AnchorButton>
        </div>
      </Container>
    </div>
  )
}
