import { Hero } from '@/components/home/hero'
import { Check } from 'lucide-react'
import { Section, SectionHeading } from '@/components/ui/section'
import { type Persona, personas } from '@/lib/personas'

/** The top of a /for/[persona] page: hero, benefits and scenes. The shared sections follow in the .astro page. */
export default function PersonaIntro({ slug }: { slug: Persona['slug'] }) {
  const p = personas[slug]
  return (
    <>
      <Hero eyebrow={p.eyebrow} title={p.title} sub={p.sub} note="14-day Business trial, no credit card needed. The Free plan stays free." />

      {/* The short answer, first: what search engines and AI assistants quote */}
      <Section className="pt-4! sm:pt-6! lg:pt-8!">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-balance sm:text-3xl">{p.answer.question}</h2>
            {p.answer.paragraphs.map((text) => (
              <p key={text} className="mt-4 text-pretty text-muted-foreground sm:text-lg">
                {text}
              </p>
            ))}
          </div>
          <ul className="space-y-3 self-center rounded-xl border border-border bg-card p-6">
            {p.answer.points.map((point) => (
              <li key={point} className="flex gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-brand-ink" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

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
    </>
  )
}
