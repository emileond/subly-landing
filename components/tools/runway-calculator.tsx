import { Check, Link2, Plus, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { type Finding, type PreviewSignal, Findings, SendToSubly, SublyPreview } from '@/components/tools/report'
import { Button } from '@/components/ui/button'
import { sendToSubly } from '@/lib/handoff'
import { send } from '@/lib/tracking'

type Cadence = 'month' | 'year' | 'week'
type Row = { id: number; name: string; amount: string; cadence: Cadence; on: boolean; /** Yearly only: when it is next charged (YYYY-MM-DD) */ date?: string }

const WEEKS = 13
const WEEKS_PER_MONTH = 52 / 12
const DAY = 24 * 60 * 60 * 1000
const num = (s: string) => Number(s.replace(/[^\d.]/g, '')) || 0
const perMonth = (row: Row) => (row.cadence === 'year' ? num(row.amount) / 12 : row.cadence === 'week' ? num(row.amount) * WEEKS_PER_MONTH : num(row.amount))
const money = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)
const todayIso = () => new Date().toISOString().slice(0, 10)
/** Which of the next 13 weeks a date falls in (1-based), or null if outside them */
const weekOf = (iso?: string) => {
  if (!iso) return null
  const days = Math.floor((Date.parse(`${iso}T00:00:00Z`) - Date.parse(`${todayIso()}T00:00:00Z`)) / DAY)
  if (days < 0 || days >= WEEKS * 7) return null
  return Math.floor(days / 7) + 1
}

let lastId = 0
const row = (name = '', amount = '', cadence: Cadence = 'month'): Row => ({ id: ++lastId, name, amount, cadence, on: true })

/**
 * Week by week for 13 weeks: steady money in and out is spread across the weeks, and a yearly
 * charge with a date lands in its own week, which is the dip a monthly average hides.
 */
function project(cash: number, incoming: Row[], outgoing: Row[], all = false) {
  const use = (r: Row) => all || r.on
  const lump = (r: Row) => r.cadence === 'year' && weekOf(r.date) != null
  const steadyIn = incoming.filter((r) => use(r) && !lump(r)).reduce((sum, r) => sum + perMonth(r), 0) / WEEKS_PER_MONTH
  const steadyOut = outgoing.filter((r) => use(r) && !lump(r)).reduce((sum, r) => sum + perMonth(r), 0) / WEEKS_PER_MONTH
  const weeks = [cash]
  for (let w = 1; w <= WEEKS; w++) {
    const lumpsIn = incoming.filter((r) => use(r) && lump(r) && weekOf(r.date) === w).reduce((sum, r) => sum + num(r.amount), 0)
    const lumpsOut = outgoing.filter((r) => use(r) && lump(r) && weekOf(r.date) === w).reduce((sum, r) => sum + num(r.amount), 0)
    weeks.push(weeks[w - 1] + steadyIn - steadyOut + lumpsIn - lumpsOut)
  }
  return weeks
}

/** Runway in weeks on the monthly averages (yearly charges spread), Infinity when cash grows */
function runway(cash: number, incoming: Row[], outgoing: Row[]) {
  const net = incoming.filter((r) => r.on).reduce((s, r) => s + perMonth(r), 0) - outgoing.filter((r) => r.on).reduce((s, r) => s + perMonth(r), 0)
  return net < 0 ? cash / (-net / WEEKS_PER_MONTH) : Infinity
}

