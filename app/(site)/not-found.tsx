import { LinkButton } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:py-32">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-brand-ink">404</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">That page is not here.</h1>
      <p className="mt-3 text-muted-foreground">It may have moved. Head back home and pick up from there.</p>
      <LinkButton href="/" size="lg" className="mt-8">
        Go home
      </LinkButton>
    </div>
  )
}
