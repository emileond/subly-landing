import { PostCard } from '@/components/blog/post-card'
import { Container, Eyebrow } from '@/components/ui/section'
import { CATEGORIES, type Post } from '@/lib/content'

/**
 * The blog: the newest post large, then the rest. The category buttons filter the grid
 * (a small script in src/pages/blog.astro); without it every post shows.
 */
export default function BlogIndex({ posts }: { posts: Post[] }) {
  const [featured, ...rest] = posts
  const used = CATEGORIES.filter((c) => posts.some((p) => p.category === c))

  return (
    <>
      <header className="hero-glow border-b border-border">
        <Container className="py-12 sm:py-16">
          <div className="max-w-3xl">
            <Eyebrow className="mb-3">Blog</Eyebrow>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl">
              Guides for running your money with confidence
            </h1>
            <p className="mt-4 text-lg text-pretty text-muted-foreground">
              Practical, plain-words guides on subscriptions, renewals, cash flow and the tools small teams pay for. Use them with or without Subly.
            </p>
          </div>
        </Container>
      </header>

      <Container className="py-10 sm:py-14">
        {featured && <PostCard post={featured} featured eager />}

        {rest.length > 0 && (
          <>
            <div className="mt-12 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by topic">
              <button type="button" data-filter="all" aria-pressed="true" className="blog-filter">
                All topics
              </button>
              {used.map((c) => (
                <button key={c} type="button" data-filter={c} aria-pressed="false" className="blog-filter">
                  {c}
                </button>
              ))}
            </div>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-posts>
              {rest.map((p) => (
                <li key={p.slug} data-category={p.category}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </>
        )}
      </Container>
    </>
  )
}
