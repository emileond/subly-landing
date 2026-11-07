import { ArrowRight, Eye, FileUp, Loader2, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { type Finding, Findings, SendToSubly, SublyPreview } from '@/components/tools/report'
import { AnchorButton, Button } from '@/components/ui/button'
import { logoUrl, signupHref } from '@/lib/handoff'
import { APP_URL } from '@/lib/site'
import { send } from '@/lib/tracking'

type ScanRow = {
  name: string
  direction: 'out' | 'in'
  amount: number
  currency: string
  billingFreq: number
  billingRange: 'week' | 'month' | 'year'
  nextDate: string
  occurrences: number
  previousAmount: number | null
  website: string | null
}

type Phase = 'loading' | 'off' | 'ready' | 'uploading' | 'reading' | 'done' | 'error'

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string
      reset: (id?: string) => void
    }
  }
}

const ENDPOINT = `${APP_URL}/api/public/statement-scan`
const ERRORS: Record<string, string> = {
  visitor_limit: 'You have scanned 3 statements today. Try again tomorrow, or sign up and read them in Subly.',
  busy: 'The scanner has read all the statements it can today. Try again tomorrow, or sign up and read yours in Subly.',
  type: 'Use a PDF or CSV statement.',
  size: 'That file is too large. Statements up to 5 MB work.',
  check: 'The quick human check did not go through. Reload the page and try again.',
  off: 'The scanner is not available right now.',
  failed: 'We could not read that statement. Try a PDF or CSV export from your bank or card.',
}

const monthly = (r: ScanRow) =>
  r.billingRange === 'year' ? r.amount / (12 * r.billingFreq) : r.billingRange === 'week' ? (r.amount * 52) / 12 / r.billingFreq : r.amount / r.billingFreq
const money = (amount: number, currency: string) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: amount >= 100 ? 0 : 2 }).format(amount)
const every = (r: ScanRow) =>
  r.billingRange === 'year' ? 'a year' : r.billingRange === 'week' ? (r.billingFreq === 2 ? 'every 2 weeks' : 'a week') : r.billingFreq === 1 ? 'a month' : `every ${r.billingFreq} months`

/** What a result looks like, for anyone who wants to see one before uploading their own statement */
const inDays = (days: number) => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
const example = (): ScanRow[] => [
  { name: 'Adobe Creative Cloud', direction: 'out', amount: 59.99, currency: 'USD', billingFreq: 1, billingRange: 'month', nextDate: inDays(6), occurrences: 3, previousAmount: null, website: 'adobe.com' },
  { name: 'Google Workspace', direction: 'out', amount: 42, currency: 'USD', billingFreq: 1, billingRange: 'month', nextDate: inDays(18), occurrences: 3, previousAmount: null, website: 'workspace.google.com' },
  { name: 'Slack', direction: 'out', amount: 26.25, currency: 'USD', billingFreq: 1, billingRange: 'month', nextDate: inDays(21), occurrences: 3, previousAmount: null, website: 'slack.com' },
  { name: 'Zoom', direction: 'out', amount: 15.99, currency: 'USD', billingFreq: 1, billingRange: 'month', nextDate: inDays(9), occurrences: 3, previousAmount: null, website: 'zoom.us' },
  { name: 'Notion', direction: 'out', amount: 12, currency: 'USD', billingFreq: 1, billingRange: 'month', nextDate: inDays(25), occurrences: 3, previousAmount: 10, website: 'notion.so' },
  { name: 'Figma', direction: 'out', amount: 16, currency: 'USD', billingFreq: 1, billingRange: 'month', nextDate: inDays(12), occurrences: 3, previousAmount: null, website: 'figma.com' },
  { name: 'Canva', direction: 'out', amount: 15, currency: 'USD', billingFreq: 1, billingRange: 'month', nextDate: inDays(3), occurrences: 2, previousAmount: 12.99, website: 'canva.com' },
  { name: 'Dropbox', direction: 'out', amount: 11.99, currency: 'USD', billingFreq: 1, billingRange: 'month', nextDate: inDays(27), occurrences: 3, previousAmount: null, website: 'dropbox.com' },
  { name: 'Calendly', direction: 'out', amount: 12, currency: 'USD', billingFreq: 1, billingRange: 'month', nextDate: inDays(15), occurrences: 3, previousAmount: null, website: 'calendly.com' },
  { name: 'Northlight retainer', direction: 'in', amount: 2500, currency: 'USD', billingFreq: 1, billingRange: 'month', nextDate: inDays(8), occurrences: 3, previousAmount: null, website: null },
]

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve()
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('turnstile'))
    document.head.appendChild(script)
  })
}

