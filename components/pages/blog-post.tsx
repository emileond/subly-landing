import { ArrowLeft } from 'lucide-react'
import { Markdown } from '@/components/site/markdown'
import { Narrow } from '@/components/site/page-header'
import { AnchorButton } from '@/components/ui/button'
import { type Post, formatDate } from '@/lib/content'
import { SIGNUP_URL, absoluteUrl } from '@/lib/site'

export default function BlogPost({ post }: { post: Post }) {
  const { slug } = post

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
        <a href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to blog
        </a>

        <header className="mt-6">
          {post.tags[0] && (
            <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand-ink">{post.tags[0].label}</span>
          )}
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl">{post.title}</h1>
          <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
            {post.author?.picture && (
              <img src={post.author.picture} alt="" width={32} height={32} className="rounded-full" />
            )}
            <span>{post.author?.name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{minutes}</span>
          </div>
        </header>

        {post.coverImage && (
          <img
            src={post.coverImage}
            alt=""
            width={900}
            height={450}
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
          <AnchorButton href={SIGNUP_URL} data-cta="blog-post" size="lg" className="mt-6">
            {post.ctaButtonLabel || 'Start free'}
          </AnchorButton>
        </aside>
      </Narrow>
    </article>
  )
}
