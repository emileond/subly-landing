'use client'

import { Check, Minus } from 'lucide-react'
import { Fragment, useState } from 'react'
import { Container, SectionHeading } from '@/components/ui/section'
import { type Cell, PLAN_ORDER, featureGroups } from '@/lib/plan-features'
import { PLANS } from '@/lib/plans'

function Value({ v }: { v: Cell }) {
  if (v === true) {
    return (
      <>
        <Check className="mx-auto h-4 w-4 text-brand-ink" aria-hidden="true" />
        <span className="sr-only">Included</span>
      </>
    )
  }
  if (v === false) {
    return (
      <>
        <Minus className="mx-auto h-4 w-4 text-faint" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </>
    )
  }
  return <span className="font-mono text-[13px] tabular-nums">{v}</span>
}

export function FeatureTable() {
  const [mobile, setMobile] = useState(2)

  return (
    <Container>
      <SectionHeading align="center" eyebrow="Compare" title="Everything in each plan" />

      <div role="group" aria-label="Plan to show" className="mt-8 flex justify-center md:hidden">
        <div className="inline-flex rounded-lg border border-border bg-card p-1">
          {PLANS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={mobile === i}
              onClick={() => setMobile(i)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                mobile === i ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">What each plan includes</caption>
          <thead>
            <tr className="border-b border-border bg-muted/60">
              <th scope="col" className="px-4 py-3 font-medium text-muted-foreground">
                <span className="sr-only">Feature</span>
              </th>
              {PLANS.map((p, i) => (
                <th
                  key={p.id}
                  scope="col"
                  className={`px-3 py-3 text-center font-display text-base font-bold tracking-tight md:table-cell md:w-[16%] ${
                    mobile === i ? 'table-cell' : 'hidden'
                  }`}
                >
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          {featureGroups.map((g) => (
            <Fragment key={g.title}>
              <tbody>
                <tr>
                  <th
                    scope="colgroup"
                    colSpan={5}
                    className="border-b border-border bg-secondary/60 px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-brand-ink"
                  >
                    {g.title}
                  </th>
                </tr>
                {g.rows.map((r) => (
                  <tr key={r.label} className="border-b border-border last:border-b-0">
                    <th scope="row" className="px-4 py-3 align-top font-normal">
                      {r.label}
                      {r.hint && <span className="mt-0.5 block text-xs text-muted-foreground">{r.hint}</span>}
                    </th>
                    {PLAN_ORDER.map((id, i) => (
                      <td key={id} className={`px-3 py-3 text-center align-top md:table-cell ${mobile === i ? 'table-cell' : 'hidden'}`}>
                        <Value v={r.values[i]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Fragment>
          ))}
        </table>
      </div>
    </Container>
  )
}
