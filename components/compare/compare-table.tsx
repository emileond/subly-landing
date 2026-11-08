import { useState } from 'react'
import { MarkIcon, MarkLegend, ProductLogo } from '@/components/compare/parts'
import { GROUPS, PRODUCTS, type ProductId, ROWS } from '@/lib/compare'

type RowDef = (typeof ROWS)[number]

/** A row is a difference when the products don't all give the same answer */
const differs = (row: RowDef, ids: ProductId[]) => new Set(ids.map((id) => PRODUCTS[id].cells[row.id].mark)).size > 1

function DiffToggle({ only, setOnly, count }: { only: boolean; setOnly: (v: boolean) => void; count: number }) {
  const option = (active: boolean) =>
    `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${active ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`
  return (
    <div role="group" aria-label="Rows to show" className="inline-flex rounded-lg border border-border bg-muted p-0.5">
      <button type="button" aria-pressed={!only} className={option(!only)} onClick={() => setOnly(false)}>
        Everything
      </button>
      <button type="button" aria-pressed={only} className={option(only)} onClick={() => setOnly(true)}>
        Only the {count} differences
      </button>
    </div>
  )
}

/**
 * Subly and one other product, feature by feature. A grid rather than a <table> so that on a
 * phone the feature name sits above the two answers instead of squeezing three columns.
 */
export function HeadToHead({ competitor }: { competitor: ProductId }) {
  const ids: ProductId[] = ['subly', competitor]
  const [only, setOnly] = useState(false)
  const count = ROWS.filter((r) => differs(r, ids)).length
  const cols = 'grid grid-cols-2 gap-x-4 md:grid-cols-[1.15fr_1fr_1fr] md:gap-x-6'

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <DiffToggle only={only} setOnly={setOnly} count={count} />
        <MarkLegend />
      </div>
      <div role="table" aria-label={`Subly and ${PRODUCTS[competitor].name}, feature by feature`} className="mt-6 overflow-clip rounded-2xl border border-border bg-card">
        <div role="row" className={`${cols} sticky top-16 z-10 border-b border-border bg-card/95 px-4 py-4 backdrop-blur sm:px-6`}>
          <span role="columnheader" className="hidden text-sm font-medium text-muted-foreground md:block">
            Feature
          </span>
          {ids.map((id) => (
            <span key={id} role="columnheader" className="flex items-center gap-2.5">
              <ProductLogo product={PRODUCTS[id]} className="h-7 w-7" />
              <span className="font-display text-lg font-bold tracking-tight">{PRODUCTS[id].name}</span>
            </span>
          ))}
        </div>
        {GROUPS.map((group) => {
          const rows = ROWS.filter((r) => r.group === group.id && (!only || differs(r, ids)))
          if (!rows.length) return null
          return (
            <div key={group.id} role="rowgroup">
              <div role="row" className="border-b border-border bg-secondary/60 px-4 py-2 sm:px-6">
                <span role="rowheader" className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-faint">
                  {group.title}
                </span>
              </div>
              {rows.map((row) => (
                <div key={row.id} role="row" className={`${cols} gap-y-2 border-b border-border px-4 py-4 last:border-b-0 sm:px-6`}>
                  <span role="rowheader" className="col-span-2 md:col-span-1">
                    <span className="font-medium">{row.label}</span>
                    {'hint' in row && row.hint && <span className="mt-0.5 block text-sm text-faint">{row.hint}</span>}
                  </span>
                  {ids.map((id) => {
                    const cell = PRODUCTS[id].cells[row.id]
                    return (
                      <span key={id} role="cell" className="flex items-start gap-2.5">
                        <span className="mt-0.5">
                          <MarkIcon mark={cell.mark} ours={id === 'subly'} />
                        </span>
                        <span className={`text-sm ${id === 'subly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                          <span className="sr-only">{PRODUCTS[id].name}: </span>
                          {cell.text}
                        </span>
                      </span>
                    )
                  })}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/** Every product at once, for the hub. Scrolls sideways on small screens with the feature column pinned. */
export function Matrix({ ids }: { ids: ProductId[] }) {
  const [only, setOnly] = useState(false)
  const count = ROWS.filter((r) => differs(r, ids)).length
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {count < ROWS.length ? <DiffToggle only={only} setOnly={setOnly} count={count} /> : <p className="text-sm text-muted-foreground">Hover a mark for the detail, or open a product for the full head-to-head.</p>}
        <MarkLegend />
      </div>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[860px] border-collapse text-left">
          <caption className="sr-only">Subscription trackers compared feature by feature</caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="sticky left-0 z-10 w-56 bg-card px-4 py-4 text-sm font-medium text-muted-foreground">
                Feature
              </th>
              {ids.map((id) => (
                <th key={id} scope="col" className={`w-[9%] px-2 py-4 align-bottom ${id === 'subly' ? 'border-t-2 border-t-brand bg-brand-soft/40' : ''}`}>
                  <span className="flex flex-col items-center gap-2 text-center">
                    <ProductLogo product={PRODUCTS[id]} className="h-8 w-8" />
                    {id === 'subly' || id === 'spreadsheet' ? (
                      <span className="font-display text-sm font-bold tracking-tight">{PRODUCTS[id].name}</span>
                    ) : (
                      <a href={`/compare/${id}`} className="font-display text-sm font-bold tracking-tight underline-offset-4 hover:underline">
                        {PRODUCTS[id].name}
                      </a>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          {GROUPS.map((group) => {
            const rows = ROWS.filter((r) => r.group === group.id && (!only || differs(r, ids)))
            if (!rows.length) return null
            return (
              <tbody key={group.id}>
                <tr className="border-b border-border bg-secondary/60">
                  <th scope="rowgroup" colSpan={ids.length + 1} className="sticky left-0 px-4 py-2 text-left font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-faint">
                    {group.title}
                  </th>
                </tr>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-border last:border-b-0">
                    <th scope="row" className="sticky left-0 z-10 bg-card px-4 py-3 text-sm font-medium">
                      {row.label}
                    </th>
                    {ids.map((id) => {
                      const cell = PRODUCTS[id].cells[row.id]
                      return (
                        <td key={id} title={`${PRODUCTS[id].name}: ${cell.text}`} className={`px-3 py-3 text-center ${id === 'subly' ? 'bg-brand-soft/40' : ''}`}>
                          <span className="inline-flex">
                            <MarkIcon mark={cell.mark} ours={id === 'subly'} />
                          </span>
                          <span className="sr-only">{cell.text}</span>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            )
          })}
        </table>
      </div>
    </div>
  )
}
