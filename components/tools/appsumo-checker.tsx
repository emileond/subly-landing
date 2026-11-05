import { ArrowRight, FileUp, Loader2, Plus, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { REFUND_DAYS, parseAppsumoExport } from '@/lib/appsumo-export'
import { sendToSubly } from '@/lib/handoff'
import { send } from '@/lib/tracking'

type Deal = { id: string; name: string; purchasedOn: string; amount: number; currency: string; plan?: string; website?: string; ended?: boolean }

const DAY = 24 * 60 * 60 * 1000
const todayIso = () => {
  const now = new Date()
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())).toISOString().slice(0, 10)
}
const addDays = (iso: string, days: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + days * DAY).toISOString().slice(0, 10)
const daysBetween = (from: string, to: string) => Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / DAY)
const formatDate = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' })
const money = (amount: number, currency: string) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: amount % 1 ? 2 : 0 }).format(amount)

let nextId = 0
const newId = () => `d${++nextId}`

/**
 * The AppSumo refund-window checker: read an AppSumo export (in the browser) or type deals in,
 * see which can still be refunded and how many days are left, then send them to Subly for a
 * reminder before each window closes.
 */
export function AppsumoChecker() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [skipped, setSkipped] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [draft, setDraft] = useState({ name: '', purchasedOn: '', amount: '' })
  const [sending, setSending] = useState(false)
  // The date comes from the visitor's device, never the build (no deals exist until they add some, so nothing differs on hydration)
  const [today] = useState(() => (typeof window === 'undefined' ? '' : todayIso()))
  const fileInput = useRef<HTMLInputElement>(null)
  const reported = useRef(false)

  const rows = useMemo(() => {
    if (!today) return []
    return deals
      .map((deal) => {
        const closes = addDays(deal.purchasedOn, REFUND_DAYS)
        const left = daysBetween(today, closes)
        return { ...deal, closes, left, open: left >= 0 && !deal.ended }
      })
      .sort((a, b) => (a.open === b.open ? (a.open ? a.left - b.left : b.purchasedOn.localeCompare(a.purchasedOn)) : a.open ? -1 : 1))
  }, [deals, today])

  const open = rows.filter((r) => r.open)
  const refundable = open.filter((r) => r.currency === 'USD').reduce((sum, r) => sum + r.amount, 0)
  const spent = rows.filter((r) => r.currency === 'USD').reduce((sum, r) => sum + r.amount, 0)

  useEffect(() => {
    if (!rows.length || reported.current) return
    reported.current = true
    send('tool_result', { tool: 'appsumo', deals: String(rows.length), open: String(open.length) })
  }, [rows.length, open.length])

  const readFile = async (file: File) => {
    setError(null)
    send('tool_started', { tool: 'appsumo', how: 'file' })
    if (file.size > 2_000_000) return setError('That file is larger than an AppSumo export should be. Try the CSV from Account → Products.')
    const parsed = parseAppsumoExport(await file.text())
    if (parsed.error) return setError('We could not find the product and date columns. Use the CSV from AppSumo, Account → Products → Export.')
    setDeals(
      parsed.purchases.map((p) => ({
        id: newId(),
        name: p.name,
        purchasedOn: p.purchasedOn,
        amount: p.amount,
        currency: p.currency,
        plan: p.plan ?? undefined,
        website: p.website ?? undefined,
        ended: p.ended,
      })),
    )
    setSkipped(parsed.skipped.length)
    if (!parsed.purchases.length) setError('No deals to check in that file: everything in it was refunded, transferred or not a tool.')
  }

  const addDraft = () => {
    const amount = Number(draft.amount.replace(/[^\d.]/g, '') || 0)
    if (!draft.name.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(draft.purchasedOn)) return setError('Add the deal name and the date you bought it.')
    setError(null)
    if (!deals.length) send('tool_started', { tool: 'appsumo', how: 'manual' })
    setDeals((list) => [...list, { id: newId(), name: draft.name.trim(), purchasedOn: draft.purchasedOn, amount, currency: 'USD' }])
    setDraft({ name: '', purchasedOn: '', amount: '' })
  }

  const sendDeals = async () => {
    setSending(true)
    await sendToSubly(
      'appsumo',
      rows.filter((r) => !r.ended).map((r) => ({ name: r.name, amount: r.amount, currency: r.currency, purchasedOn: r.purchasedOn, plan: r.plan, website: r.website })),
      { deals: rows.length, open: open.length },
    )
    setSending(false)
  }

  const input = 'h-10 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
      {/* 1. The way in */}
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1.3fr] md:items-start">
        <div>
          <h2 className="font-display text-lg font-bold tracking-tight">Check your AppSumo export</h2>
          <p className="mt-1 text-sm text-muted-foreground">On AppSumo: Account → Products → Export. The file is read here, in your browser.</p>
          <input
            ref={fileInput}
            type="file"
            accept=".csv,text/csv"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) void readFile(file)
              e.target.value = ''
            }}
          />
          <Button variant="outline" className="mt-4 w-full" onClick={() => fileInput.current?.click()}>
            <FileUp className="h-4 w-4" aria-hidden /> Choose the CSV
          </Button>
        </div>
        <p className="text-center text-sm text-faint md:pt-10">or</p>
        <div>
          <h2 className="font-display text-lg font-bold tracking-tight">Add a deal by hand</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-[1.4fr_1fr_0.8fr_auto]">
            <label className="sr-only" htmlFor="deal-name">Deal</label>
            <input id="deal-name" className={input} placeholder="Deal name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            <label className="sr-only" htmlFor="deal-date">Bought on</label>
            <input id="deal-date" type="date" className={input} value={draft.purchasedOn} max={today || undefined} onChange={(e) => setDraft({ ...draft, purchasedOn: e.target.value })} />
            <label className="sr-only" htmlFor="deal-price">Price in USD</label>
            <input id="deal-price" inputMode="decimal" className={input} placeholder="$ paid" value={draft.amount} onChange={(e) => setDraft({ ...draft, amount: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && addDraft()} />
            <Button variant="outline" onClick={addDraft} aria-label="Add deal">
              <Plus className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>
      </div>

      {error && <p className="mt-4 rounded-lg border border-border bg-secondary/60 p-3 text-sm">{error}</p>}

      {/* 2. The answer */}
      {rows.length > 0 && (
        <div className="mt-8 border-t border-border pt-8" aria-live="polite">
          <p className="font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            {open.length
              ? `${open.length} of ${rows.length} ${rows.length === 1 ? 'deal' : 'deals'} can still be refunded`
              : `None of your ${rows.length} ${rows.length === 1 ? 'deal' : 'deals'} can be refunded any more`}
          </p>
          <p className="mt-2 text-muted-foreground">
            {open.length
              ? `${refundable ? `${money(refundable, 'USD')} in total. ` : ''}The next window closes ${open[0].left === 0 ? 'today' : open[0].left === 1 ? 'tomorrow' : `in ${open[0].left} days`}, on ${formatDate(open[0].closes)}.`
              : `AppSumo's refund window is ${REFUND_DAYS} days from purchase.`}
            {spent > 0 && ` You have spent ${money(spent, 'USD')} on these deals.`}
            {skipped > 0 && ` ${skipped} ${skipped === 1 ? 'row was' : 'rows were'} left out (refunded, transferred or not a tool).`}
          </p>

          <ul className="mt-6 divide-y divide-border rounded-xl border border-border">
            {rows.map((r) => (
              <li key={r.id} className="flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{r.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Bought {formatDate(r.purchasedOn)}
                    {r.amount > 0 && ` · ${money(r.amount, r.currency)}`}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.05em] ${
                    r.open ? (r.left <= 7 ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300' : 'bg-brand/10 text-brand-ink') : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {r.ended ? 'Expired' : r.open ? (r.left === 0 ? 'Closes today' : `${r.left} ${r.left === 1 ? 'day' : 'days'} left`) : `Closed ${formatDate(r.closes)}`}
                </span>
                <button
                  type="button"
                  className="shrink-0 rounded p-1 text-faint hover:text-foreground"
                  aria-label={`Remove ${r.name}`}
                  onClick={() => setDeals((list) => list.filter((d) => d.id !== r.id))}
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                </button>
              </li>
            ))}
          </ul>

          {/* 3. The next step */}
          <div className="mt-6 flex flex-col gap-4 rounded-xl border border-border bg-secondary/60 p-5 sm:flex-row sm:items-center">
            <div className="flex-1">
              <p className="font-medium">Get a reminder before each refund window closes.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Subly tracks your deals on every plan, Free included, and tells you before a window closes. Your deals come with you, and you check them before anything is added.
              </p>
            </div>
            <Button size="lg" onClick={sendDeals} disabled={sending} className="shrink-0">
              {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
              Send my deals to Subly <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
