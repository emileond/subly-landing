import dayjs from 'dayjs'
import { Feed } from 'feed'
import { getPosts, getReleases } from '@/lib/content'
import { SITE_URL } from '@/lib/site'

/** The blog as a feed (/blog/feed.xml): feed readers, and crawlers that follow feeds to find new posts */
export function postsFeed() {
  const posts = getPosts()
  const feed = new Feed({
    title: 'Subly blog',
    description: 'Practical guides on subscriptions, renewals, cash flow and software spend for founders, freelancers and small teams.',
    id: `${SITE_URL}/blog`,
    link: `${SITE_URL}/blog`,
    image: `${SITE_URL}/icon.png`,
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Subly`,
    updated: posts.length ? new Date(posts[0].updatedAt ?? posts[0].publishedAt) : new Date(),
    feedLinks: { rss2: `${SITE_URL}/blog/feed.xml` },
    author: { name: 'Subly', email: 'hello@subly.app', link: SITE_URL },
  })
  for (const p of posts) {
    const url = `${SITE_URL}/blog/${p.slug}`
    feed.addItem({ title: p.title, id: url, link: url, description: p.description, date: new Date(p.publishedAt), category: [{ name: p.category }] })
  }
  return feed
}

export function releasesFeed() {
  const now = new Date()
  const feed = new Feed({
    title: 'Subly: product updates',
    description: 'New features, improvements and fixes in Subly.',
    id: SITE_URL,
    link: `${SITE_URL}/releases`,
    image: `${SITE_URL}/icon.png`,
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `All rights reserved ${now.getFullYear()}, Subly`,
    updated: now,
    generator: 'Feed for Node.js',
    feedLinks: { rss2: `${SITE_URL}/rss/feed.xml`, json: `${SITE_URL}/rss/feed.json` },
    author: { name: 'Subly', email: 'hello@subly.app', link: 'https://twitter.com/sublyweb' },
  })

  for (const r of getReleases()) {
    const url = `${SITE_URL}/releases/${r.slug}`
    feed.addItem({
      title: r.title,
      id: url,
      link: url,
      description: r.description,
      date: dayjs(r.date).toDate(),
      image: r.cover ? `${SITE_URL}/release-notes/covers/${r.cover}` : undefined,
    })
  }
  return feed
}
