import type { Metadata } from 'next'
import { ClosingCta } from '@/components/home/closing-cta'
import { FaqSection } from '@/components/home/faq'
import { FeatureTable } from '@/components/pricing/feature-table'
import { Lifetime } from '@/components/pricing/lifetime'
import { PricingPlans } from '@/components/pricing/plans'
import { Container, Mark, Section, SectionHeading } from '@/components/ui/section'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Pricing',
  description:
    'Free, Personal at $5 a month, Business at $19 and Team at $49. Every new account starts with a 14-day Business trial.',
  path: '/pricing',
})

export default function PricingPage() {
  return (
    <>
      <section className="hero-glow pb-4 pt-12 sm:pt-20">
        <Container>
          <SectionHeading
            as="h1"
            align="center"
            eyebrow="Pricing"
            title={
              <>
                One caught renewal <Mark>pays for it.</Mark>
              </>
            }
            lede="Try everything free for 14 days. Then keep the Free plan, or upgrade when you need more people, banks or agents."
          />
        </Container>
      </section>
      <Section className="!pt-10 sm:!pt-12">
        <PricingPlans />
      </Section>
      <Section tone="sunken">
        <FeatureTable />
      </Section>
      <Section>
        <Lifetime />
      </Section>
      <FaqSection
        only={[
          'How many items',
          'What plan should I choose',
          'Is there a contract',
          'I have a lifetime deal',
          'Does Subly pay for itself',
          'Does Subly connect to my bank',
        ]}
      />
      <ClosingCta />
    </>
  )
}
