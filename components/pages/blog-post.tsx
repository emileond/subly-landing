import { ArrowRight, ChevronDown, ChevronRight, Clock, ListChecks } from 'lucide-react'
import { PostCard } from '@/components/blog/post-card'
import { Markdown } from '@/components/site/markdown'
import { Container } from '@/components/ui/section'
import { AnchorButton } from '@/components/ui/button'
import type { Author } from '@/lib/authors'
import { type Category, type Post, formatDate } from '@/lib/content'
import { SIGNUP_URL } from '@/lib/site'

/** The small call to action beside the article, matched to its topic */
const SIDE_CTA: Record<Category, { title: string; body: string }> = {
  Subscriptions: { title: 'Find what you still pay for', body: 'Upload one statement. Subly lists every recurring charge and what it costs a year.' },
  'Cash flow': { title: 'See the next 13 weeks', body: 'Money in next to money out, with the renewals and retainers that move your balance.' },
  Teams: { title: 'Give every tool an owner', body: 'Renewals reach the person who can decide, in Slack, Teams or email.' },
  'Lifetime deals': { title: 'Never miss a refund window', body: 'Import your AppSumo export and see the days left on every deal.' },
  'AI and agents': { title: 'Ask Claude about your money', body: 'Connect Subly and ask what renews, where it goes and who owns it.' },
  Product: { title: 'See the whole picture', body: 'Everything that repeats, in and out, in one place that stays current.' },
}

