import { Calculator } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { SendToSubly, SublyPreview } from '@/components/tools/report'
import { AnchorButton } from '@/components/ui/button'
import { logoUrl, sendToSubly } from '@/lib/handoff'
import { type Line, billedYearly, cost, encode, money, nextKey, perMonthPrice, usablePlans } from '@/lib/stack-link'
import { TEMPLATES, resolveTemplate } from '@/lib/stack-templates'
import { PRICES_CHECKED, type PricedTool } from '@/lib/tool-prices'
import { send } from '@/lib/tracking'

type Tier = 'lean' | 'standard'

/** The plan a tier picks: the cheapest paid plan for lean (or free, if that is all there is), the next one up for standard */
function pickPlan(tool: PricedTool, tier: Tier) {
  const plans = usablePlans(tool)
  const paid = plans.map((p, i) => ({ p, i })).filter(({ p }) => (p.price ?? p.yearlyPrice ?? 0) > 0)
  if (!paid.length) return 0
  if (tier === 'lean') return paid[0].i
  return (paid[1] ?? paid[0]).i
}

/**
 * Plan a stack for a kind of business: the jobs it needs software for, a common pick for each
 * (swappable), seats for the team, and what it all costs a month and a year. It opens in the
 * stack calculator for fine-tuning, or goes to Subly to be tracked from the first renewal.
 */
