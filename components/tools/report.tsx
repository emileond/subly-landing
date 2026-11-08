import { AlertTriangle, ArrowRight, CalendarClock, Layers, Loader2, PiggyBank, TrendingUp, Users } from 'lucide-react'
import type { ReactNode } from 'react'
import { FakeButton, WindowFrame } from '@/components/home/mock'
import { LogoMark } from '@/components/site/logo'
import { Button } from '@/components/ui/button'
import { logoUrl } from '@/lib/handoff'

/**
 * The end of every free tool: what we found in the visitor's own numbers, something they keep
 * without signing up, and a look at those same items the way Subly shows them, right above the
 * button that carries them into Subly. The preview is HTML, like the home page mock-ups.
 */

export type FindingKind = 'save' | 'overlap' | 'soon' | 'rise' | 'people' | 'info'
export type Finding = { kind: FindingKind; title: string; body: string; /** Shown on the right, e.g. "$240 a year" */ amount?: string }

const ICONS: Record<FindingKind, typeof PiggyBank> = {
  save: PiggyBank,
  overlap: Layers,
  soon: CalendarClock,
  rise: TrendingUp,
  people: Users,
  info: AlertTriangle,
}

export function Findings({ title, findings }: { title: string; findings: Finding[] }) {
  if (!findings.length) return null
  return (
    <section aria-label={title} className="mt-8">
      <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-brand-ink">{title}</h3>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {findings.map((f) => {
          const Icon = ICONS[f.kind]
          const warn = f.kind === 'soon' || f.kind === 'rise'
          return (
            <li key={f.title} className="flex gap-3 rounded-xl border border-border bg-card p-4">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${warn ? 'bg-attention-soft text-attention' : 'bg-brand-soft text-brand-ink'}`}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-medium leading-snug">{f.title}</span>
                  {f.amount && <span className="shrink-0 text-sm font-semibold tabular-nums">{f.amount}</span>}
                </span>
                <span className="mt-1 block text-sm text-pretty text-muted-foreground">{f.body}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export type PreviewSignal = { title: string; body: string; website?: string | null; abbr?: string; tone?: 'attention' | 'neutral' }
export type PreviewRow = { name: string; amount: string; when?: string; website?: string | null; incoming?: boolean }

function Logo({ website, abbr = '', className = 'h-7 w-7' }: { website?: string | null; abbr?: string; className?: string }) {
  const src = logoUrl(website)
  if (src) return <img src={src} alt="" width={56} height={56} loading="lazy" className={`shrink-0 rounded-md border border-border bg-white object-cover ${className}`} />
  return <span className={`grid shrink-0 place-items-center rounded-md border border-border bg-muted text-[10px] font-semibold text-muted-foreground ${className}`}>{abbr.slice(0, 2)}</span>
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

/** The visitor's own items as Subly's Today screen would show them: what needs a decision, then the list */
export function SublyPreview({ signals, rows, total, rowsTitle = 'Coming up' }: { signals: PreviewSignal[]; rows: PreviewRow[]; total?: string; rowsTitle?: string }) {
  return (
    <WindowFrame url="web.subly.app/today" label="A mock-up of the Subly Today screen with the items you entered">
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-[13px] font-semibold">
            <LogoMark className="h-4 w-auto" />
            Today
          </span>
          {total && <span className="font-mono text-[11px] text-faint">{total}</span>}
        </div>
        {signals.length > 0 && (
          <>
            <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.06em] text-faint">
              Needs you <span className="ml-1 rounded-full bg-brand px-1.5 font-mono text-[10px] text-brand-foreground">{signals.length}</span>
            </p>
            <ul className="mt-2 space-y-2">
              {signals.slice(0, 3).map((s) => (
                <li key={s.title} className="rounded-lg border border-border bg-card p-3">
                  <div className="flex gap-3">
                    <Logo website={s.website} abbr={s.abbr ?? initials(s.title)} />
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-medium leading-snug">
                        {s.tone === 'attention' && <span className="mr-1.5 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-attention" />}
                        {s.title}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{s.body}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <FakeButton primary>Keep</FakeButton>
                        <FakeButton>Plan to cancel</FakeButton>
                        <FakeButton>Snooze</FakeButton>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        {rows.length > 0 && (
          <>
            <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.06em] text-faint">{rowsTitle}</p>
            <ul className="mt-1 divide-y divide-border">
              {rows.slice(0, 5).map((r) => (
                <li key={`${r.name}-${r.amount}`} className="flex items-center gap-3 py-2 text-[13px]">
                  <Logo website={r.website} abbr={initials(r.name)} className="h-6 w-6" />
                  <span className="min-w-0 flex-1 truncate">{r.name}</span>
                  {r.when && <span className="hidden text-xs text-faint sm:inline">{r.when}</span>}
                  <span className="w-24 text-right tabular-nums">
                    {r.incoming && <span className="mr-px font-semibold text-money-in">+</span>}
                    {r.amount}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </WindowFrame>
  )
}

/**
 * The preview and the button that sends the items to Subly, side by side on a wide screen.
 * `keep` is what the visitor can take away without signing up (a calendar file, a link).
 */
export function SendToSubly({
  title,
  body,
  button,
  onSend,
  sending,
  href,
  onHrefClick,
  preview,
  keep,
}: {
  title: string
  body: string
  button: string
  onSend?: () => void
  sending?: boolean
  href?: string
  onHrefClick?: () => void
  preview: ReactNode
  keep?: ReactNode
}) {
  return (
    <div className="mt-8 grid gap-6 rounded-2xl border border-border bg-secondary/60 p-5 sm:p-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      <div>
        <p className="font-display text-xl font-bold tracking-tight text-balance">{title}</p>
        <p className="mt-2 text-pretty text-muted-foreground">{body}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {href ? (
            <a href={href} onClick={onHrefClick} className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              {button} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : (
            <Button size="lg" onClick={onSend} disabled={sending}>
              {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
              {button} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          )}
          {keep}
        </div>
        <p className="mt-3 text-xs text-faint">Free plan, or 14 days of Business with no card. You check every item before it is added.</p>
      </div>
      <div className="min-w-0">{preview}</div>
    </div>
  )
}
