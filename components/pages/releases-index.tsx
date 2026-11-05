import { PageHeader } from '@/components/site/page-header'
import { Container } from '@/components/ui/section'
import type { Release } from '@/lib/content'

export default function ReleasesIndex({ releases }: { releases: Release[] }) {

  return (
    <>
      <PageHeader eyebrow="Changelog" title="What's new in Subly" lede="Features, improvements and fixes, newest first." />
      <Container className="max-w-3xl py-12 sm:py-16">
        <ol className="space-y-12">
          {releases.map((r) => (
            <li key={r.slug}>
              <a href={`/releases/${r.slug}`} className="group block">
                {r.cover && (
                  <div className="relative aspect-[2/1] overflow-hidden rounded-2xl border border-border bg-muted transition-shadow group-hover:shadow-lg">
                    <img src={`/release-notes/covers/${r.cover}`} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                )}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {r.tags.map((t) => (
                    <span key={t} className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand-ink">
                      {t}
                    </span>
                  ))}
                  <span className="font-mono text-xs text-faint">{r.date}</span>
                </div>
                <h2 className="mt-2 font-display text-2xl font-bold leading-snug tracking-tight group-hover:text-brand-ink">{r.title}</h2>
                {r.description && <p className="mt-2 line-clamp-2 text-muted-foreground">{r.description}</p>}
              </a>
            </li>
          ))}
        </ol>
      </Container>
    </>
  )
}
