import { Container, Mark, SectionHeading } from '@/components/ui/section'

export default function PricingHero() {
  return (
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
  )
}
