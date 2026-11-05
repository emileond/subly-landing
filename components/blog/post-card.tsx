import { type Post, formatDate } from '@/lib/content'
import { ogImagePath } from '@/lib/seo'

/**
 * A post in a list: the post's Open Graph card as its cover (drawn at build time, so every
 * post has one in the same style), category, title, description and date.
 */
export function PostCard({ post, featured = false, eager = false }: { post: Post; featured?: boolean; eager?: boolean }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className={`group flex h-full overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg ${
        featured ? 'flex-col lg:grid lg:grid-cols-[1.15fr_1fr]' : 'flex-col'
      }`}
    >
      <div className="relative aspect-[1200/630] overflow-hidden bg-muted">
        <img
          src={ogImagePath(`/blog/${post.slug}`)}
          alt=""
          width={1200}
          height={630}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className={`flex flex-1 flex-col ${featured ? 'p-6 sm:p-8 lg:justify-center' : 'p-5'}`}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="rounded-full bg-brand-soft px-2.5 py-0.5 font-medium text-brand-ink">{post.category}</span>
          <span className="text-faint">{post.readingMinutes} min read</span>
        </p>
        <h3
          className={`mt-3 font-display font-bold leading-snug tracking-tight text-balance group-hover:text-brand-ink ${
            featured ? 'text-2xl sm:text-[2rem] sm:leading-[1.15]' : 'text-xl'
          }`}
        >
          {post.title}
        </h3>
        <p className={`mt-2 text-muted-foreground ${featured ? 'text-base sm:text-lg' : 'line-clamp-3 text-sm'}`}>{post.description}</p>
        <p className="mt-auto pt-4 text-xs text-faint">
          <time dateTime={post.updatedAt ?? post.publishedAt}>
            {post.updatedAt ? `Updated ${formatDate(post.updatedAt)}` : formatDate(post.publishedAt)}
          </time>
        </p>
      </div>
    </a>
  )
}
