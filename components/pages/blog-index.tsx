import { PageHeader } from '@/components/site/page-header'
import { Container } from '@/components/ui/section'
import { type Post, formatDate } from '@/lib/content'

export default function BlogIndex({ posts }: { posts: Post[] }) {

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notes on recurring money"
        lede="New features, what we learned building them, and plain tips for getting more out of your numbers."
      />
      <Container className="py-12 sm:py-16">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <li key={p.slug}>
              <a
                href={`/blog/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[2/1] bg-muted">
                  {p.coverImage && (
                    <img src={p.coverImage} alt="" loading={i === 0 ? 'eager' : 'lazy'} decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  {p.tags[0] && (
                    <span className="mb-3 w-fit rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-medium text-brand-ink">
                      {p.tags[0].label}
                    </span>
                  )}
                  <h2 className="font-display text-xl font-bold leading-snug tracking-tight group-hover:text-brand-ink">{p.title}</h2>
                  {p.description && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.description}</p>}
                  <p className="mt-auto pt-4 text-xs text-faint">{formatDate(p.publishedAt)}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}
