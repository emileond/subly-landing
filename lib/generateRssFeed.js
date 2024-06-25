import fs from 'fs'
import { Feed } from 'feed'
import dayjs from 'dayjs'

export default async function generateRssFeed(posts) {
  const siteURL = process.env.PUBLIC_CLIENT_URL
  const date = new Date()
  const author = {
    name: 'Subly',
    email: 'hello@subly.app',
    link: 'https://twitter.com/sublyweb',
  }

  const feed = new Feed({
    title: 'Subly - Product Updates',
    description: 'Your Blog description',
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Subly`,
    updated: date, // today's date
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`, // xml format
      json: `${siteURL}/rss/feed.json`, // json fromat
    },
    author,
  })

  posts?.forEach((post) => {
    const url = `${siteURL}/releases/${post.slug}`
    const coverUrl = `${siteURL}/release-notes/covers/${post.frontmatter.cover}`
    feed.addItem({
      title: post.frontmatter.title,
      id: url,
      link: url,
      description: post.frontmatter.metaDesc,
      author: post.frontmatter.author,
      date: new Date(dayjs(post.frontmatter.date).format('YYYY-MM-DD')),
      image: coverUrl,
    })
  })

  fs.mkdirSync('./public/rss', { recursive: true })
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2())
  fs.writeFileSync('./public/rss/feed.json', feed.json1())
}
