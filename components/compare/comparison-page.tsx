import { ArrowRight, ChevronRight } from 'lucide-react'
import { Disclosure, ProductLogo, QuoteCell } from '@/components/compare/parts'
import { AnchorButton } from '@/components/ui/button'
import { Container, Eyebrow, Section, SectionHeading } from '@/components/ui/section'
import { CHECKED_SHORT, COMPARISONS, type Comparison, PRODUCTS, SCENARIOS } from '@/lib/compare'
import { SIGNUP_URL } from '@/lib/site'

function Breadcrumb({ current }: { current?: string }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <a href="/" className="hover:text-foreground">
            Home
          </a>
        </li>
        <ChevronRight className="h-3.5 w-3.5 text-faint" aria-hidden="true" />
        <li>
          {current ? (
            <a href="/compare" className="hover:text-foreground">
              Compare
            </a>
          ) : (
            <span className="font-medium text-foreground">Compare</span>
          )}
        </li>
        {current && (
          <>
            <ChevronRight className="h-3.5 w-3.5 text-faint" aria-hidden="true" />
            <li className="font-medium text-foreground">{current}</li>
          </>
        )}
      </ol>
    </nav>
  )
}

export { Breadcrumb as CompareBreadcrumb }

/** The top of a Subly vs X page: the verdict, the reasons people switch, and what each costs */
export function ComparisonIntro({ c }: { c: Comparison }) {
  const them = PRODUCTS[c.competitor]
  const us = PRODUCTS.subly
  return (
    <>
      <header className="hero-glow border-b border-border">
        <Container className="pb-14 pt-8 sm:pb-20 sm:pt-12">
          <Breadcrumb current={c.h1} />
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <div className="flex items-center justify-center gap-4" aria-hidden="true">
              <ProductLogo product={us} className="h-14 w-14 shadow-sm" />
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-faint">vs</span>
              <ProductLogo product={them} className="h-14 w-14 shadow-sm" />
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl">{c.h1}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-pretty text-muted-foreground">{c.verdict}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <AnchorButton href={SIGNUP_URL} data-cta={`compare-${c.slug}-hero`} size="lg">
                Start free trial <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </AnchorButton>
              <AnchorButton href="#features" variant="outline" size="lg">
                See every difference
              </AnchorButton>
            </div>
            <p className="mt-3 text-sm text-faint">14 days of Business, no credit card. Free plan after that.</p>
          </div>
        </Container>
      </header>

      <Section>
        <SectionHeading eyebrow={`Why people pick Subly over ${them.name}`} title="The differences that matter" />
        <ul className={`mt-10 grid gap-4 ${c.wins.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {c.wins.map((w) => (
            <li key={w.title} className="flex flex-col rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-xl font-bold tracking-tight">{w.title}</h3>
              <dl className="mt-4 space-y-2 rounded-xl border border-border bg-secondary/50 p-4 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="flex items-center gap-2 font-medium">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    Subly
                  </dt>
                  <dd className="text-right font-semibold">{w.us}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-input" aria-hidden="true" />
                    {them.name}
                  </dt>
                  <dd className="text-right text-muted-foreground">{w.them}</dd>
                </div>
              </dl>
              <p className="mt-4 text-pretty text-muted-foreground">{w.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sunken">
        <SectionHeading
          eyebrow="What you would pay"
          title="The price for your team, with renewal alerts on"
          lede={`Each product’s cheapest plan that fits, at list prices, ${CHECKED_SHORT}. Subly yearly billing costs about two months less.`}
        />
        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-left">
            <caption className="sr-only">Monthly price for each team size</caption>
            <thead>
              <tr className="border-b border-border text-sm text-muted-foreground">
                <th scope="col" className="px-4 py-3 font-medium sm:px-6">Team</th>
                <th scope="col" className="border-t-2 border-t-brand px-4 py-3 font-medium text-foreground sm:px-6">Subly</th>
                <th scope="col" className="px-4 py-3 font-medium sm:px-6">{them.name}</th>
              </tr>
            </thead>
            <tbody>
              {SCENARIOS.map((s) => {
                const a = us.quote(s)
                const b = them.quote(s)
                const cheaper = a?.monthly != null && b?.monthly != null && a.monthly < b.monthly
                return (
                  <tr key={s.id} className="border-b border-border last:border-b-0">
                    <th scope="row" className="px-4 py-4 align-top font-medium sm:px-6">
                      {s.label}
                    </th>
                    <td className="px-4 py-4 align-top sm:px-6">
                      <QuoteCell quote={a} best={cheaper} />
                      {cheaper && b?.monthly != null && a?.monthly != null && (
                        <span className="mt-1 inline-block rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-medium text-brand-ink">
                          ${Math.round((b.monthly - a.monthly) * 12)} less a year
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 align-top sm:px-6">
                      <QuoteCell quote={b} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  )
}

/** Below the table: what the other product does well, when to pick it, how to switch, and the rest */
export function ComparisonRest({ c }: { c: Comparison }) {
  const them = PRODUCTS[c.competitor]
  const others = COMPARISONS.filter((o) => o.slug !== c.slug)
  return (
    <>
      {c.footnote && (
        <Container>
          <p className="mx-auto -mt-8 max-w-3xl pb-4 text-sm text-muted-foreground">{c.footnote}</p>
        </Container>
      )}
      <Section tone="sunken">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Fair is fair" title={`What ${them.name} does well`} />
            <ul className="mt-6 space-y-3">
              {c.theyDoWell.map((t) => (
                <li key={t} className="flex gap-3 text-pretty text-muted-foreground sm:text-lg">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <Eyebrow>Pick {them.name} if</Eyebrow>
              <p className="mt-3 font-display text-xl font-bold leading-snug tracking-tight text-balance">{c.pickThem}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <Eyebrow>Pick Subly if</Eyebrow>
              <p className="mt-3 font-display text-xl font-bold leading-snug tracking-tight text-balance">
                You want every recurring payment found for you, in and out, with an owner who hears before it renews.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {c.switching && (
        <Section>
          <SectionHeading eyebrow="Switching" title={`Moving from ${them.name === 'Spreadsheet' ? 'a spreadsheet' : them.name} takes one sitting`} />
          <ol className={`mt-10 grid gap-4 ${c.switching.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
            {c.switching.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-border bg-card p-6">
                <span className="font-mono text-xs text-brand-ink">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-display text-lg font-bold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-muted-foreground">
            Not ready to sign up?{' '}
            <a href="/tools/stack-cost-calculator" className="font-medium text-foreground underline underline-offset-4">
              Add up what your tools cost
            </a>{' '}
            first, free, then bring the list with you.
          </p>
        </Section>
      )}

      <Section className={c.switching ? 'pt-0 sm:pt-0 lg:pt-0' : ''}>
        <Disclosure name={them.name} />
        <h2 className="mt-10 font-display text-2xl font-bold tracking-tight">More comparisons</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <a href={`/compare/${o.slug}`} className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1.5 pl-1.5 pr-3.5 text-sm font-medium hover:bg-accent">
                <ProductLogo product={PRODUCTS[o.competitor]} className="h-6 w-6 rounded-full" />
                {o.h1}
              </a>
            </li>
          ))}
          <li>
            <a href="/compare" className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium hover:bg-accent">
              All side by side <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </Section>
    </>
  )
}
