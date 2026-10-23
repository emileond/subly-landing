'use client'

import { ArrowDownUp, ChevronDown, LineChart, Clock, Search, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { currencies } from '@/lib/currenciesList'
import { convert, hasRate } from '@/lib/convert'

type Currency = { cc: string; name?: string }

const selectable = currencies.filter((c: Currency) => hasRate(c.cc))
const fmt = (n: number | null) => (n === null ? '' : String(n))

function Flag({ cc, size = 24 }: { cc: string; size?: number }) {
  return (
    <Image
      src={`/flags/${cc.toLowerCase()}.svg`}
      alt=""
      width={size}
      height={size}
      unoptimized
      className="shrink-0 rounded-full border border-border object-cover"
      style={{ width: size, height: size }}
    />
  )
}

function CurrencyPicker({
  open,
  onClose,
  onPick,
}: {
  open: boolean
  onClose: () => void
  onPick: (cc: string) => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const [query, setQuery] = useState('')
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      setQuery('')
      dialog.showModal()
    }
    if (!open && dialog.open) dialog.close()
  }, [open])

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? selectable.filter((c: Currency) => `${c.name} ${c.cc}`.toLowerCase().includes(q)) : selectable
  }, [query])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto h-[min(80vh,640px)] w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-border bg-popover p-0 text-popover-foreground shadow-2xl backdrop:bg-black/50"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 id={titleId} className="font-display text-lg font-bold tracking-tight">
            Change currency
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="border-b border-border px-5 py-3">
          <label htmlFor="currency-search" className="sr-only">
            Search currency
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" aria-hidden="true" />
            <input
              id="currency-search"
              autoFocus
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search currency"
              className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-base"
            />
          </div>
        </div>
        <ul className="flex-1 overflow-y-auto p-2">
          {list.length ? (
            list.map((c: Currency) => (
              <li key={c.cc}>
                <button
                  type="button"
                  onClick={() => onPick(c.cc)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-accent"
                >
                  <Flag cc={c.cc} size={28} />
                  <span>
                    {c.name} <span className="text-muted-foreground">({c.cc})</span>
                  </span>
                </button>
              </li>
            ))
          ) : (
            <li className="py-10 text-center font-medium">No results found</li>
          )}
        </ul>
      </div>
    </dialog>
  )
}

export function CurrencyConverter({ updatedAt }: { updatedAt: string }) {
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('EUR')
  const [source, setSource] = useState('100')
  const [target, setTarget] = useState(() => fmt(convert(100, 'USD', 'EUR')))
  const [picking, setPicking] = useState<null | 'from' | 'to'>(null)

  const num = (v: string) => parseFloat(v)
  const sanitize = (v: string) => v.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')

  const onSource = (raw: string) => {
    const v = sanitize(raw)
    setSource(v)
    setTarget(v === '' ? '' : fmt(convert(num(v), from, to)))
  }
  const onTarget = (raw: string) => {
    const v = sanitize(raw)
    setTarget(v)
    setSource(v === '' ? '' : fmt(convert(num(v), to, from)))
  }
  const pick = (cc: string) => {
    if (picking === 'from') {
      setFrom(cc)
      setTarget(source === '' ? '' : fmt(convert(num(source), cc, to)))
    } else {
      setTo(cc)
      setSource(target === '' ? '' : fmt(convert(num(target), cc, from)))
    }
    setPicking(null)
  }
  const swap = () => {
    setFrom(to)
    setTo(from)
    setSource(target)
    setTarget(source)
  }

  const rate = convert(1, from, to)
  const updated = new Date(updatedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })

  const field = 'h-12 min-w-0 flex-1 rounded-lg border border-input bg-background px-3 font-mono text-lg tabular-nums'
  const pickBtn =
    'inline-flex h-12 items-center gap-2 rounded-lg border border-input bg-card px-3 font-medium hover:bg-accent'

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-xl sm:p-8">
      <div className="grid items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
        <div className="flex gap-2">
          <label htmlFor="amount-from" className="sr-only">
            Amount in {from}
          </label>
          <input id="amount-from" inputMode="decimal" value={source} onChange={(e) => onSource(e.target.value)} className={field} />
          <button type="button" onClick={() => setPicking('from')} className={pickBtn} aria-label={`Currency: ${from}. Change`}>
            <Flag cc={from} />
            {from}
            <ChevronDown className="h-4 w-4 text-faint" aria-hidden="true" />
          </button>
        </div>
        <button
          type="button"
          onClick={swap}
          className="mx-auto grid h-10 w-10 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
          aria-label="Swap currencies"
        >
          <ArrowDownUp className="h-5 w-5 md:rotate-90" aria-hidden="true" />
        </button>
        <div className="flex gap-2">
          <label htmlFor="amount-to" className="sr-only">
            Amount in {to}
          </label>
          <input id="amount-to" inputMode="decimal" value={target} onChange={(e) => onTarget(e.target.value)} className={field} />
          <button type="button" onClick={() => setPicking('to')} className={pickBtn} aria-label={`Currency: ${to}. Change`}>
            <Flag cc={to} />
            {to}
            <ChevronDown className="h-4 w-4 text-faint" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <LineChart className="h-5 w-5 text-brand" aria-hidden="true" />
          1 {from} <span className="text-faint">=</span> <span className="font-mono tabular-nums">{rate ?? '–'}</span> {to}
        </p>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" aria-hidden="true" />
          Rates last updated {updated}
        </p>
      </div>

      <CurrencyPicker open={picking !== null} onClose={() => setPicking(null)} onPick={pick} />
    </div>
  )
}