// The whole calculator in the address (#r=…), so a link opens the same numbers
type Saved = { b: string; i: [string, string, Cadence, string?][]; o: [string, string, Cadence, string?][] }
const encode = (s: Saved) => btoa(unescape(encodeURIComponent(JSON.stringify(s)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
function decode(hash: string): Saved | null {
  try {
    const raw = JSON.parse(decodeURIComponent(escape(atob(hash.replace(/-/g, '+').replace(/_/g, '/')))))
    return raw && Array.isArray(raw.i) && Array.isArray(raw.o) ? raw : null
  } catch {
    return null
  }
}
const toRows = (list: Saved['i']) =>
  list.slice(0, 40).map(([name, amount, cadence, date]) => ({ ...row(String(name).slice(0, 80), String(amount).slice(0, 12), ['month', 'year', 'week'].includes(cadence) ? cadence : 'month'), date }))

export function RunwayCalculator() {
  const [balance, setBalance] = useState('')
  const [incoming, setIncoming] = useState<Row[]>(() => [row('Client retainer'), row()])
  const [outgoing, setOutgoing] = useState<Row[]>(() => [row('Rent'), row('Payroll'), row('Software')])
  const [sending, setSending] = useState(false)
  const [copied, setCopied] = useState(false)
  const reported = useRef(false)
  const loaded = useRef(false)

  // A shared link, or the stack calculator's total, opens filled in
  useEffect(() => {
    if (loaded.current) return
    loaded.current = true
    const hash = window.location.hash
    const shared = hash.match(/^#r=(.+)$/)
    const software = hash.match(/^#software=(\d+)/)
    if (shared) {
      const saved = decode(shared[1])
      if (!saved) return
      /* eslint-disable react-hooks/set-state-in-effect -- reading the link once on load */
      setBalance(saved.b)
      setIncoming(toRows(saved.i))
      setOutgoing(toRows(saved.o))
      /* eslint-enable react-hooks/set-state-in-effect */
      send('tool_started', { tool: 'runway', how: 'link' })
    } else if (software) {
      setOutgoing((rows) => rows.map((r) => (r.name === 'Software' ? { ...r, amount: software[1] } : r)))
      send('tool_started', { tool: 'runway', how: 'stack' })
    }
  }, [])

  const cash = num(balance)
  const monthIn = incoming.filter((r) => r.on).reduce((sum, r) => sum + perMonth(r), 0)
  const monthOut = outgoing.filter((r) => r.on).reduce((sum, r) => sum + perMonth(r), 0)
  const net = monthIn - monthOut
  const ready = cash > 0 && monthIn + monthOut > 0
  const anyOff = [...incoming, ...outgoing].some((r) => !r.on && perMonth(r) > 0)

  const weeks = useMemo(() => project(cash, incoming, outgoing), [cash, incoming, outgoing])
  const baseline = useMemo(() => (anyOff ? project(cash, incoming, outgoing, true) : null), [anyOff, cash, incoming, outgoing])
  const runwayWeeks = runway(cash, incoming, outgoing)
  const lowest = Math.min(...weeks)
  const lowestWeek = weeks.indexOf(lowest)
  const shortWeek = weeks.findIndex((w) => w < 0)

  useEffect(() => {
    if (!ready || reported.current) return
    reported.current = true
    send('tool_result', { tool: 'runway', burning: String(net < 0) })
  }, [ready, net])

  // Keep the address in step, so copying it shares these numbers
  useEffect(() => {
    if (!loaded.current || !ready) return
    const pack = (rows: Row[]) => rows.filter((r) => r.name.trim() || r.amount).map((r) => [r.name, r.amount, r.cadence, ...(r.date ? [r.date] : [])] as Saved['i'][number])
    window.history.replaceState(null, '', `${window.location.pathname}#r=${encode({ b: balance, i: pack(incoming), o: pack(outgoing) })}`)
  }, [ready, balance, incoming, outgoing])

  const { findings, signals } = useMemo(() => {
    const findings: Finding[] = []
    const signals: PreviewSignal[] = []
    if (!ready) return { findings, signals }
    if (shortWeek > 0) {
      findings.push({ kind: 'soon', title: `Cash runs out in week ${shortWeek}`, body: 'At this rate the balance goes below zero inside 13 weeks. You still have time to move a charge or chase a payment.' })
      signals.push({ title: `Cash runs short in week ${shortWeek}`, body: `The balance goes below zero around ${new Date(Date.parse(`${todayIso()}T00:00:00Z`) + shortWeek * 7 * DAY).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}.`, abbr: '!', tone: 'attention' })
    } else if (lowestWeek > 0 && lowestWeek < WEEKS && lowest < cash) {
      findings.push({ kind: 'info', title: `Lowest point: ${money(lowest)} in week ${lowestWeek}`, body: 'Plan big payments for after that week, or keep that much in reserve.' })
    }
    for (const r of outgoing.filter((x) => x.on && x.cadence === 'year' && weekOf(x.date) != null)) {
      const w = weekOf(r.date)!
      findings.push({ kind: 'soon', title: `${r.name || 'A yearly charge'} lands in week ${w}`, body: `${money(num(r.amount))} in one go. Spread across the year it looks like ${money(num(r.amount) / 12)} a month, but your bank sees it all at once.`, amount: money(num(r.amount)) })
      signals.push({ title: `${r.name || 'A yearly charge'} renews in week ${w}`, body: `${money(num(r.amount))} in one charge. Keep, plan to cancel or snooze it.`, tone: 'attention' })
    }
    // The cost that moves the runway most
    const costs = outgoing.filter((r) => r.on && perMonth(r) > 0).sort((a, b) => perMonth(b) - perMonth(a))
    if (net < 0 && costs.length >= 2) {
      const top = costs.find((r) => !/payroll|salar|rent/i.test(r.name)) ?? costs[0]
      const without = runway(cash, incoming, outgoing.map((r) => (r.id === top.id ? { ...r, on: false } : r)))
      const gain = without === Infinity ? null : Math.round(without - runwayWeeks)
      findings.push({
        kind: 'save',
        title: without === Infinity ? `Without ${top.name || 'that cost'}, your cash grows` : `Cutting ${top.name || 'that cost'} adds ${gain} ${gain === 1 ? 'week' : 'weeks'}`,
        body: `It is ${money(perMonth(top))} of the ${money(monthOut)} going out each month. Switch it off above to see the difference.`,
      })
    }
    if (monthIn > 0 && incoming.filter((r) => r.on && perMonth(r) > 0).length === 1) {
      findings.push({ kind: 'people', title: 'All your income is one line', body: 'If that client pays late, the whole forecast moves. A late payment is worth hearing about the day it happens.' })
    }
    return { findings, signals }
  }, [ready, shortWeek, lowest, lowestWeek, cash, incoming, outgoing, net, monthIn, monthOut, runwayWeeks])

  const field = 'h-10 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'

  const list = (title: string, rows: Row[], set: (fn: (rows: Row[]) => Row[]) => void, placeholder: string) => (
    <fieldset>
      <legend className="font-display text-lg font-bold tracking-tight">{title}</legend>
      <ul className="mt-3 space-y-2">
        {rows.map((r) => {
          const patch = (p: Partial<Row>) => set((all) => all.map((x) => (x.id === r.id ? { ...x, ...p } : x)))
          return (
            <li key={r.id} className="space-y-1.5">
              <div className="grid grid-cols-[auto_1fr_5.5rem_6.5rem_auto] items-center gap-2">
                <input type="checkbox" checked={r.on} aria-label={`Include ${r.name || 'this item'}`} title="Switch off to see the difference" className="h-4 w-4 accent-[var(--color-brand)]" onChange={(e) => patch({ on: e.target.checked })} />
                <input className={field} placeholder={placeholder} value={r.name} aria-label="Name" onChange={(e) => patch({ name: e.target.value })} />
                <input className={field} inputMode="decimal" placeholder="$" value={r.amount} aria-label="Amount in USD" onChange={(e) => patch({ amount: e.target.value })} />
                <select className={field} value={r.cadence} aria-label="How often" onChange={(e) => patch({ cadence: e.target.value as Cadence })}>
                  <option value="month">a month</option>
                  <option value="year">a year</option>
                  <option value="week">a week</option>
                </select>
                <button type="button" className="rounded p-1 text-faint hover:text-foreground" aria-label="Remove" onClick={() => set((all) => all.filter((x) => x.id !== r.id))}>
                  <Trash2 className="h-4 w-4" aria-hidden />
                </button>
              </div>
              {r.cadence === 'year' && (
                <label className="ml-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                  <span className="whitespace-nowrap">Next charge</span>
                  <input type="date" className={`${field} h-8 w-auto text-xs`} value={r.date ?? ''} min={todayIso()} onChange={(e) => patch({ date: e.target.value || undefined })} />
                  <span className="whitespace-nowrap text-faint">{r.date && weekOf(r.date) ? `lands in week ${weekOf(r.date)}` : 'optional'}</span>
                </label>
              )}
            </li>
          )
        })}
      </ul>
      <Button variant="ghost" size="sm" className="mt-2" onClick={() => set((all) => [...all, row()])}>
        <Plus className="h-4 w-4" aria-hidden /> Add a line
      </Button>
    </fieldset>
  )

  const sendForecast = async () => {
    setSending(true)
    const toItem = (r: Row, direction: 'in' | 'out') => ({ name: r.name.trim(), amount: num(r.amount), cadence: r.cadence, direction, ...(r.date ? { nextDate: r.date } : {}) })
    const items = [
      ...incoming.filter((r) => r.on && r.name.trim() && perMonth(r) > 0).map((r) => toItem(r, 'in')),
      ...outgoing.filter((r) => r.on && r.name.trim() && perMonth(r) > 0).map((r) => toItem(r, 'out')),
    ]
    await sendToSubly('runway', items, { balance: Math.round(cash), findings: findings.length })
    setSending(false)
  }

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      send('tool_share', { tool: 'runway' })
    } catch {
      // clipboard blocked: the address bar has the same link
    }
  }

  const all = [...weeks, ...(baseline ?? [])]
  const max = Math.max(...all.map(Math.abs), 1)
  const hasNegative = Math.min(...all) < 0
  // When the balance stays positive, start the scale below the lowest week rather than at zero,
  // so a change of a few hundred dollars is visible; the labels say where the scale starts
  const top = Math.max(...all)
  const floor = hasNegative ? 0 : Math.max(0, Math.min(...all) - (top - Math.min(...all)) * 0.5 - top * 0.02)
  const bar = (v: number) =>
    hasNegative ? `${Math.max(1.5, (Math.abs(v) / max) * 100)}%` : `${Math.max(1.5, ((v - floor) / Math.max(top - floor, 1)) * 100)}%`

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
            {money(monthIn)} in and {money(monthOut)} out a month{net < 0 ? `, so you spend ${money(-net)} more than you take in` : ''}. In 13 weeks you would have {money(weeks[WEEKS])}. Switch a line off to see what cancelling it changes.
          </p>

          <div className="mt-6" role="img" aria-label={`Balance week by week for 13 weeks, from ${money(weeks[0])} to ${money(weeks[WEEKS])}, lowest ${money(lowest)} in week ${lowestWeek}`}>
            <div className="relative flex h-48 gap-1">
              {hasNegative && <div className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dashed border-faint/60" />}
              {weeks.map((w, i) => (
                <div key={i} className={`relative flex h-full flex-1 flex-col ${hasNegative ? '' : 'justify-end'}`} title={`Week ${i}: ${money(w)}${baseline ? ` (was ${money(baseline[i])})` : ''}`}>
                  {/* Positive half (or the whole height when nothing goes below zero) */}
                  <div className={`relative flex flex-col justify-end ${hasNegative ? 'h-1/2' : 'h-full'}`}>
                    {baseline && baseline[i] >= 0 && <div className="absolute inset-x-0 bottom-0 rounded-t border border-dashed border-faint/70" style={{ height: bar(baseline[i]) }} />}
                    {w >= 0 && <div className={`relative rounded-t ${i === lowestWeek && i > 0 ? 'bg-brand' : 'bg-brand/60'}`} style={{ height: bar(w) }} />}
                  </div>
                  {hasNegative && (
                    <div className="relative h-1/2">
                      {baseline && baseline[i] < 0 && <div className="absolute inset-x-0 top-0 rounded-b border border-dashed border-faint/70" style={{ height: bar(baseline[i]) }} />}
                      {w < 0 && <div className="relative rounded-b bg-attention/80" style={{ height: bar(w) }} />}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between font-mono text-[11px] uppercase tracking-[0.05em] text-faint">
              <span>Today · {money(weeks[0])}</span>
              {!hasNegative && floor > 0 && <span className="hidden normal-case sm:inline">scale starts at {money(floor)}</span>}
              <span>Week 13 · {money(weeks[WEEKS])}</span>
            </div>
            {baseline && <p className="mt-2 text-xs text-muted-foreground">Dashed: with every line switched on. Solid: with your changes.</p>}
          </div>

          <Findings title="What we found" findings={findings} />

          <SendToSubly
            title="Keep this forecast current without retyping it."
            body="Subly’s 13-week forecast is built from everything you track, with each charge on its real date, and lets you test a cancel or a price change before you commit. It is part of Business, and every account starts with a 14-day Business trial, no card."
            button="Send this to Subly"
            onSend={sendForecast}
            sending={sending}
            keep={
              <Button variant="ghost" onClick={share}>
                {copied ? <Check className="h-4 w-4" aria-hidden /> : <Link2 className="h-4 w-4" aria-hidden />}
                {copied ? 'Link copied' : 'Copy a link to these numbers'}
              </Button>
            }
            preview={
              <SublyPreview
                total={`${money(cash)} today`}
                rowsTitle="In and out, biggest first"
                signals={signals}
                rows={[...incoming.map((r) => ({ r, incoming: true })), ...outgoing.map((r) => ({ r, incoming: false }))]
                  .filter(({ r }) => r.on && r.name.trim() && num(r.amount) > 0)
                  .sort((a, b) => perMonth(b.r) - perMonth(a.r))
                  .map(({ r, incoming }) => ({ name: r.name, amount: `${money(num(r.amount))}${r.cadence === 'year' ? '/yr' : r.cadence === 'week' ? '/wk' : '/mo'}`, incoming }))}
              />
            }
          />
        </div>
      )}
    </div>
  )
}
