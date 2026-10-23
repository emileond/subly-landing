import Image from 'next/image'
import type { ReactNode } from 'react'

/** Small pieces shared by the product mock-ups. Everything here is decorative HTML, not a screenshot. */

/**
 * A service's real logo (public/services), or a neutral initials tile when we
 * have none. The logos are the only colour in the lists.
 */
export function ServiceLogo({
  logo,
  abbr = '',
  className = 'h-8 w-8 text-xs',
}: {
  logo?: string
  abbr?: string
  className?: string
}) {
  if (logo) {
    return (
      <Image
        src={`/services/${logo}.png`}
        alt=""
        width={64}
        height={64}
        className={`shrink-0 rounded-lg border border-border bg-white object-cover ${className}`}
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-lg border border-border bg-muted font-semibold tracking-tight text-muted-foreground ${className}`}
    >
      {abbr}
    </span>
  )
}

type Tone = 'brand' | 'attention' | 'problem' | 'money' | 'neutral'

const tones: Record<Tone, string> = {
  brand: 'bg-brand-soft text-brand-ink',
  attention: 'bg-attention-soft text-attention',
  problem: 'bg-problem-soft text-problem',
  money: 'bg-money-in-soft text-money-in',
  neutral: 'bg-muted text-muted-foreground',
}

export function Pill({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium leading-4 ${tones[tone]}`}>
      {children}
    </span>
  )
}

/** A button that only looks like one: the mock-ups are not interactive. */
export function FakeButton({
  children,
  primary = false,
  className = '',
}: {
  children: ReactNode
  primary?: boolean
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium leading-4 ${
        primary ? 'border-primary bg-primary text-primary-foreground' : 'border-input bg-card text-foreground'
      } ${className}`}
    >
      {children}
    </span>
  )
}

export function WindowFrame({
  url,
  label,
  children,
  className = '',
}: {
  url: string
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`overflow-hidden rounded-2xl border border-input bg-card text-left shadow-[0_1px_0_var(--border),0_24px_48px_-28px_rgb(0_0_0/0.28)] ${className}`}
    >
      <div aria-hidden="true" className="flex h-8 items-center gap-1.5 border-b border-border bg-muted px-3">
        <i className="h-2 w-2 rounded-full bg-input" />
        <i className="h-2 w-2 rounded-full bg-input" />
        <i className="h-2 w-2 rounded-full bg-input" />
        <span className="ml-2 truncate font-mono text-[11px] text-faint">{url}</span>
      </div>
      <div aria-hidden="true">{children}</div>
    </div>
  )
}

/**
 * Digits stay in the foreground colour; direction is a small coloured glyph:
 * green + for money in, rose − for money out. Use it only where money in and
 * money out share a surface.
 */
export function Flow({ dir, children }: { dir: 'in' | 'out'; children: ReactNode }) {
  return (
    <span className="whitespace-nowrap">
      <span aria-hidden="true" className={`mr-px font-semibold ${dir === 'in' ? 'text-money-in' : 'text-problem'}`}>
        {dir === 'in' ? '+' : '−'}
      </span>
      {children}
    </span>
  )
}

export const money = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: n % 1 ? 2 : 0 })
