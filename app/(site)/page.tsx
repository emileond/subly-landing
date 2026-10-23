import type { Metadata } from 'next'
import { Ask } from '@/components/home/ask'
import { BringDataIn } from '@/components/home/bring-data-in'
import { ClosingCta } from '@/components/home/closing-cta'
import { FaqSection } from '@/components/home/faq'
import { Hero } from '@/components/home/hero'
import { MoneyInOut } from '@/components/home/money-in-out'
import { PlainWords } from '@/components/home/plain-words'
import { PricingTeaser } from '@/components/home/pricing-teaser'
import { Signals } from '@/components/home/signals'
import { Summary } from '@/components/home/summary'
import { Teams } from '@/components/home/teams'
import { Testimonials } from '@/components/home/testimonials'
import { DEFAULT_DESCRIPTION, SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: { absolute: 'Subly: control your money, know your next move' },
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
      <BringDataIn />
      <Signals />
      <MoneyInOut />
      <Summary />
      <Ask />
      <Teams />
      <PlainWords />
      <PricingTeaser />
      <Testimonials />
      <FaqSection />
      <ClosingCta />
    </>
  )
}
