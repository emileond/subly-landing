import dayjs from 'dayjs'
import { getPosts, getReleases } from '@/lib/content'
import { PAGES } from '@/lib/pages'
import { personaSlugs, personas } from '@/lib/personas'
import type { PageMeta } from '@/lib/seo'
import { CHECKED_ISO, COMPARISONS, HUB } from '@/lib/compare'
import { PAGES_UPDATED } from '@/lib/site'
import { TOOLS } from '@/lib/tools'

export type Route = PageMeta & { priority: number; lastModified?: Date }

export const personaMeta = (slug: (typeof personaSlugs)[number]): PageMeta => {
  const p = personas[slug]
  return { title: p.metaTitle, description: p.metaDescription, path: `/for/${p.slug}`, ogTitle: p.ogTitle }
}

export const postMeta = (post: ReturnType<typeof getPosts>[number]): PageMeta => ({
  title: post.title,
  description: post.description || 'From the Subly blog.',
  path: `/blog/${post.slug}`,
  type: 'article',
  ogEyebrow: `Blog · ${post.category}`,
  publishedTime: post.publishedAt,
  modifiedTime: post.updatedAt,
})

export const releaseMeta = (r: ReturnType<typeof getReleases>[number]): PageMeta => ({
  title: r.title,
  description: r.description || 'A Subly release.',
  path: `/releases/${r.slug}`,
  type: 'article',
})

/** Every page on the site, in sitemap order. The sitemap and the Open Graph images are built from it. */
export function allRoutes(): Route[] {
  const fixed = Object.values(PAGES) as Route[]
  const at = (path: string) => fixed.findIndex((r) => r.path === path)
  const personaRoutes = personaSlugs.map((s) => ({ ...personaMeta(s), priority: 0.8 }))
  // Personas right after /agents, as the Next.js sitemap listed them
  const toolRoutes = Object.values(TOOLS).map((t) => ({ ...t.meta, priority: 0.8 }))
  const compareRoutes = [HUB.meta, ...COMPARISONS.map((c) => c.meta)].map((m) => ({ ...m, priority: 0.8 }))
  const ordered = [...fixed.slice(0, at('/agents') + 1), ...personaRoutes, ...fixed.slice(at('/agents') + 1, at('/tools') + 1), ...toolRoutes, ...compareRoutes, ...fixed.slice(at('/tools') + 1)]
  // Comparisons carry the day their facts were checked; the other product pages, the day their copy last changed
  const DATED = ['/', '/pricing', '/agents', '/about', '/tools']
  const pages = ordered.map((r) => {
    if (r.path.startsWith('/compare')) return { ...r, lastModified: new Date(`${CHECKED_ISO}T00:00:00Z`) }
    if (DATED.includes(r.path) || r.path.startsWith('/tools/') || r.path.startsWith('/for/')) return { ...r, lastModified: new Date(`${PAGES_UPDATED}T00:00:00Z`) }
    return r
  })

  const posts = getPosts().map((p) => ({ ...postMeta(p), priority: 0.6, lastModified: new Date(p.updatedAt ?? p.publishedAt) }))
  const releases = getReleases().map((r) => ({ ...releaseMeta(r), priority: 0.4, lastModified: dayjs(r.date).toDate() }))
  return [...pages, ...posts, ...releases]
}
