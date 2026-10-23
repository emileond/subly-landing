'use client'

import Image from 'next/image'
import { Fragment, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Section, SectionHeading } from '@/components/ui/section'
import { testimonials } from '@/lib/testimonials'

function Quote({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((para, i) => (
        <p key={i} className={i ? 'mt-3' : ''}>
          {para.split('**').map((chunk, j) =>
            j % 2 ? (
              <strong key={j} className="font-semibold">
                {chunk}
              </strong>
            ) : (
              <Fragment key={j}>{chunk}</Fragment>
            ),
          )}
        </p>
      ))}
    </>
  )
}

export function Testimonials() {
  const [all, setAll] = useState(false)
  const shown = all ? testimonials : testimonials.slice(0, 6)

  return (
    <Section id="testimonials" tone="sunken">
      <SectionHeading
        align="center"
        eyebrow="Customers"
        title="Hear from people who use it"
        lede="Subly is trusted by thousands of businesses, freelancers and solopreneurs worldwide."
      />
      <ul className="mt-12 columns-1 gap-4 md:columns-2 lg:columns-3 [&>li]:mb-4">
        {shown.map((t) => (
          <li key={t.name} className="break-inside-avoid rounded-xl border border-border bg-card p-5">
            <figure>
            <blockquote className="text-sm leading-relaxed text-card-foreground">
              <Quote text={t.quote} />
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-background">
                <Image src={t.logo} alt="" fill sizes="40px" className="object-contain p-1" />
              </span>
              <span className="min-w-0 text-sm">
                <span className="block truncate font-medium">{t.name}</span>
                <span className="block truncate text-xs text-muted-foreground">{t.company}</span>
              </span>
            </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      {!all && (
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => setAll(true)}>
            Show more
          </Button>
        </div>
      )}
    </Section>
  )
}
