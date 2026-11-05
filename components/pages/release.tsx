import { ArrowLeft } from 'lucide-react'
import { Markdown } from '@/components/site/markdown'
import { Narrow } from '@/components/site/page-header'
import { AnchorButton } from '@/components/ui/button'
import type { Release } from '@/lib/content'

export default function ReleasePage({ release: r }: { release: Release }) {

  return (
    <article className="pb-20 pt-8 sm:pt-12">
      <Narrow>
        <a href="/releases" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Changelog
        </a>
        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            {r.tags.map((t) => (
              <span key={t} className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand-ink">
                {t}
              </span>
            ))}
            <span className="font-mono text-xs text-faint">{r.date}</span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl">{r.title}</h1>
        </header>
        {r.cover && (
          <div className="relative mt-8 aspect-[2/1] overflow-hidden rounded-2xl border border-border bg-muted">
            <img src={`/release-notes/covers/${r.cover}`} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        )}
        <Markdown className="mt-8">{r.content}</Markdown>
        {r.ctaLink && (
          <AnchorButton href={r.ctaLink} target="_blank" rel="noopener noreferrer" size="lg" className="mt-8">
            {r.ctaText ?? 'Learn more'}
          </AnchorButton>
        )}
      </Narrow>
    </article>
  )
}