function Toc({ post, mobile = false }: { post: Post; mobile?: boolean }) {
  const links = (
    <ol className="blog-toc mt-3 space-y-0.5 border-l border-border text-[0.9375rem]">
      {post.headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 pr-2 leading-snug text-muted-foreground transition-colors hover:text-foreground"
          >
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  )
  if (!mobile) {
    return (
      <nav aria-label="In this article">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-faint">In this article</p>
        {links}
      </nav>
    )
  }
  return (
    <details className="group mb-8 rounded-2xl border border-border bg-card lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-semibold [&::-webkit-details-marker]:hidden">
        In this article
        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <nav aria-label="In this article" className="px-5 pb-4">
        {links}
      </nav>
    </details>
  )
}

export default function BlogPost({ post, author, related }: { post: Post; author: Author; related: Post[] }) {
  const side = SIDE_CTA[post.category]
  const updated = post.updatedAt && post.updatedAt.slice(0, 10) !== post.publishedAt.slice(0, 10) ? post.updatedAt : undefined

  return (
    <article>
      <header className="hero-glow border-b border-border">
        <Container className="pb-10 pt-8 sm:pb-14 sm:pt-12">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-foreground">
                  Home
                </a>
              </li>
              <ChevronRight className="h-3.5 w-3.5 text-faint" aria-hidden="true" />
              <li>
                <a href="/blog" className="hover:text-foreground">
                  Blog
                </a>
              </li>
              <ChevronRight className="h-3.5 w-3.5 text-faint" aria-hidden="true" />
              <li className="font-medium text-foreground">{post.category}</li>
            </ol>
          </nav>
          <div className="mt-6 max-w-3xl">
            <h1 className="font-display text-[2.25rem] font-bold leading-[1.08] tracking-tight text-balance sm:text-5xl">{post.title}</h1>
            {post.lede && <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">{post.lede}</p>}
            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2.5">
                <img src={author.avatar} alt="" width={32} height={32} className="h-8 w-8 rounded-full border border-border" />
                <span>
                  <span className="font-medium text-foreground">{author.name}</span>
                  <span className="text-faint"> · {author.role}</span>
                </span>
              </span>
              <span>
                {updated ? 'Updated ' : 'Published '}
                <time dateTime={updated ?? post.publishedAt}>{formatDate(updated ?? post.publishedAt)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-faint" aria-hidden="true" />
                {post.readingMinutes} min read
              </span>
            </div>
          </div>
        </Container>
      </header>

      <Container className="grid gap-12 py-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_15.5rem] xl:gap-16">
        <div className="min-w-0 max-w-[44rem]">
          {post.headings.length > 2 && <Toc post={post} mobile />}

          {post.summary.length > 0 && (
            <section aria-labelledby="in-short" className="mb-10 rounded-2xl border border-border bg-secondary/60 p-6 sm:p-7">
              <h2 id="in-short" className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight">
                <ListChecks className="h-5 w-5 text-brand-ink" aria-hidden="true" />
                In short
              </h2>
              <ul className="mt-4 space-y-3 text-[1.0625rem] leading-relaxed">
                {post.summary.map((s) => (
                  <li key={s} className="flex gap-3">
                    <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <Markdown className="blog-body">{post.content}</Markdown>

          {post.faq.length > 0 && (
            <section aria-labelledby="questions" className="mt-16">
              <h2 id="questions" className="font-display text-[1.75rem] font-bold tracking-tight">
                Questions people ask
              </h2>
              <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
                {post.faq.map((f) => (
                  <details key={f.q} className="group px-5 sm:px-6">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-[1.0625rem] font-semibold leading-snug [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <p className="pb-5 text-[1.0625rem] leading-relaxed text-muted-foreground">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <aside className="hero-glow relative mt-14 overflow-hidden rounded-3xl border border-border bg-card p-7 sm:p-9">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-brand-ink">Try it on your numbers</p>
            <h2 className="mt-3 max-w-xl font-display text-[1.75rem] font-bold leading-[1.15] tracking-tight text-balance">{post.cta.title}</h2>
            <p className="mt-3 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground">{post.cta.body}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <AnchorButton href={SIGNUP_URL} data-cta="blog-end" size="lg">
                {post.cta.button} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </AnchorButton>
              <AnchorButton href="/pricing" variant="outline" size="lg">
                See pricing
              </AnchorButton>
            </div>
            <p className="mt-4 text-sm text-faint">14 days of the full Business plan, no credit card needed. The Free plan is yours to keep.</p>
          </aside>

          <aside aria-label="About the author" className="mt-6 flex flex-col gap-5 rounded-3xl border border-border bg-secondary/50 p-6 sm:flex-row sm:p-7">
            <img src={author.avatar} alt="" width={72} height={72} loading="lazy" className="h-[72px] w-[72px] shrink-0 rounded-full border border-border" />
            <div>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-faint">Written by</p>
              <p className="mt-1 font-display text-xl font-bold tracking-tight">{author.name}</p>
              <p className="text-sm text-muted-foreground">{author.role}</p>
              <p className="mt-3 leading-relaxed text-muted-foreground">{author.bio}</p>
              <p className="mt-3 text-sm">
                <a href="/manifesto" className="font-medium underline decoration-border underline-offset-4 hover:decoration-brand">
                  Why we build Subly
                </a>
              </p>
            </div>
          </aside>

          <p className="mt-6 text-sm leading-relaxed text-faint">
            {updated && (
              <>
                First published <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>, updated{' '}
                <time dateTime={updated}>{formatDate(updated)}</time>.{' '}
              </>
            )}
            This article is general information, not financial, tax or legal advice.
          </p>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            {post.headings.length > 0 && <Toc post={post} />}
            <div className="rounded-2xl border border-border bg-secondary/60 p-5">
              <p className="font-display text-lg font-bold leading-snug tracking-tight">{side.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{side.body}</p>
              <AnchorButton href={SIGNUP_URL} data-cta="blog-sidebar" size="sm" className="mt-4 w-full">
                Start free trial
              </AnchorButton>
              <p className="mt-2 text-center text-xs text-faint">14 days free, no card</p>
            </div>
          </div>
        </aside>
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="keep-reading" className="border-t border-border bg-secondary/50">
          <Container className="py-14 sm:py-20">
            <div className="flex items-end justify-between gap-4">
              <h2 id="keep-reading" className="font-display text-3xl font-bold tracking-tight">
                Keep reading
              </h2>
              <a href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                All posts →
              </a>
            </div>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </article>
  )
}
