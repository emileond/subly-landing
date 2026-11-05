import { ArrowRight } from 'lucide-react'
import { PricingPlans } from '@/components/pricing/plans'
import { Section, SectionHeading } from '@/components/ui/section'

export function PricingTeaser() {
  return (
    <Section id="pricing">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple pricing that grows with you"
          lede="Start with a free 14-day trial of Business, the full thing. Keep the Free plan afterwards, or pick the one that fits."
        />
        <a
          href="/pricing"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-brand"
        >
          Compare every feature <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      <div className="mt-10">
        <PricingPlans />
      </div>
    </Section>
  )
}
