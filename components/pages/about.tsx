import { PageHeader } from '@/components/site/page-header'
import { Container } from '@/components/ui/section'
import { ABOUT } from '@/lib/about'

const LINKS = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Subly next to other trackers', href: '/compare' },
  { label: 'Claude and agents', href: '/agents' },
  { label: 'Changelog', href: '/releases' },
  { label: 'Manifesto', href: '/manifesto' },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title={ABOUT.h1} lede={ABOUT.lede} />
      <Container className="grid gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="max-w-2xl space-y-10">
          {ABOUT.sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-2xl font-bold tracking-tight">{s.title}</h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="mt-3 text-pretty text-muted-foreground sm:text-lg">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
        <aside className="lg:pt-1">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-brand-ink">In short</h2>
            <dl className="mt-4 space-y-3 text-sm">
              {ABOUT.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-faint">{f.label}</dt>
                  <dd className="mt-0.5">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ul className="mt-6 space-y-2 text-sm">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </Container>
    </>
  )
}