/**
 * The free statement scanner: upload a PDF or CSV statement, Subly's reader finds what repeats
 * (in the app, as a background job), and the page shows the total, the price rises and what
 * renews soon, before any sign-up. The button keeps the list for review after sign-up.
 */
export function StatementScanner() {
  const [phase, setPhase] = useState<Phase>('loading')
  const [error, setError] = useState('')
  const [rows, setRows] = useState<ScanRow[]>([])
  const [handoff, setHandoff] = useState<string | null>(null)
  const [token, setToken] = useState('')
  // Two weeks from when the result came in, for "renews soon"
  const [soonUntil, setSoonUntil] = useState('')
  const [isExample, setIsExample] = useState(false)
  const [before, setBefore] = useState<Phase>('ready')
  const box = useRef<HTMLDivElement>(null)
  const fileInput = useRef<HTMLInputElement>(null)
  const widget = useRef<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(ENDPOINT)
      .then((r) => r.json() as Promise<{ enabled: boolean; siteKey: string | null }>)
      .then(async ({ enabled, siteKey }) => {
        if (cancelled) return
        if (!enabled || !siteKey) return setPhase('off')
        await loadTurnstile()
        if (cancelled || !box.current || !window.turnstile) return
        widget.current = window.turnstile.render(box.current, {
          sitekey: siteKey,
          appearance: 'interaction-only',
          callback: (value: string) => setToken(value),
          'expired-callback': () => setToken(''),
        })
        setPhase('ready')
      })
      .catch(() => !cancelled && setPhase('off'))
    return () => {
      cancelled = true
    }
  }, [])

  const poll = async (id: string) => {
    const started = Date.now()
    while (Date.now() - started < 5 * 60 * 1000) {
      await new Promise((resolve) => setTimeout(resolve, 2500))
      const result = (await fetch(`${ENDPOINT}?id=${id}`).then((r) => r.json())) as { status: string; rows?: ScanRow[]; handoff?: string | null }
      if (result.status === 'done') return result
      if (result.status === 'failed') throw new Error('failed')
    }
    throw new Error('failed')
  }

  const scan = async (file: File) => {
    setError('')
    if (!token) return setError(ERRORS.check)
    setPhase('uploading')
    send('tool_started', { tool: 'scan', how: file.name.toLowerCase().endsWith('.csv') ? 'csv' : 'pdf' })
    try {
      const form = new FormData()
      form.set('file', file)
      form.set('token', token)
      const response = await fetch(ENDPOINT, { method: 'POST', body: form })
      const body = (await response.json()) as { id?: string; error?: string }
      if (!response.ok || !body.id) throw new Error(body.error || 'failed')
      setPhase('reading')
      const result = await poll(body.id)
      setRows(result.rows ?? [])
      setHandoff(result.handoff ?? null)
      setSoonUntil(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10))
      setPhase('done')
      const out = (result.rows ?? []).filter((r) => r.direction === 'out')
      send('tool_result', { tool: 'scan', found: String(out.length) })
    } catch (e) {
      const code = e instanceof Error ? e.message : 'failed'
      send('tool_failed', { tool: 'scan', reason: code })
      setError(ERRORS[code] ?? ERRORS.failed)
      setPhase('ready')
      setToken('')
      if (widget.current) window.turnstile?.reset(widget.current)
    }
  }

  const showExample = () => {
    send('tool_example', { tool: 'scan' })
    setBefore(phase)
    setRows(example())
    setHandoff(null)
    setIsExample(true)
    setSoonUntil(inDays(14))
    setPhase('done')
  }
  const backToUpload = () => {
    setIsExample(false)
    setRows([])
    setPhase(before === 'off' ? 'off' : 'ready')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const out = rows.filter((r) => r.direction === 'out').sort((a, b) => monthly(b) - monthly(a))
  const incoming = rows.filter((r) => r.direction === 'in')
  const currency = out[0]?.currency ?? 'USD'
  const total = out.filter((r) => r.currency === currency).reduce((sum, r) => sum + monthly(r), 0)
  const rises = out.filter((r) => r.previousAmount && r.previousAmount < r.amount)
  const soon = out.filter((r) => r.nextDate <= soonUntil)
  const sameCurrency = (r: ScanRow) => r.currency === currency
  const riseYear = rises.filter(sameCurrency).reduce((sum, r) => sum + (monthly(r) - monthly({ ...r, amount: r.previousAmount! })) * 12, 0)
  const findings: Finding[] = [
    ...rises.slice(0, 2).map((r): Finding => ({
      kind: 'rise',
      title: `${r.name} went up ${Math.round(((r.amount - r.previousAmount!) / r.previousAmount!) * 100)}%`,
      body: `${money(r.previousAmount!, r.currency)} → ${money(r.amount, r.currency)} ${every(r)}. Worth checking the plan, or asking for the old price.`,
      amount: `+${money((monthly(r) - monthly({ ...r, amount: r.previousAmount! })) * 12, r.currency)}/yr`,
    })),
    ...(soon.length
      ? [{ kind: 'soon' as const, title: `${soon.length} ${soon.length === 1 ? 'renews' : 'renew'} in the next two weeks`, body: `${soon.slice(0, 3).map((r) => r.name).join(', ')}${soon.length > 3 ? ` and ${soon.length - 3} more` : ''}. Cancel now anything you no longer use.` }]
      : []),
    ...(out.length >= 3
      ? [{ kind: 'info' as const, title: `${out[0].name} is the biggest`, body: `${money(monthly(out[0]) * 12, out[0].currency)} a year, ${Math.round((monthly(out[0]) / Math.max(total, 1)) * 100)}% of what repeats. Make sure someone still needs it.` }]
      : []),
    ...(incoming.length ? [{ kind: 'save' as const, title: `${incoming.length} coming in on repeat`, body: `${incoming.map((r) => `${r.name} (${money(r.amount, r.currency)} ${every(r)})`).join(', ')}. Subly tracks these next to your costs.` }] : []),
  ]
  const signals = [
    ...rises.map((r) => ({ title: `${r.name} went up ${Math.round(((r.amount - r.previousAmount!) / r.previousAmount!) * 100)}%`, body: `${money(r.previousAmount!, r.currency)} → ${money(r.amount, r.currency)} ${every(r)}.`, website: r.website, tone: 'attention' as const })),
    ...soon.map((r) => ({ title: `${r.name} renews ${new Date(`${r.nextDate}T00:00:00Z`).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric' })}`, body: `${money(r.amount, r.currency)} ${every(r)}, about ${money(monthly(r) * 12, r.currency)} a year.`, website: r.website })),
  ]

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
      {phase !== 'done' && (
        <div className="text-center">
          <input
            ref={fileInput}
            type="file"
            accept=".pdf,.csv,application/pdf,text/csv"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) void scan(file)
              e.target.value = ''
            }}
          />
          {phase === 'off' ? (
            <>
              <p className="font-medium">{ERRORS.off}</p>
              <p className="mt-1 text-sm text-muted-foreground">Every Subly account can read a statement, Free included.</p>
              <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
                <AnchorButton href={signupHref('/tools/find-subscriptions')} size="lg">
                  Read it in Subly <ArrowRight className="h-4 w-4" aria-hidden />
                </AnchorButton>
                <Button variant="outline" size="lg" onClick={showExample}>
                  <Eye className="h-4 w-4" aria-hidden /> See an example result
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button size="lg" disabled={phase !== 'ready'} onClick={() => fileInput.current?.click()}>
                {phase === 'ready' ? <FileUp className="h-4 w-4" aria-hidden /> : <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                {phase === 'uploading' ? 'Uploading…' : phase === 'reading' ? 'Reading your statement…' : 'Choose a statement (PDF or CSV)'}
              </Button>
              <p className="mt-3 text-sm text-muted-foreground">
                {phase === 'reading'
                  ? 'This takes about a minute. Keep this page open.'
                  : 'A bank or card statement covering a month or more. No bank login needed.'}
              </p>
              {phase === 'ready' && (
                <button type="button" onClick={showExample} className="mt-2 text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground">
                  Not ready to upload? See an example result
                </button>
              )}
            </>
          )}
          <div ref={box} className="mt-3 flex justify-center" />
          {error && <p className="mx-auto mt-4 max-w-md rounded-lg border border-border bg-secondary/60 p-3 text-sm">{error}</p>}
        </div>
      )}

      {phase === 'done' && (
        <div aria-live="polite">
          {isExample && (
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-dashed border-border px-4 py-2.5 text-sm">
              <span>
                <span className="mr-2 rounded-full bg-muted px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.05em] text-muted-foreground">Example</span>
                A made-up agency statement, to show what you get.
              </span>
              <button type="button" onClick={backToUpload} className="inline-flex items-center gap-1.5 font-medium underline underline-offset-4">
                <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Try your own
              </button>
            </div>
          )}
          <p className="font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            {out.length
              ? `${out.length} recurring ${out.length === 1 ? 'charge' : 'charges'}, about ${money(total, currency)} a month`
              : 'We found no recurring charges on this statement'}
          </p>
          <p className="mt-2 text-muted-foreground">
            {out.length
              ? [
                  `That is ${money(total * 12, currency)} a year.`,
                  rises.length ? `${rises.length} went up in price.` : '',
                  soon.length ? `${soon.length} renew${soon.length === 1 ? 's' : ''} in the next two weeks.` : '',
                ]
                  .filter(Boolean)
                  .join(' ')
              : 'A statement covering two or three months shows more of what repeats.'}
          </p>

          {out.length > 0 && (
            <ul className="mt-6 divide-y divide-border rounded-xl border border-border">
              {out.map((r) => (
                <li key={`${r.name}-${r.amount}`} className="flex items-center gap-3 px-4 py-3">
                  {r.website ? (
                    <img src={logoUrl(r.website) ?? ''} alt="" width={28} height={28} loading="lazy" className="h-7 w-7 shrink-0 rounded-md border border-border object-cover" />
                  ) : (
                    <span className="h-7 w-7 shrink-0 rounded-md border border-border bg-secondary" aria-hidden />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{r.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {money(r.amount, r.currency)} {every(r)}
                      {r.previousAmount && r.previousAmount < r.amount ? ` · was ${money(r.previousAmount, r.currency)}` : ''}
                    </p>
                  </div>
                  <span className="shrink-0 text-right text-sm">
                    <span className="font-medium">{money(monthly(r) * 12, r.currency)}</span>
                    <span className="block text-xs text-faint">a year</span>
                  </span>
                </li>
              ))}
            </ul>
          )}

          <Findings title={riseYear > 0 ? `What we found · price rises cost you ${money(riseYear, currency)} more a year` : 'What we found'} findings={findings} />

          <SendToSubly
            title={isExample ? 'See this for your own business.' : 'Save these and get a heads-up before each one renews.'}
            body={
              isExample
                ? 'Upload a statement in Subly, Free included, and it lists every recurring charge, then keeps watching: renewals, price rises, and charges after you cancel.'
                : 'Subly tells you before renewals and price rises, and when something you cancelled charges again. These come with you, and you check them before anything is added.'
            }
            button={isExample ? 'Find yours in Subly' : 'Save them in Subly'}
            href={signupHref('/tools/find-subscriptions', isExample ? undefined : (handoff ?? undefined))}
            onHrefClick={() => send('tool_handoff', { tool: 'scan', items: String(isExample ? 0 : rows.length), example: String(isExample) })}
            preview={
              <SublyPreview
                total={out.length ? `${money(total, currency)}/mo` : undefined}
                signals={signals}
                rows={[...incoming.map((r) => ({ r, incoming: true })), ...out.map((r) => ({ r, incoming: false }))]
                  .sort((a, b) => a.r.nextDate.localeCompare(b.r.nextDate))
                  .map(({ r, incoming }) => ({ name: r.name, amount: money(r.amount, r.currency), when: new Date(`${r.nextDate}T00:00:00Z`).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric' }), website: r.website, incoming }))}
              />
            }
          />
        </div>
      )}
    </div>
  )
}
