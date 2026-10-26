import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Markdown } from '@/components/site/markdown'
import { Narrow } from '@/components/site/page-header'
import { AnchorButton } from '@/components/ui/button'
import { getRelease, getReleases } from '@/lib/content'
import { pageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getReleases().map((r) => ({ slug: r.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const r = getRelease(slug)
  if (!r) return {}
  return pageMetadata({
    title: r.title,
    description: r.description || 'A Subly release.',
    path: `/releases/${slug}`,
    type: 'article',
  })
}

export default async function ReleasePage({ params }: Props) {
  const { slug } = await params
  const r = getRelease(slug)
  if (!r) notFound()

  return (
    <article className="pb-20 pt-8 sm:pt-12">
      <Narrow>
        <Link href="/releases" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Changelog
        </Link>
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
            <Image src={`/release-notes/covers/${r.cover}`} alt="" fill priority sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
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
