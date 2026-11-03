'use client'

import { Check, ChevronRight, Copy, Download, RotateCcw } from 'lucide-react'
import { type CSSProperties, type ReactNode, useState } from 'react'
import { Avatar } from '@/components/home/avatar'
import { ClaudeMark, ServiceLogo } from '@/components/home/mock'
import { Play } from '@/components/home/motion'

/**
 * Dark, fixed colours on purpose: this lives inside the always-dark agents section.
 * Tool names and arguments follow the real Subly connector.
 */

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

type Step =
  | { kind: 'user'; at: number; text: string }
  | { kind: 'assistant'; at: number; body: (at: number) => ReactNode }
  | { kind: 'tool'; at: number; name: string; args: string; result: string }

type Scenario = { id: string; label: string; steps: Step[] }

const Strong = ({ children }: { children: ReactNode }) => (
  <strong className="font-mono font-semibold tabular-nums text-white">{children}</strong>
)

const Panel = ({ children, className = '', at = 0 }: { children: ReactNode; className?: string; at?: number }) => (
  <div className={`anim-rise rounded-xl border border-white/10 bg-black/30 p-3.5 ${className}`} style={d(at)}>
    {children}
  </div>
)

const Label = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/40">{children}</p>
)

const Chip = ({ children, primary = false, at = 0 }: { children: ReactNode; primary?: boolean; at?: number }) => (
  <span
    className={`anim-pop inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
      primary ? 'border-[#8c78ff] bg-[#8c78ff]/25 text-white' : 'border-white/15 bg-white/[0.05] text-white/75'
    }`}
    style={d(at)}
  >
    {children}
  </span>
)

/* ---------- Visual outputs ---------- */

