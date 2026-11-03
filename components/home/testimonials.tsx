'use client'

import { Quote as QuoteIcon } from 'lucide-react'
import Image from 'next/image'
import { Fragment, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Section, SectionHeading } from '@/components/ui/section'
import { type Testimonial, testimonials } from '@/lib/testimonials'

/** Quotes mark the line to pick out with **bold**; it gets a soft highlight so the card can be skimmed. */
function Quote({ text, large = false }: { text: string; large?: boolean }) {
  return (
    <>
      {text.split('\n\n').map((para, i) => (
        <p key={i} className={i ? (large ? 'mt-5' : 'mt-3') : ''}>
          {para.split('**').map((chunk, j) =>
            j % 2 ? (
              <mark key={j} className="rounded bg-brand-soft px-1 py-0.5 font-semibold text-foreground [box-decoration-break:clone]">
                {chunk}
              </mark>
            ) : (
              <Fragment key={j}>{chunk}</Fragment>
            ),
          )}
        </p>
      ))}
    </>
  )
}

function Person({ t, large = false }: { t: Testimonial; large?: boolean }) {
  return (
    <figcaption className="flex items-center gap-3">
      <span
        className={`relative shrink-0 overflow-hidden rounded-full border border-border bg-white ${large ? 'h-12 w-12' : 'h-10 w-10'}`}
      >
        <Image src={t.logo} alt="" fill sizes="48px" className="object-contain p-1" />
      </span>
      <span className="min-w-0">
        <span className="block truncate font-semibold">{t.name}</span>
        <span className="block truncate text-sm text-muted-foreground">{t.company}</span>
      </span>
    </figcaption>
  )
}

export function Testimonials() {
  const [all, setAll] = useState(false)
  const [featured, ...rest] = testimonials
  const shown = all ? rest : rest.slice(0, 6)

  return (
    <Section id="testimonials">
      <SectionHeading
        align="center"
        eyebrow="Customers"
        title="Hear from people who use it"
        lede="More than 26,000 founders, freelancers and small teams have opened a Subly account. Here are a few of them."
      />

      <figure className="hero-glow relative mt-12 overflow-hidden rounded-3xl border border-border bg-card px-6 py-10 sm:px-12 sm:py-14">
        <QuoteIcon className="h-9 w-9 text-brand" aria-hidden="true" />
        <blockquote className="mt-5 max-w-3xl font-display text-xl leading-snug tracking-tight text-pretty text-foreground sm:text-3xl sm:leading-snug">
          <Quote text={featured.quote} large />
        </blockquote>
        <div className="mt-8">
          <Person t={featured} large />
        </div>
      </figure>

      <ul className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((t) => (
          <li key={t.name} className="h-full">
            <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
              <QuoteIcon className="h-5 w-5 text-brand" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground">
                <Quote text={t.quote} />
              </blockquote>
              <div className="mt-6 border-t border-border pt-5">
                <Person t={t} />
              </div>
            </figure>
          </li>
        ))}
      </ul>

      {!all && rest.length > 6 && (
        <div className="mt-8 text-center">
          <Button variant="outline" size="lg" onClick={() => setAll(true)}>
            Show more stories
          </Button>
        </div>
      )}
    </Section>
  )
}
