import type { MetadataRoute } from 'next'
import dayjs from 'dayjs'
import { getPosts, getReleases } from '@/lib/content'
import { personaSlugs } from '@/lib/personas'
import { absoluteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: '/', priority: 1 },
    { path: '/pricing', priority: 0.9 },
    ...personaSlugs.map((s) => ({ path: `/for/${s}`, priority: 0.8 })),
    { path: '/blog', priority: 0.7 },
    { path: '/releases', priority: 0.7 },
    { path: '/currency-converter', priority: 0.6 },
    { path: '/roadmap', priority: 0.5 },
    { path: '/affiliates', priority: 0.5 },
    { path: '/manifesto', priority: 0.4 },
    { path: '/legal/privacy-policy', priority: 0.2 },
    { path: '/legal/terms', priority: 0.2 },
    { path: '/legal/cookie-policy', priority: 0.2 },
    { path: '/legal/acceptable-use', priority: 0.2 },
  ].map(({ path, priority }) => ({ url: absoluteUrl(path), priority }))

  const posts = getPosts().map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.publishedAt),
    priority: 0.6,
  }))
  const releases = getReleases().map((r) => ({
    url: absoluteUrl(`/releases/${r.slug}`),
    lastModified: dayjs(r.date).toDate(),
    priority: 0.4,
  }))

  return [...pages, ...posts, ...releases]
}
