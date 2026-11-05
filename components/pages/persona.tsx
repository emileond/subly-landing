import { Hero } from '@/components/home/hero'
import { Section, SectionHeading } from '@/components/ui/section'
import { type Persona, personas } from '@/lib/personas'

/** The top of a /for/[persona] page: hero, benefits and scenes. The shared sections follow in the .astro page. */
export default function PersonaIntro({ slug }: { slug: Persona['slug'] }) {
  const p = personas[slug]
  return (
    <>
      <Hero eyebrow={p.eyebrow} title={p.title} sub={p.sub} note="14-day Business trial, no credit card needed. The Free plan stays free." />

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
