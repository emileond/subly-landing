import type { ReactNode } from 'react'

export function Container({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

export function Section({
  id,
  className = '',
  children,
  tone = 'plain',
}: {
  id?: string
  className?: string
  children: ReactNode
  tone?: 'plain' | 'sunken'
}) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-20 lg:py-24 ${tone === 'sunken' ? 'border-y border-border bg-secondary/60' : ''} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  )
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-xs font-medium uppercase tracking-[0.08em] text-brand-ink ${className}`}>{children}</p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  as: Tag = 'h2',
}: {
  eyebrow?: string
  title: ReactNode
  lede?: ReactNode
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
}) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
      <Tag className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
        {title}
      </Tag>
      {lede && <p className="mt-4 text-base text-pretty text-muted-foreground sm:text-lg">{lede}</p>}
    </div>
  )
}

/** Violet highlight inside a headline */
export function Mark({ children }: { children: ReactNode }) {
  return <span className="text-brand-ink">{children}</span>
}
