import { Check, Link2, Plus, Search, Timer, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Findings, SendToSubly, SublyPreview } from '@/components/tools/report'
import { AnchorButton, Button } from '@/components/ui/button'
import { logoUrl, sendToSubly } from '@/lib/handoff'
import { type Line, billedYearly, cost, decode, encode, hasChoice, money, nextKey, perMonthPrice, usablePlans } from '@/lib/stack-link'
import { stackInsights } from '@/lib/stack-insights'
import { PRICES_CHECKED, POPULAR, TOOLS_BY_ID, type PricedTool, searchTools } from '@/lib/tool-prices'
import { send } from '@/lib/tracking'

/**
 * What does our software stack cost? Pick tools, plans and seats; see the monthly and yearly
 * total, the cost per person and what paying yearly would save. The stack lives in the link.
 */
export function StackTracker() {
  const [lines, setLines] = useState<Line[]>([])
  const [team, setTeam] = useState(0)
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState(false)
  const [sending, setSending] = useState(false)
  const reported = useRef(false)
  const loaded = useRef(false)

  // A shared link opens with its stack
  useEffect(() => {
    if (loaded.current) return
    loaded.current = true
    const match = window.location.hash.match(/^#s=(.+)$/)
    const state = match && decode(match[1])
    if (state && state.lines.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the link once on load
      setLines(state.lines)
      setTeam(state.team)
      send('tool_started', { tool: 'stack', how: 'link' })
    }
  }, [])

  useEffect(() => {
    if (!loaded.current) return
    const hash = lines.length ? `#s=${encode(lines, team)}` : ''
    window.history.replaceState(null, '', `${window.location.pathname}${hash}`)
  }, [lines, team])

  const suggestions = useMemo(() => searchTools(query, lines.flatMap((l) => ('id' in l ? [l.id] : []))), [query, lines])

  const add = (tool: PricedTool) => {
    const plans = usablePlans(tool)
    // The first paid plan is the usual pick; free plans stay one click away
    const plan = Math.max(0, plans.findIndex((p) => (p.price ?? p.yearlyPrice ?? 0) > 0))
    if (!lines.length) send('tool_started', { tool: 'stack', how: 'pick' })
    setLines((all) => [...all, { key: nextKey(), id: tool.id, plan, seats: plans[plan]?.perSeat ? Math.max(1, team || 1) : 1, yearly: false }])
    setQuery('')
  }
  const addCustom = () => {
    if (!query.trim()) return
    setLines((all) => [...all, { key: nextKey(), custom: query.trim().slice(0, 80), amount: 0, yearly: false }])
    setQuery('')
  }
  const update = (key: number, patch: Partial<Record<string, unknown>>) => setLines((all) => all.map((l) => (l.key === key ? ({ ...l, ...patch } as Line) : l)))

  const costs = lines.map(cost)
  const monthly = costs.reduce((sum, c) => sum + c.monthly, 0)
  const saving = costs.reduce((sum, c) => sum + c.saving, 0)
  const ranked = lines.map((l, i) => ({ line: l, monthly: costs[i].monthly })).sort((a, b) => b.monthly - a.monthly)
  const topShare = monthly > 0 ? ranked.slice(0, 3).reduce((sum, r) => sum + r.monthly, 0) / monthly : 0
  const insight = useMemo(() => stackInsights(lines, team), [lines, team])
  const lineName = (l: Line) => ('custom' in l ? l.custom : (TOOLS_BY_ID[l.id]?.name ?? ''))
  const lineSite = (l: Line) => ('id' in l ? TOOLS_BY_ID[l.id]?.website : undefined)

  useEffect(() => {
    if (lines.length < 3 || reported.current) return
    reported.current = true
    send('tool_result', { tool: 'stack', tools: String(lines.length) })
  }, [lines.length])

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      send('tool_share', { tool: 'stack' })
    } catch {
      // clipboard blocked: the address bar has the same link
    }
  }

  const sendStack = async () => {
    setSending(true)
    const items = lines
      .map((l) => {
        if ('custom' in l) return l.amount > 0 ? { name: l.custom, amount: l.amount, cadence: (l.yearly ? 'year' : 'month') as 'year' | 'month' } : null
        const tool = TOOLS_BY_ID[l.id]
        const plan = usablePlans(tool)[l.plan]
        if (!plan || !perMonthPrice(plan, l.yearly)) return null
        const seats = plan.perSeat ? Math.max(1, l.seats) : 1
        const yearly = billedYearly(plan, l.yearly)
        return {
          name: tool.name,
          amount: Math.round(perMonthPrice(plan, l.yearly) * (yearly ? 12 : 1) * seats * 100) / 100,
          cadence: (yearly ? 'year' : 'month') as 'year' | 'month',
          website: tool.website,
          category: tool.category,
          plan: plan.perSeat ? `${plan.name}, ${seats} ${seats === 1 ? 'seat' : 'seats'}` : plan.name,
        }
      })
      .filter((item): item is NonNullable<typeof item> => !!item)
    await sendToSubly('stack', items, { tools: lines.length, team, findings: insight.findings.length, savings: Math.round(insight.savingsYear) })
    setSending(false)
  }

  const field = 'h-9 rounded-lg border border-input bg-card px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
      {/* Picking tools */}
      <div className="relative">
        <label htmlFor="stack-search" className="font-display text-lg font-bold tracking-tight">
          Add the tools you pay for
        </label>
        <div className="relative mt-3">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" aria-hidden />
          <input
            id="stack-search"
            className="h-11 w-full rounded-lg border border-input bg-card pl-9 pr-3 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Notion, Figma, Slack…"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== 'Enter') return
              if (suggestions[0]) add(suggestions[0])
              else addCustom()
            }}
          />
        </div>
        {query.trim() && (
          <ul className="absolute z-10 mt-1 max-h-72 w-full overflow-auto rounded-lg border border-border bg-card shadow-lg" role="listbox">
            {suggestions.map((t) => (
              <li key={t.id}>
                <button type="button" className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-accent" onClick={() => add(t)}>
                  <img src={logoUrl(t.website) ?? ''} alt="" width={20} height={20} loading="lazy" className="h-5 w-5 rounded" />
                  <span>{t.name}</span>
                </button>
              </li>
            ))}
            <li>
              <button type="button" className="flex w-full items-center gap-3 px-3 py-2 text-left text-muted-foreground hover:bg-accent" onClick={addCustom}>
                <Plus className="h-4 w-4" aria-hidden /> Add “{query.trim()}” with your own price
              </button>
            </li>
          </ul>
        )}
        {!lines.length && (
          <div className="mt-4 flex flex-wrap gap-2">
            {POPULAR.map((t) => (
              <button key={t.id} type="button" onClick={() => add(t)} className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm hover:bg-accent">
                <img src={logoUrl(t.website) ?? ''} alt="" width={16} height={16} loading="lazy" className="h-4 w-4 rounded" />
                {t.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {lines.length > 0 && (
        <>
          <ul className="mt-6 divide-y divide-border rounded-xl border border-border">
            {lines.map((l, i) => {
              const tool = 'id' in l ? TOOLS_BY_ID[l.id] : null
              const plans = tool ? usablePlans(tool) : []
              const plan = plans['plan' in l ? l.plan : 0]
              return (
                <li key={l.key} className="flex flex-wrap items-center gap-2 px-3 py-3 sm:flex-nowrap">
                  {tool ? (
                    <img src={logoUrl(tool.website) ?? ''} alt="" width={28} height={28} loading="lazy" className="h-7 w-7 shrink-0 rounded-md border border-border" />
                  ) : (
                    <span className="h-7 w-7 shrink-0 rounded-md border border-border bg-secondary" aria-hidden />
                  )}
                  <span className="min-w-0 flex-1 truncate font-medium">{tool ? tool.name : 'custom' in l ? l.custom : ''}</span>
                  {'id' in l ? (
                    <>
                      <select className={field} aria-label={`${tool?.name} plan`} value={l.plan} onChange={(e) => update(l.key, { plan: Number(e.target.value) })}>
                        {plans.map((p, index) => (
                          <option key={p.name} value={index}>
                            {p.name} · {(p.price ?? p.yearlyPrice) ? `${money((p.price ?? p.yearlyPrice)!)}${p.perSeat ? '/seat' : ''}${p.price == null ? ' yearly' : ''}` : 'Free'}
                          </option>
                        ))}
                      </select>
                      {plan?.perSeat && (
                        <label className="flex items-center gap-1 text-sm text-muted-foreground">
                          <input type="number" min={1} max={10000} className={`${field} w-16`} aria-label="Seats" value={l.seats} onChange={(e) => update(l.key, { seats: Math.max(1, Number(e.target.value) || 1) })} />
                          seats
                        </label>
                      )}
                      {plan && !hasChoice(plan) && plan.price == null && <span className="text-sm text-muted-foreground">billed yearly</span>}
                      {plan && hasChoice(plan) && (
                        <select className={field} aria-label="Billing" value={l.yearly ? 'y' : 'm'} onChange={(e) => update(l.key, { yearly: e.target.value === 'y' })}>
                          <option value="m">Monthly</option>
                          <option value="y">Yearly</option>
                        </select>
                      )}
                    </>
                  ) : (
                    <>
                      <input inputMode="decimal" className={`${field} w-24`} aria-label="Price in USD" placeholder="$" value={'amount' in l && l.amount ? l.amount : ''} onChange={(e) => update(l.key, { amount: Number(e.target.value.replace(/[^\d.]/g, '')) || 0 })} />
                      <select className={field} aria-label="Billing" value={l.yearly ? 'y' : 'm'} onChange={(e) => update(l.key, { yearly: e.target.value === 'y' })}>
                        <option value="m">a month</option>
                        <option value="y">a year</option>
                      </select>
                    </>
                  )}
                  <span className="w-24 shrink-0 text-right text-sm font-medium tabular-nums">{money(costs[i].monthly)}/mo</span>
                  <button type="button" className="shrink-0 rounded p-1 text-faint hover:text-foreground" aria-label="Remove" onClick={() => setLines((all) => all.filter((x) => x.key !== l.key))}>
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="mt-8 border-t border-border pt-8" aria-live="polite">
            <p className="font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl">
              Your stack costs {money(monthly)} a month, {money(monthly * 12)} a year
            </p>
            <p className="mt-2 text-muted-foreground">
              {[
                team > 0 ? `That is ${money(monthly / team)} a month per person.` : '',
                lines.length >= 4 && topShare > 0 ? `Your 3 biggest tools are ${Math.round(topShare * 100)}% of it.` : '',
                saving > 0 ? `Paying yearly where it is offered would save about ${money(saving)} a year.` : '',
              ]
                .filter(Boolean)
                .join(' ')}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                People on the team
                <input type="number" min={0} max={10000} className={`${field} w-20`} value={team || ''} placeholder="0" onChange={(e) => setTeam(Math.max(0, Number(e.target.value) || 0))} />
              </label>
              <Button variant="outline" size="sm" onClick={share}>
                {copied ? <Check className="h-4 w-4" aria-hidden /> : <Link2 className="h-4 w-4" aria-hidden />}
                {copied ? 'Link copied' : 'Copy a link to this stack'}
              </Button>
            </div>
            <p className="mt-3 text-xs text-faint">List prices in USD from each vendor’s pricing page, checked {PRICES_CHECKED}. Taxes and discounts not included.</p>

            <Findings
              title={insight.savingsYear >= 12 ? `What we found · up to ${money(insight.savingsYear)} a year to look at` : 'What we found'}
              findings={insight.findings}
            />

            <SendToSubly
              title="Keep this stack current, and hear before each renewal."
              body={`Subly tells the owner of each tool before it renews or goes up in price, and finds new ones whenever you upload a statement or connect a bank. Your ${lines.length} ${lines.length === 1 ? 'tool comes' : 'tools come'} with you.`}
              button="Track it in Subly"
              onSend={sendStack}
              sending={sending}
              keep={
                <AnchorButton variant="ghost" href={`/tools/runway-calculator#software=${Math.round(monthly)}`} onClick={() => send('tool_chain', { tool: 'stack', to: 'runway' })}>
                  <Timer className="h-4 w-4" aria-hidden /> See what it does to your runway
                </AnchorButton>
              }
              preview={
                <SublyPreview
                  total={`${money(monthly)}/mo`}
                  rowsTitle="Your tools, biggest first"
                  signals={insight.signals}
                  rows={ranked.filter((r) => r.monthly > 0).map((r) => ({ name: lineName(r.line), amount: `${money(r.monthly)}/mo`, website: lineSite(r.line) }))}
                />
              }
            />
          </div>
        </>
      )}
    </div>
  )
}
