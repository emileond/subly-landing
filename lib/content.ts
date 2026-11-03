import fs from 'node:fs'
import path from 'node:path'
import dayjs from 'dayjs'
import matter from 'gray-matter'

/**
 * Blog posts are Outstatic's Markdown files (outstatic/content/posts), written to
 * the repo by the Outstatic dashboard at /outstatic. Changelog entries live in
 * _releases. Both are read straight from disk at build time.
 */

const POSTS_DIR = path.join(process.cwd(), 'outstatic/content/posts')
const RELEASES_DIR = path.join(process.cwd(), '_releases')

export type Tag = { label: string; value: string }

export type Post = {
  slug: string
  title: string
  description: string
  coverImage?: string
  publishedAt: string
  status?: string
  author?: { name?: string; picture?: string }
  tags: Tag[]
  ctaHeadline?: string
  ctaText?: string
  ctaButtonLabel?: string
  content: string
}

export type Release = {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  cover?: string
  ctaLink?: string
  ctaText?: string
  content: string
}

const markdownFiles = (dir: string) =>
  fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.md')) : []

export function getPosts(): Post[] {
  return markdownFiles(POSTS_DIR)
    .map((file) => getPost(file.replace(/\.md$/, '')))
    .filter((p): p is Post => !!p && p.status === 'published')
    .sort((a, b) => dayjs(b.publishedAt).valueOf() - dayjs(a.publishedAt).valueOf())
}

export function getPost(slug: string): Post | null {
  const file = path.join(POSTS_DIR, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const { data, content } = matter(fs.readFileSync(file, 'utf-8'))
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    coverImage: data.coverImage || undefined,
    publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString() : new Date(0).toISOString(),
    status: data.status,
    author: data.author,
    tags: Array.isArray(data.tags) ? data.tags : [],
    ctaHeadline: data.ctaHeadline,
    ctaText: data.ctaText,
    ctaButtonLabel: data.ctaButtonLabel,
    content,
  }
}

export function getReleases(): Release[] {
  return markdownFiles(RELEASES_DIR)
    .map((file) => getRelease(file.replace(/\.md$/, '')))
    .filter((r): r is Release => !!r)
    .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())
}

export function getRelease(slug: string): Release | null {
  const file = path.join(RELEASES_DIR, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const { data, content } = matter(fs.readFileSync(file, 'utf-8'))
  return {
    slug,
    title: data.title ?? slug,
    description: data.metaDesc ?? '',
    date: data.date ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    cover: data.cover,
    ctaLink: data.ctaLink,
    ctaText: data.ctaText,
    content,
  }
}

export const formatDate = (value: string) => dayjs(value).format('MMMM D, YYYY')