function RenewalTimeline({ at }: { at: number }) {
  const items = [
    { logo: 'adobecc', name: 'Adobe', date: 'Nov 5', amount: '$720', owner: null },
    { logo: 'webflow', name: 'Webflow', date: 'Nov 21', amount: '$168', owner: null },
    { logo: 'figma', name: 'Figma', date: 'Dec 2', amount: '$180', owner: 'Sam' },
    { logo: 'zoom', name: 'Zoom', date: 'Dec 9', amount: '$192', owner: 'Dana' },
  ]
  return (
    <Panel at={at}>
      <div className="flex items-baseline justify-between">
        <Label>Next 66 days</Label>
        <p className="font-mono text-xs text-white/50">
          <span className="text-white">$1,260</span> total
        </p>
      </div>
      <div className="relative mt-4">
        <span aria-hidden="true" className="anim-grow absolute left-0 right-0 top-[5px] h-px bg-white/15" style={d(at + 200)} />
        <ul className="relative grid grid-cols-4 gap-2">
          {items.map((it, i) => (
            <li key={it.name} className="anim-rise flex flex-col items-center text-center" style={d(at + 300 + i * 220)}>
              <span className="h-[11px] w-[11px] rounded-full border-2 border-[#101014] bg-[#a898ff]" />
              <span className="mt-1.5 font-mono text-[10px] text-white/50">{it.date}</span>
              <ServiceLogo logo={it.logo} className="mt-2 h-9 w-9" />
              <span className="mt-1.5 text-xs text-white/85">{it.name}</span>
              <span className="font-mono text-xs tabular-nums text-white">{it.amount}</span>
              <span
                className={`mt-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  it.owner ? 'bg-white/10 text-white/70' : 'bg-[#f5b454]/15 text-[#f5b454]'
                }`}
              >
                {it.owner ?? 'No owner'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  )
}

function SpendBreakdown({ at }: { at: number }) {
  const rows = [
    { name: 'Software', v: 1412, p: 41, c: '#8c78ff' },
    { name: 'Hosting and infrastructure', v: 720, p: 21, c: '#a898ff' },
    { name: 'Marketing', v: 598, p: 18, c: '#c9bfff' },
    { name: 'Insurance and legal', v: 410, p: 12, c: 'rgba(255,255,255,0.45)' },
    { name: 'Everything else', v: 280, p: 8, c: 'rgba(255,255,255,0.2)' },
  ]
  return (
    <Panel at={at}>
      <div className="flex items-baseline justify-between">
        <Label>Money out · per month</Label>
        <p className="font-mono text-xs text-white/50">
          <span className="text-white">$3,420</span>
        </p>
      </div>
      <div className="mt-3 flex h-3 gap-0.5 overflow-hidden rounded-full">
        {rows.map((r, i) => (
          <span key={r.name} className="anim-grow h-full" style={{ ...d(at + 300 + i * 140), width: `${r.p}%`, background: r.c }} />
        ))}
      </div>
      <ul className="mt-3.5 space-y-2 text-xs sm:text-[13px]">
        {rows.map((r, i) => (
          <li key={r.name} className="anim-rise flex items-center gap-2.5" style={d(at + 500 + i * 140)}>
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: r.c }} />
            <span className="flex-1 text-white/85">{r.name}</span>
            <span className="font-mono tabular-nums text-white/50">{r.p}%</span>
            <span className="w-14 text-right font-mono tabular-nums text-white">${r.v.toLocaleString('en-US')}</span>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

function NewItemCard({ at, added = false }: { at: number; added?: boolean }) {
  return (
    <Panel at={at}>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#8c78ff]/25 font-display text-sm font-bold text-[#c9bfff]">Li</span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-white">Linear</p>
          <p className="text-xs text-white/50">6 seats × $8 · Software · next charge Nov 12</p>
        </div>
        <p className="text-right font-mono text-base tabular-nums text-white">
          $48<span className="text-xs text-white/50"> /mo</span>
        </p>
      </div>
      {added ? (
        <div className="mt-3.5 border-t border-white/10 pt-3">
          <p className="flex items-center gap-2 text-xs text-[#4ade80]">
            <Check className="h-3.5 w-3.5" strokeWidth={3} /> Added to Subly · $576 a year
          </p>
          <div className="mt-3 space-y-1.5 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-16 text-white/50">Software</span>
              <span className="h-2 flex-1 rounded-full bg-white/10">
                <span className="relative block h-full rounded-full bg-white/40" style={{ width: '90%' }}>
                  <span className="anim-grow absolute inset-y-0 right-0 w-[2.2%] min-w-[6px] rounded-r-full bg-[#8c78ff]" style={d(at + 400)} />
                </span>
              </span>
              <span className="font-mono tabular-nums text-white/60">$2,184</span>
              <span className="anim-fade font-mono tabular-nums text-white" style={d(at + 900)}>
                → $2,232
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3.5 flex gap-2 border-t border-white/10 pt-3">
          <Chip primary at={at + 400}>Add it</Chip>
          <Chip at={at + 500}>Change something</Chip>
        </div>
      )}
    </Panel>
  )
}

function OwnerCard({ at, assigned = false }: { at: number; assigned?: boolean }) {
  return (
    <Panel at={at}>
      <div className="flex items-center gap-3">
        <ServiceLogo logo="webflow" className="h-10 w-10" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-white">Webflow</p>
          <p className="text-xs text-white/50">$168 a year · renews Nov 21</p>
        </div>
        {assigned ? (
          <span className="anim-pop flex items-center gap-2 rounded-full bg-white/10 py-1 pl-1 pr-3 text-xs text-white" style={d(at + 300)}>
            <Avatar seed="dana@oakline.studio" size="sm" /> Dana
          </span>
        ) : (
          <span className="rounded-full bg-[#f5b454]/15 px-2.5 py-1 text-xs font-medium text-[#f5b454]">No owner</span>
        )}
      </div>
      {assigned && (
        <div className="anim-fade mt-3.5 flex flex-wrap items-center gap-2 border-t border-white/10 pt-3 text-xs text-white/60" style={d(at + 700)}>
          <Check className="h-3.5 w-3.5 text-[#4ade80]" strokeWidth={3} /> Reminders go to Dana:
          <span className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-white/80">Nov 14</span>
          <span className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-white/80">Nov 20</span>
        </div>
      )}
    </Panel>
  )
}

function MonthReport({ at }: { at: number }) {
  const months = [
    { m: 'Aug', i: 5200, o: 3380 },
    { m: 'Sep', i: 5640, o: 3410 },
    { m: 'Oct', i: 5980, o: 3420 },
  ]
  const max = 6000
  return (
    <Panel at={at}>
      <div className="flex items-baseline justify-between">
        <Label>October 2026</Label>
        <p className="font-mono text-xs text-white/50">
          Left over <span className="text-white">$2,560</span>
        </p>
      </div>
      <div className="mt-3 grid grid-cols-[1fr_auto] items-end gap-4">
        <div className="grid grid-cols-3 gap-3">
          {months.map((x, i) => (
            <div key={x.m} className="text-center">
              <div className="flex h-20 items-end justify-center gap-1.5">
                <span className="anim-grow w-4 rounded-t bg-[#4ade80]/80" style={{ ...d(at + 300 + i * 150), height: `${(x.i / max) * 100}%`, transformOrigin: 'bottom', animationName: 'grow-y' }} />
                <span className="anim-grow w-4 rounded-t bg-white/40" style={{ ...d(at + 400 + i * 150), height: `${(x.o / max) * 100}%`, transformOrigin: 'bottom', animationName: 'grow-y' }} />
              </div>
              <p className="mt-1.5 font-mono text-[10px] text-white/50">{x.m}</p>
            </div>
          ))}
        </div>
        <ul className="space-y-1 pb-5 text-[11px] text-white/60">
          <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#4ade80]/80" /> In $5,980</li>
          <li className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-white/40" /> Out $3,420</li>
        </ul>
      </div>
      <ul className="mt-3 divide-y divide-white/10 border-t border-white/10 text-xs sm:text-[13px]">
        {[
          ['Notion Plus went up 20%', '+$24 a year'],
          ['Krisp was added', '+$14.99 a month'],
          ['Hulu was cancelled', '−$17.99 a month'],
        ].map(([a, b], i) => (
          <li key={a} className="anim-rise flex justify-between gap-3 py-2" style={d(at + 800 + i * 160)}>
            <span className="text-white/80">{a}</span>
            <span className="font-mono tabular-nums text-white">{b}</span>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

/* ---------- Scenarios ---------- */

const scenarios: Scenario[] = [
  {
    id: 'renewals',
    label: 'What renews this quarter?',
    steps: [
      { kind: 'user', at: 300, text: 'Which of our tools renew before the end of the year, and who owns each one?' },
      { kind: 'tool', at: 1100, name: 'upcoming_charges', args: '{ "days": 66, "direction": "out" }', result: '4 charges · $1,260 · 2 without an owner' },
      {
        kind: 'assistant',
        at: 2400,
        body: (at) => (
          <div className="space-y-3">
            <p>
              Four renewals before Dec 31, <Strong>$1,260</Strong> in total. Two of them have no owner.
            </p>
            <RenewalTimeline at={at + 300} />
            <div className="flex flex-wrap gap-2">
              <Chip primary at={at + 1700}>Ask #ops who should own them</Chip>
              <Chip at={at + 1800}>Assign both to me</Chip>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'spend',
    label: 'Where does our money go?',
    steps: [
      { kind: 'user', at: 300, text: 'Where does our money go each month?' },
      { kind: 'tool', at: 1100, name: 'spending_totals', args: '{ "direction": "out", "by_category": true }', result: '5 categories · $3,420 a month' },
      {
        kind: 'assistant',
        at: 2400,
        body: (at) => (
          <div className="space-y-3">
            <p>
              You spend <Strong>$3,420 a month</Strong>. Software is the biggest slice, and it is up 4% since August.
            </p>
            <SpendBreakdown at={at + 300} />
            <div className="flex flex-wrap gap-2">
              <Chip primary at={at + 1900}>Show the 14 software items</Chip>
              <Chip at={at + 2000}>Which ones overlap?</Chip>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    id: 'add',
    label: 'Add Linear, 6 seats at $8',
    steps: [
      { kind: 'user', at: 300, text: 'Add Linear: 6 seats at $8 a month, first charge Nov 12.' },
      {
        kind: 'assistant',
        at: 1100,
        body: (at) => (
          <div className="space-y-3">
            <p>Here is what I will add. Look right?</p>
            <NewItemCard at={at + 300} />
          </div>
        ),
      },
      { kind: 'user', at: 3000, text: 'Yes, go ahead.' },
      {
        kind: 'tool',
        at: 3700,
        name: 'add_item',
        args: '{ "name": "Linear", "amount": 48, "period": "month", "next_charge_date": "2026-11-12", "category": "Software" }',
        result: 'Added · $576 a year',
      },
      {
        kind: 'assistant',
        at: 5000,
        body: (at) => (
          <div className="space-y-3">
            <p>
              Done. Your software spend is now <Strong>$2,232 a month</Strong>.
            </p>
            <NewItemCard at={at + 300} added />
          </div>
        ),
      },
    ],
  },
  {
    id: 'owner',
    label: 'Who owns Webflow?',
    steps: [
      { kind: 'user', at: 300, text: 'Who owns Webflow? If nobody does, give it to Dana.' },
      { kind: 'tool', at: 1100, name: 'find_items', args: '{ "query": "webflow", "direction": "out" }', result: 'Webflow · $168 a year · renews Nov 21 · no owner' },
      {
        kind: 'assistant',
        at: 2400,
        body: (at) => (
          <div className="space-y-3">
            <p>Nobody owns it yet, and it renews on Nov 21. Assigning it to Dana.</p>
            <OwnerCard at={at + 300} />
          </div>
        ),
      },
      { kind: 'tool', at: 3800, name: 'assign_owner', args: '{ "item": "Webflow", "owner_email": "dana@oakline.studio" }', result: 'Dana now owns Webflow' },
      {
        kind: 'assistant',
        at: 5100,
        body: (at) => (
          <div className="space-y-3">
            <p>Done. Dana owns Webflow and gets its reminders.</p>
            <OwnerCard at={at + 300} assigned />
          </div>
        ),
      },
    ],
  },
  {
    id: 'summary',
    label: 'Summarise October',
    steps: [
      { kind: 'user', at: 300, text: 'Summarise October for my accountant.' },
      { kind: 'tool', at: 1100, name: 'monthly_summary', args: '{ "month": "2026-10" }', result: 'Out $3,420 · In $5,980 · 3 changes' },
      {
        kind: 'assistant',
        at: 2400,
        body: (at) => (
          <div className="space-y-3">
            <p>
              Money in grew for the third month running. About <Strong>$2,560</Strong> was left over after costs.
            </p>
            <MonthReport at={at + 300} />
            <div className="flex flex-wrap gap-2">
              <Chip primary at={at + 2000}>
                <Copy className="h-3 w-3" /> Draft the email
              </Chip>
              <Chip at={at + 2100}>
                <Download className="h-3 w-3" /> Export as PDF
              </Chip>
            </div>
          </div>
        ),
      },
    ],
  },
]

function ToolCall({ step, open, onToggle }: { step: Extract<Step, { kind: 'tool' }>; open: boolean; onToggle: () => void }) {
  return (
    <div className="anim-rise grid justify-items-start gap-2" style={d(step.at)}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-left font-mono text-[11.5px] text-white/60 transition-colors hover:border-[#8c78ff]/60 hover:text-white"
      >
        <span className="relative grid h-3.5 w-3.5 place-items-center">
          <span
            className="absolute inset-0 animate-spin rounded-full border border-white/25 border-t-[#a898ff]"
            style={{ animationDuration: '0.9s', animationIterationCount: 2, animationDelay: `${step.at}ms` }}
          />
          <span className="anim-fade grid h-3.5 w-3.5 place-items-center rounded-full bg-[#4ade80] text-black" style={d(step.at + 1100)}>
            <Check className="h-2.5 w-2.5" strokeWidth={3} />
          </span>
        </span>
        Used Subly · {step.name}
        <ChevronRight className={`h-3 w-3 transition-transform ${open ? 'rotate-90' : ''}`} aria-hidden="true" />
        <span className="sr-only">{open ? 'Hide' : 'Show'} what the agent sent</span>
      </button>
      {open && (
        <div className="w-full max-w-full overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-[11.5px] leading-relaxed">
          <p className="text-white/40">→ tools/call</p>
          <p className="text-[#a898ff]">{step.name}</p>
          <p className="whitespace-pre-wrap break-all text-white/80">{step.args}</p>
          <p className="mt-2 text-white/40">← result</p>
          <p className="text-[#4ade80]">{step.result}</p>
        </div>
      )}
    </div>
  )
}

export function AgentDemo() {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [run, setRun] = useState(0)
  const [openTool, setOpenTool] = useState<number | null>(null)
  const scenario = scenarios[scenarioIndex]

  const choose = (i: number) => {
    setScenarioIndex(i)
    setRun((r) => r + 1)
    setOpenTool(null)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div role="tablist" aria-label="Try an example" className="mb-5 flex flex-wrap justify-center gap-2">
        {scenarios.map((s, i) => {
          const active = i === scenarioIndex
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => choose(i)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                active
                  ? 'border-[#8c78ff] bg-[#8c78ff]/20 text-white'
                  : 'border-white/10 bg-white/[0.04] text-white/70 hover:border-white/30 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          )
        })}
      </div>

      <div className="relative isolate">
        <div aria-hidden="true" className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-[#8c78ff]/20 blur-3xl" />
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#101014]">
          <div aria-hidden="true" className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#a898ff] to-transparent" />

          <div className="flex items-center gap-2.5 border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <ClaudeMark className="h-4 w-4" />
            <span className="text-sm font-medium text-white/85">Claude</span>
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" /> Subly connected
            </span>
          </div>

          <Play key={`${scenario.id}-${run}`}>
            <div className="grid min-h-[26rem] content-start gap-3.5 p-4 text-sm sm:p-6 sm:text-[15px]">
              {scenario.steps.map((step, i) => {
                if (step.kind === 'user') {
                  return (
                    <p key={i} className="anim-rise max-w-[88%] justify-self-end rounded-2xl rounded-br-md bg-[#8c78ff] px-4 py-2.5 text-white" style={d(step.at)}>
                      {step.text}
                    </p>
                  )
                }
                if (step.kind === 'tool') {
                  return <ToolCall key={i} step={step} open={openTool === i} onToggle={() => setOpenTool(openTool === i ? null : i)} />
                }
                return (
                  <div key={i} className="anim-rise flex gap-2.5" style={d(step.at)}>
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.05]">
                      <ClaudeMark className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1 leading-relaxed text-white/90">{step.body(step.at)}</div>
                  </div>
                )
              })}
            </div>
          </Play>

          <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-2.5 text-xs text-white/45">
            <span>Tap a tool call to see what your agent sent and got back.</span>
            <button
              type="button"
              onClick={() => choose(scenarioIndex)}
              className="inline-flex shrink-0 items-center gap-1.5 text-white/60 hover:text-white"
            >
              <RotateCcw className="h-3 w-3" aria-hidden="true" /> Replay
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
