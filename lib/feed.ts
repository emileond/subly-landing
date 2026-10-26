import dayjs from 'dayjs'
import { Feed } from 'feed'
import { getReleases } from '@/lib/content'
import { SITE_URL } from '@/lib/site'

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
