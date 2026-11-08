import { Check, Minus, Sheet, X } from 'lucide-react'
import { LogoMark } from '@/components/site/logo'
import { type Mark, type Product, type Quote, CHECKED } from '@/lib/compare'
import { logoUrl } from '@/lib/handoff'

/** A product's logo: Subly's own mark, a vendor's logo, or a sheet icon for the spreadsheet */
export function ProductLogo({ product, className = 'h-10 w-10' }: { product: Product; className?: string }) {
  const box = `grid shrink-0 place-items-center overflow-hidden rounded-xl border border-border bg-white ${className}`
  if (product.id === 'subly')
    return (
      <span className={box}>
        <LogoMark className="h-[55%] w-auto" />
      </span>
    )
  if (!product.website)
    return (
      <span className={`${box} bg-muted text-muted-foreground`}>
        <Sheet className="h-1/2 w-1/2" aria-hidden="true" />
      </span>
    )
  return <img src={logoUrl(product.website) ?? ''} alt="" width={80} height={80} loading="lazy" decoding="async" className={`${box} object-cover`} />
}

const LABEL: Record<Mark, string> = { yes: 'Yes', partial: 'Partly', no: 'No', unknown: 'Not stated' }

/** The mark in front of a cell. Subly's yes is violet (an indicator, not an action); everyone else's is neutral. */
export function MarkIcon({ mark, ours = false }: { mark: Mark; ours?: boolean }) {
  const base = 'grid h-5 w-5 shrink-0 place-items-center rounded-full'
  const icon = (() => {
    switch (mark) {
      case 'yes':
        return (
          <span className={`${base} ${ours ? 'bg-brand text-brand-foreground' : 'bg-foreground/10 text-foreground'}`}>
            <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
          </span>
        )
      case 'partial':
        return (
          <span className={`${base} border border-dashed border-faint text-muted-foreground`}>
            <Minus className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
          </span>
        )
      case 'no':
        return (
          <span className={`${base} text-faint`}>
            <X className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
          </span>
        )
      default:
        return <span className={`${base} font-mono text-xs text-faint`} aria-hidden="true">?</span>
    }
  })()
  return (
    <>
      {icon}
      <span className="sr-only">{LABEL[mark]}:</span>
    </>
  )
}

export function MarkLegend() {
  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
      {(['yes', 'partial', 'no', 'unknown'] as Mark[]).map((m) => (
        <li key={m} className="flex items-center gap-2">
          <MarkIcon mark={m} />
          <span aria-hidden="true">{m === 'partial' ? 'Partly, or with a workaround' : m === 'unknown' ? 'Not stated on its site' : LABEL[m]}</span>
        </li>
      ))}
    </ul>
  )
}

export function QuoteCell({ quote, best }: { quote: Quote | null; best?: boolean }) {
  if (!quote) return <span className="text-sm text-faint">Not offered</span>
  return (
    <span className="block">
      <span className={`font-display text-xl font-bold tabular-nums tracking-tight ${best ? 'text-foreground' : ''}`}>
        {quote.price}
        <span className="text-sm font-normal text-muted-foreground">/month</span>
      </span>
      <span className="block text-sm text-muted-foreground">
        {quote.plan}
        {quote.note ? ` · ${quote.note}` : ''}
      </span>
    </span>
  )
}

/** Said under every comparison: who made it and how it was checked */
export function Disclosure({ name }: { name?: string }) {
  return (
    <p className="text-sm text-faint">
      Made by Subly. {name ? `What we say about ${name} comes from its own website` : 'What we say about each product comes from its own website'}, checked {CHECKED}.
      {' '}Spotted something out of date?{' '}
      <a href="mailto:hello@subly.app?subject=Comparison%20page" className="underline underline-offset-4 hover:text-foreground">
        Tell us
      </a>{' '}
      and we will fix it.
    </p>
  )
}
