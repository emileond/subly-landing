import type { ReactNode } from 'react'
import { Container, Eyebrow } from '@/components/ui/section'

export function PageHeader({
  eyebrow,
  title,
  lede,
  className = '',
}: {
  eyebrow?: string
  title: ReactNode
  lede?: ReactNode
  className?: string
}) {
  return (
    <header className={`border-b border-border bg-secondary/40 py-12 sm:py-16 ${className}`}>
      <Container>
        <div className="max-w-3xl">
          {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl">{title}</h1>
          {lede && <p className="mt-4 text-lg text-pretty text-muted-foreground">{lede}</p>}
        </div>
      </Container>
    </header>
  )
}

export function Narrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-3xl px-4 sm:px-6 ${className}`}>{children}</div>
}
