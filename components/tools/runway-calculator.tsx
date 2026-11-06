import { ArrowRight, Loader2, Plus, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { sendToSubly } from '@/lib/handoff'
import { send } from '@/lib/tracking'

type Row = { id: number; name: string; amount: string; cadence: 'month' | 'year' | 'week'; on: boolean }

const WEEKS = 13
const WEEKS_PER_MONTH = 52 / 12
const perMonth = (row: Row) => {
  const amount = Number(row.amount.replace(/[^\d.]/g, '')) || 0
  return row.cadence === 'year' ? amount / 12 : row.cadence === 'week' ? amount * WEEKS_PER_MONTH : amount
}
const money = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)

let lastId = 0
const row = (name = '', amount = '', cadence: Row['cadence'] = 'month'): Row => ({ id: ++lastId, name, amount, cadence, on: true })

/**
 * Cash runway: what is in the bank, what comes in and goes out on repeat, and how many weeks
 * that lasts, drawn week by week for the next 13. Switching an item off is a what-if.
 */
export function RunwayCalculator() {
  const [balance, setBalance] = useState('')
  const [incoming, setIncoming] = useState<Row[]>(() => [row('Client retainer'), row()])
  const [outgoing, setOutgoing] = useState<Row[]>(() => [row('Rent'), row('Payroll'), row('Software')])
  const [sending, setSending] = useState(false)
  const reported = useRef(false)

  const cash = Number(balance.replace(/[^\d.]/g, '')) || 0
  const monthIn = incoming.filter((r) => r.on).reduce((sum, r) => sum + perMonth(r), 0)
  const monthOut = outgoing.filter((r) => r.on).reduce((sum, r) => sum + perMonth(r), 0)
  const net = monthIn - monthOut
  const ready = cash > 0 && monthIn + monthOut > 0

  const weeks = useMemo(() => Array.from({ length: WEEKS + 1 }, (_, w) => cash + (net / WEEKS_PER_MONTH) * w), [cash, net])
  const runwayWeeks = net < 0 ? cash / (-net / WEEKS_PER_MONTH) : Infinity
  const lowest = Math.min(...weeks)

  useEffect(() => {
    if (!ready || reported.current) return
    reported.current = true
    send('tool_result', { tool: 'runway', burning: String(net < 0) })
  }, [ready, net])

  const list = (title: string, rows: Row[], set: (fn: (rows: Row[]) => Row[]) => void, placeholder: string) => (
    <fieldset>
      <legend className="font-display text-lg font-bold tracking-tight">{title}</legend>
      <ul className="mt-3 space-y-2">
        {rows.map((r) => (
          <li key={r.id} className="grid grid-cols-[auto_1fr_5.5rem_7rem_auto] items-center gap-2">
            <input
              type="checkbox"
              checked={r.on}
              aria-label={`Include ${r.name || 'this item'}`}
              title="Switch off to see the difference"
              className="h-4 w-4 accent-[var(--color-brand)]"
              onChange={(e) => set((all) => all.map((x) => (x.id === r.id ? { ...x, on: e.target.checked } : x)))}
            />
            <input className={field} placeholder={placeholder} value={r.name} aria-label="Name" onChange={(e) => set((all) => all.map((x) => (x.id === r.id ? { ...x, name: e.target.value } : x)))} />
            <input className={field} inputMode="decimal" placeholder="$" value={r.amount} aria-label="Amount in USD" onChange={(e) => set((all) => all.map((x) => (x.id === r.id ? { ...x, amount: e.target.value } : x)))} />
            <select className={field} value={r.cadence} aria-label="How often" onChange={(e) => set((all) => all.map((x) => (x.id === r.id ? { ...x, cadence: e.target.value as Row['cadence'] } : x)))}>
              <option value="month">a month</option>
              <option value="year">a year</option>
              <option value="week">a week</option>
            </select>
            <button type="button" className="rounded p-1 text-faint hover:text-foreground" aria-label="Remove" onClick={() => set((all) => all.filter((x) => x.id !== r.id))}>
              <Trash2 className="h-4 w-4" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
      <Button variant="ghost" size="sm" className="mt-2" onClick={() => set((all) => [...all, row()])}>
        <Plus className="h-4 w-4" aria-hidden /> Add a line
      </Button>
    </fieldset>
  )

  const sendForecast = async () => {
    setSending(true)
    const items = [
      ...incoming.filter((r) => r.on && r.name.trim() && perMonth(r) > 0).map((r) => ({ name: r.name.trim(), amount: Number(r.amount.replace(/[^\d.]/g, '')), cadence: r.cadence, direction: 'in' as const })),
      ...outgoing.filter((r) => r.on && r.name.trim() && perMonth(r) > 0).map((r) => ({ name: r.name.trim(), amount: Number(r.amount.replace(/[^\d.]/g, '')), cadence: r.cadence, direction: 'out' as const })),
    ]
    await sendToSubly('runway', items, { balance: Math.round(cash) })
    setSending(false)
  }

  const max = Math.max(...weeks.map((w) => Math.abs(w)), 1)

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
      <label className="block max-w-xs">
        <span className="font-display text-lg font-bold tracking-tight">Cash in the bank today</span>
        <input className={`${field} mt-3 h-12 text-lg`} inputMode="decimal" placeholder="$25,000" value={balance} onChange={(e) => setBalance(e.target.value)} />
      </label>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {list('Money coming in', incoming, setIncoming, 'Retainer, subscription…')}
        {list('Money going out', outgoing, setOutgoing, 'Rent, payroll, tools…')}
      </div>

      {ready && (
        <div className="mt-8 border-t border-border pt-8" aria-live="polite">
          <p className="font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            {net >= 0
              ? `You add ${money(net)} a month. Your cash grows.`
              : runwayWeeks >= 13
                ? `Your cash lasts about ${Math.floor(runwayWeeks / WEEKS_PER_MONTH)} months (${Math.floor(runwayWeeks)} weeks) at this rate`
                : `Your cash lasts about ${Math.floor(runwayWeeks)} weeks at this rate`}
          </p>
          <p className="mt-2 text-muted-foreground">
            {money(monthIn)} in and {money(monthOut)} out a month{net < 0 ? `, so you spend ${money(-net)} more than you take in` : ''}.{' '}
            {lowest < 0 ? `You would run out in week ${weeks.findIndex((w) => w < 0)}.` : `In 13 weeks you would have ${money(weeks[WEEKS])}.`} Switch a line off to see what cancelling it changes.
          </p>

          <div className="mt-6" role="img" aria-label={`Balance week by week for 13 weeks, from ${money(weeks[0])} to ${money(weeks[WEEKS])}`}>
            <div className="flex h-40 items-end gap-1">
              {weeks.map((w, i) => (
                <div key={i} className="flex h-full flex-1 flex-col justify-end">
                  <div className={`rounded-t ${w < 0 ? 'bg-amber-500/70' : 'bg-brand/70'}`} style={{ height: `${Math.max(2, (Math.abs(w) / max) * 100)}%` }} title={`Week ${i}: ${money(w)}`} />
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between font-mono text-[11px] uppercase tracking-[0.05em] text-faint">
              <span>Today</span>
              <span>Week 13</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-xl border border-border bg-secondary/60 p-5 sm:flex-row sm:items-center">
            <div className="flex-1">
              <p className="font-medium">Keep this forecast current without retyping it.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Subly’s 13-week forecast is built from everything you track and lets you test a cancel or a price change before you commit. It is part of Business, and every account starts with a 14-day Business trial, no card.
              </p>
            </div>
            <Button size="lg" onClick={sendForecast} disabled={sending} className="shrink-0">
              {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
              Send this to Subly <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

const field = 'h-10 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'
