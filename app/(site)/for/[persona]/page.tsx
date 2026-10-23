import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BringDataIn } from '@/components/home/bring-data-in'
import { ClosingCta } from '@/components/home/closing-cta'
import { FaqSection } from '@/components/home/faq'
import { Hero } from '@/components/home/hero'
import { PricingTeaser } from '@/components/home/pricing-teaser'
import { Section, SectionHeading } from '@/components/ui/section'
import { type Persona, personaSlugs, personas } from '@/lib/personas'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ persona: string }> }

export function generateStaticParams() {
  return personaSlugs.map((persona) => ({ persona }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { persona } = await params
  const p = personas[persona as Persona['slug']]
  if (!p) return {}
  return pageMetadata({
    title: p.metaTitle,
    description: p.metaDescription,
    path: `/for/${p.slug}`,
    ogTitle: p.ogTitle,
  })
}

export default async function PersonaPage({ params }: Props) {
  const { persona } = await params
  const p = personas[persona as Persona['slug']]
  if (!p) notFound()

  return (
    <>
      <Hero eyebrow={p.eyebrow} title={p.title} sub={p.sub} />

      <Section tone="sunken">
        <SectionHeading eyebrow="Why it works" title={p.benefitsTitle} />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {p.benefits.map((b) => (
            <li key={b.title} className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display text-xl font-bold tracking-tight">{b.title}</h3>
              <p className="mt-2 text-muted-foreground">{b.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <SectionHeading eyebrow="In practice" title={p.scenesTitle} lede={`Subly speaks up only when something needs you. Here is what that sounds like.`} />
          <ul className="space-y-3">
            {p.scenes.map((s) => (
              <li key={s.label} className="grid gap-1 rounded-xl border border-border bg-card p-4 sm:grid-cols-[130px_1fr] sm:gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-brand-ink sm:pt-1">{s.label}</span>
                <span>{s.line}</span>
              </li>
            ))}
            <li className="rounded-xl border border-dashed border-input p-4 text-sm text-muted-foreground">
              <strong className="font-semibold text-foreground">Best fit: {p.plan.name}.</strong> {p.plan.line}
            </li>
          </ul>
        </div>
      </Section>

      <BringDataIn />
      <PricingTeaser />
      <FaqSection only={['What can Subly keep track of', 'How do I get my data in', 'How is my data handled', 'Is there a contract']} />
      <ClosingCta title={p.closing.title} body={p.closing.body} />
    </>
  )
}