export function StackBuilder() {
  const [templateId, setTemplateId] = useState(TEMPLATES[0].id)
  const [team, setTeam] = useState(5)
  const [tier, setTier] = useState<Tier>('lean')
  const [extras, setExtras] = useState(false)
  const [choice, setChoice] = useState<Record<string, number>>({})
  const [sending, setSending] = useState(false)
  const started = useRef(false)

  const template = TEMPLATES.find((t) => t.id === templateId) ?? TEMPLATES[0]
  const needs = useMemo(() => resolveTemplate(template), [template])
  const shown = needs.filter((n) => extras || !n.optional)

  type ToolLine = Extract<Line, { id: string }> & { job: string; tool: PricedTool }
  const lines: ToolLine[] = shown.map((need) => {
    const tool = need.tools[choice[`${template.id}:${need.job}`] ?? 0] ?? need.tools[0]
    const plan = pickPlan(tool, tier)
    const perSeat = usablePlans(tool)[plan]?.perSeat
    return { key: nextKey(), id: tool.id, plan, seats: perSeat ? Math.max(1, team) : 1, yearly: tier === 'lean', job: need.job, tool }
  })
  const costs = lines.map(cost)
  const monthly = costs.reduce((sum, c) => sum + c.monthly, 0)

  useEffect(() => {
    if (started.current) return
    started.current = true
    send('tool_started', { tool: 'builder', how: 'open' })
  }, [])

  const calculatorHref = `/tools/stack-cost-calculator#s=${encode(lines, team)}`

  const sendStack = async () => {
    setSending(true)
    send('tool_result', { tool: 'builder', template: template.id })
    const items = lines
      .map((l) => {
        const plan = usablePlans(l.tool)[l.plan]
        if (!plan || !perMonthPrice(plan, l.yearly)) return null
        const yearly = billedYearly(plan, l.yearly)
        const seats = plan.perSeat ? l.seats : 1
        return {
          name: l.tool.name,
          amount: Math.round(perMonthPrice(plan, l.yearly) * (yearly ? 12 : 1) * seats * 100) / 100,
          cadence: (yearly ? 'year' : 'month') as 'year' | 'month',
          website: l.tool.website,
          category: l.tool.category,
          plan: plan.perSeat ? `${plan.name}, ${seats} ${seats === 1 ? 'seat' : 'seats'}` : plan.name,
        }
      })
      .filter((x): x is NonNullable<typeof x> => !!x)
    await sendToSubly('builder', items, { template: template.id, team })
    setSending(false)
  }

  const field = 'h-10 rounded-lg border border-input bg-card px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
      <fieldset>
        <legend className="font-display text-lg font-bold tracking-tight">What are you setting up?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => (
            <label key={t.id} className={`cursor-pointer rounded-xl border p-4 transition-colors ${t.id === template.id ? 'border-foreground bg-accent/40' : 'border-border hover:bg-accent/30'}`}>
              <input type="radio" name="template" value={t.id} checked={t.id === template.id} onChange={() => {
                  setTemplateId(t.id)
                  // Freelancing is a team of one; going back to a team keeps the size they set
                  if (t.id === 'freelancer') setTeam(1)
                  else if (template.id === 'freelancer') setTeam(5)
                }} className="sr-only" />
              <span className="font-medium">{t.label}</span>
              <span className="mt-1 block text-sm text-muted-foreground">{t.blurb}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">People on the team</span>
          <input type="number" min={1} max={500} className={`${field} w-24`} value={team} onChange={(e) => setTeam(Math.max(1, Math.min(500, Number(e.target.value) || 1)))} />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Plans</span>
          <select className={field} value={tier} onChange={(e) => setTier(e.target.value as Tier)}>
            <option value="lean">Lean: entry plans, billed yearly</option>
            <option value="standard">Standard: the next plan up, billed monthly</option>
          </select>
        </label>
        <label className="flex items-center gap-2 pb-2 text-sm">
          <input type="checkbox" checked={extras} onChange={(e) => setExtras(e.target.checked)} className="h-4 w-4 accent-[var(--color-brand)]" />
          Include the nice-to-haves
        </label>
      </div>

      <ul className="mt-6 divide-y divide-border rounded-xl border border-border">
        {lines.map((l, i) => {
          const need = shown[i]
          const plan = usablePlans(l.tool)[l.plan]
          return (
            <li key={need.job} className="flex flex-wrap items-center gap-3 px-4 py-3 sm:flex-nowrap">
              <img src={logoUrl(l.tool.website) ?? ''} alt="" width={28} height={28} loading="lazy" className="h-7 w-7 shrink-0 rounded-md border border-border" />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[11px] uppercase tracking-[0.05em] text-faint">{need.job}</p>
                {need.tools.length > 1 ? (
                  <select
                    className="mt-0.5 -ml-1 rounded bg-transparent font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`Tool for ${need.job}`}
                    value={need.tools.indexOf(l.tool)}
                    onChange={(e) => setChoice((c) => ({ ...c, [`${template.id}:${need.job}`]: Number(e.target.value) }))}
                  >
                    {need.tools.map((t, index) => (
                      <option key={t.id} value={index}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="font-medium">{l.tool.name}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  {plan?.name}
                  {plan?.perSeat ? `, ${l.seats} ${l.seats === 1 ? 'seat' : 'seats'}` : ''}
                  {plan && billedYearly(plan, l.yearly) ? ', billed yearly' : ''}
                </p>
              </div>
              <span className="shrink-0 text-right text-sm font-medium tabular-nums">{money(costs[i].monthly)}/mo</span>
            </li>
          )
        })}
      </ul>

      <div className="mt-8 border-t border-border pt-8" aria-live="polite">
        <p className="font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl">
          About {money(monthly)} a month, {money(monthly * 12)} a year
        </p>
        <p className="mt-2 text-muted-foreground">
          {money(monthly / team)} a month per person for {team} {team === 1 ? 'person' : 'people'}, at list prices. Swap any tool to compare, or open the stack in the calculator to fine-tune plans and seats.
        </p>
        <p className="mt-3 text-xs text-faint">
          Common choices for this kind of business, not endorsements; no vendor pays to be listed. List prices in USD from each vendor’s pricing page, checked {PRICES_CHECKED}.
        </p>
        <SendToSubly
          title="Start tracking it from the first renewal."
          body="Subly tells the owner of each tool before it renews or goes up in price, so the stack you set up today doesn’t quietly grow. These tools come with you, and you check them before anything is added."
          button="Track it in Subly"
          onSend={sendStack}
          sending={sending}
          keep={
            <AnchorButton href={calculatorHref} variant="ghost">
              <Calculator className="h-4 w-4" aria-hidden /> Fine-tune it in the calculator
            </AnchorButton>
          }
          preview={
            <SublyPreview
              total={`${money(monthly)}/mo`}
              rowsTitle="Your stack"
              signals={[...lines]
                .map((l, i) => ({ l, c: costs[i] }))
                .filter(({ c }) => c.monthly > 0)
                .sort((a, b) => b.c.monthly - a.c.monthly)
                .slice(0, 2)
                .map(({ l, c }) => ({ title: `Who owns ${l.tool.name}?`, body: `${money(c.monthly)} a month for ${l.job.toLowerCase()}. Its owner hears before each renewal.`, website: l.tool.website }))}
              rows={lines.map((l, i) => ({ name: l.tool.name, amount: `${money(costs[i].monthly)}/mo`, when: l.job, website: l.tool.website })).filter((_, i) => costs[i].monthly > 0)}
            />
          }
        />
      </div>
    </div>
  )
}
