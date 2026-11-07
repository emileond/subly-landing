import { ArrowRight } from 'lucide-react'
import { CompareBreadcrumb } from '@/components/compare/comparison-page'
import { Disclosure, ProductLogo, QuoteCell } from '@/components/compare/parts'
import { AnchorButton } from '@/components/ui/button'
import { Container, Section, SectionHeading } from '@/components/ui/section'
import { CHECKED_SHORT, COMPARISONS, HUB, PRODUCTS, PRODUCT_ORDER, SCENARIOS } from '@/lib/compare'
import { SIGNUP_URL } from '@/lib/site'

export function HubIntro() {
  return (
    <>
      <header className="hero-glow border-b border-border">
        <Container className="pb-14 pt-8 sm:pb-20 sm:pt-12">
          <CompareBreadcrumb />
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl">Subscription trackers for small business, compared</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-pretty text-muted-foreground">
              Eight ways to keep track of what your business pays on repeat, side by side: how the data gets in, where alerts land, who owns each item, money coming in, and what each costs for your team.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <AnchorButton href="#features" size="lg">
                See them side by side
              </AnchorButton>
              <AnchorButton href="#choose" variant="outline" size="lg">
                Help me choose
              </AnchorButton>
            </div>
          </div>
        </Container>
      </header>

      <Section>
        <SectionHeading eyebrow="Head to head" title="Subly against each one" lede="The short version and the full table, one product at a time." />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPARISONS.map((c) => {
            const them = PRODUCTS[c.competitor]
            return (
              <li key={c.slug}>
                <a href={`/compare/${c.slug}`} className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-accent/40">
                  <span className="flex items-center gap-3">
                    <ProductLogo product={them} className="h-10 w-10" />
                    <span>
                      <span className="block font-display text-lg font-bold tracking-tight">{c.h1}</span>
                      <span className="block text-sm text-muted-foreground">{them.bestFor}</span>
                    </span>
                  </span>
                  <span className="mt-4 flex-1 space-y-1.5 text-sm">
                    {c.wins.slice(0, 2).map((w) => (
                      <span key={w.title} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                        <span>
                          <span className="font-medium">{w.us}</span>
                          <span className="text-muted-foreground"> vs {w.them.charAt(0).toLowerCase() + w.them.slice(1)}</span>
                        </span>
                      </span>
                    ))}
                  </span>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium">
                    Compare <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </Section>
    </>
  )
}

export function HubRest() {
  return (
    <>
      <Section tone="sunken">
        <SectionHeading
          eyebrow="What you would pay"
          title="The monthly price for your team"
          lede={`Each product’s cheapest plan that fits, with renewal alerts on, at list prices, ${CHECKED_SHORT}.`}
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[640px] text-left">
            <caption className="sr-only">Monthly price by team size</caption>
            <thead>
              <tr className="border-b border-border text-sm text-muted-foreground">
                <th scope="col" className="px-4 py-3 font-medium sm:px-6">Product</th>
                {SCENARIOS.map((s) => (
                  <th key={s.id} scope="col" className="px-4 py-3 font-medium sm:px-6">
                    {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCT_ORDER.map((id) => (
                <tr key={id} className={`border-b border-border last:border-b-0 ${id === 'subly' ? 'bg-brand-soft/40' : ''}`}>
                  <th scope="row" className="px-4 py-4 sm:px-6">
                    <span className="flex items-center gap-3">
                      <ProductLogo product={PRODUCTS[id]} className="h-8 w-8" />
                      <span className="font-medium">{PRODUCTS[id].name}</span>
                    </span>
                  </th>
                  {SCENARIOS.map((s) => (
                    <td key={s.id} className="px-4 py-4 align-top sm:px-6">
                      <QuoteCell quote={PRODUCTS[id].quote(s)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="choose">
        <SectionHeading eyebrow="Help me choose" title="Find the line that sounds like you" />
        <ul className="mt-10 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {HUB.choose.map((row) => {
            const product = PRODUCTS[row.pick]
            const href = row.pick === 'subly' ? SIGNUP_URL : `/compare/${row.pick}`
            return (
              <li key={row.pick}>
                <a href={href} data-cta={row.pick === 'subly' ? 'compare-hub-choose' : undefined} className={`group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-accent/40 sm:px-6 ${row.pick === 'subly' ? 'bg-brand-soft/40' : ''}`}>
                  <span className="min-w-0 flex-1 text-pretty sm:text-lg">{row.when}</span>
                  <span className="flex shrink-0 items-center gap-2.5">
                    <ProductLogo product={product} className="h-7 w-7" />
                    <span className="hidden font-medium sm:inline">{product.name}</span>
                    <ArrowRight className="h-4 w-4 text-faint transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          An enterprise with a procurement team? Zylo and Vertice sell through a sales team; see{' '}
          <a href="/compare/cledara" className="underline underline-offset-4 hover:text-foreground">
            Subly vs Cledara
          </a>{' '}
          for where they fit.
        </p>
        <div className="mt-10">
          <Disclosure />
        </div>
      </Section>
    </>
  )
}
