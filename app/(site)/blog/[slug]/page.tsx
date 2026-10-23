import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Markdown } from '@/components/site/markdown'
import { Narrow } from '@/components/site/page-header'
import { AnchorButton } from '@/components/ui/button'
import { formatDate, getPost, getPosts } from '@/lib/content'
import { pageMetadata } from '@/lib/seo'
import { SIGNUP_URL, absoluteUrl } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return pageMetadata({
    title: post.title,
    description: post.description || 'From the Subly blog.',
    path: `/blog/${slug}`,
    type: 'article',
    publishedTime: post.publishedAt,
  })
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const minutes = `${Math.max(1, Math.round(post.content.split(/\s+/).length / 220))} min read`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.publishedAt,
    author: post.author?.name ? { '@type': 'Person', name: post.author.name } : undefined,
    image: post.coverImage ? absoluteUrl(post.coverImage) : undefined,
    mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
  }

  return (
    <article className="pb-20 pt-8 sm:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Narrow>
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to blog
        </Link>

        <header className="mt-6">
          {post.tags[0] && (
            <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand-ink">{post.tags[0].label}</span>
          )}
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl">{post.title}</h1>
          <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
            {post.author?.picture && (
              <Image src={post.author.picture} alt="" width={32} height={32} className="rounded-full" />
            )}
            <span>{post.author?.name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{minutes}</span>
          </div>
        </header>

        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt=""
            width={900}
            height={450}
            priority
            sizes="(min-width: 768px) 720px, 100vw"
            className="mt-8 h-auto w-full rounded-2xl border border-border"
          />
        )}

        <Markdown className="mt-8 sm:prose-lg">{post.content}</Markdown>

        <aside className="mt-14 rounded-2xl border border-border bg-card p-6 text-center sm:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-balance">
            {post.ctaHeadline || 'Know what you pay for, and what needs you this week.'}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {post.ctaText || 'Upload one statement and see your recurring money in a couple of minutes.'}
          </p>
          <AnchorButton href={SIGNUP_URL} size="lg" className="mt-6">
            {post.ctaButtonLabel || 'Start free'}
          </AnchorButton>
        </aside>
      </Narrow>
    </article>
  )
}
