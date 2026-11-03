import type { Metadata } from 'next'
import { Agents } from '@/components/home/agents'
import { BringDataIn } from '@/components/home/bring-data-in'
import { ClosingCta } from '@/components/home/closing-cta'
import { Everything } from '@/components/home/everything'
import { FaqSection } from '@/components/home/faq'
import { Hero } from '@/components/home/hero'
import { Outcomes } from '@/components/home/outcomes'
import { PricingTeaser } from '@/components/home/pricing-teaser'
import { InlineCta } from '@/components/home/inline-cta'
import { SmartFeatures } from '@/components/home/smart-features'
import { SmartBand } from '@/components/home/smart-band'
import { Teams } from '@/components/home/teams'
import { Testimonials } from '@/components/home/testimonials'
import { DEFAULT_DESCRIPTION, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: { absolute: 'Subly: clarity that used to take a finance team' },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: '/' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Subly',
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      sameAs: ['https://twitter.com/sublyweb'],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Subly',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION,
      offers: { '@type': 'AggregateOffer', priceCurrency: 'USD', lowPrice: '0', highPrice: '49' },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <Outcomes />
      <BringDataIn />
      <InlineCta title="Two minutes from now, you could see the whole picture." />
      <SmartBand />
      <SmartFeatures />
      <Agents />
      <Teams />
      <Everything />
      <PricingTeaser />
      <ClosingCta />
      <Testimonials />
      <FaqSection />
    </>
  )
}
