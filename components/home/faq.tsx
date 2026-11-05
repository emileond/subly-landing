import { ChevronDown } from 'lucide-react'
import { Section, SectionHeading } from '@/components/ui/section'
import { type Faq, faqs } from '@/lib/faq'

/** The shared questions (all, or those starting with one of `only`), after any page-specific `extra` ones */
export function FaqSection({ only, extra = [] }: { only?: string[]; extra?: Faq[] }) {
  const items = [...extra, ...(only ? faqs.filter((f) => only.some((o) => f.q.startsWith(o))) : faqs)]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <Section id="faq">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <div className="mx-auto max-w-3xl">
        <SectionHeading align="center" eyebrow="Questions" title="Frequently asked questions" />
        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
          {items.map((f, i) => (
            <details key={f.q} className="group px-5" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-medium [&::-webkit-details-marker]:hidden">
                <span>{f.q}</span>
                <ChevronDown className="h-4 w-4 shrink-0 text-faint transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="pb-5 text-muted-foreground">
                {f.a}
                {f.q.startsWith('Do you have an affiliate') && (
                  <>
                    {' '}
                    <a href="/affiliates" className="font-medium text-brand-ink underline underline-offset-4">
                      See the affiliate program
                    </a>
                    .
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  )
}
