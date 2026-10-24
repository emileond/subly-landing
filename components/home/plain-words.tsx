import { ArrowRight } from 'lucide-react'
import { Section, SectionHeading } from '@/components/ui/section'

const glossary = [
  { jargon: 'Runway', plain: 'How long your money lasts' },
  { jargon: 'MRR', plain: 'Money in each month' },
  { jargon: 'Variance', plain: "You're $300 over your plan" },
]

export function PlainWords() {
  return (
    <Section>
      <SectionHeading
        eyebrow="In plain words"
        title="No finance degree needed"
        lede="Subly talks like a smart friend who handles the money. Here is how it says things."
      />
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {glossary.map((g) => (
          <li key={g.jargon} className="rounded-xl border border-border bg-card p-5">
            <p className="font-mono text-sm text-faint line-through decoration-faint/60">{g.jargon}</p>
            <ArrowRight className="my-3 h-4 w-4 rotate-90 text-brand md:rotate-0" aria-hidden="true" />
            <p className="font-display text-xl font-bold leading-snug tracking-tight text-balance">{g.plain}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
