import fs from 'node:fs'
import path from 'node:path'
import dayjs from 'dayjs'
import matter from 'gray-matter'
import { markdownHeadings } from '@/lib/markdown'

/**
 * Blog posts (content/posts) and changelog entries (content/releases) are Markdown files
 * with front matter, edited in the repo. Both are read straight from disk at build time.
 */

const POSTS_DIR = path.join(process.cwd(), 'content/posts')
const RELEASES_DIR = path.join(process.cwd(), 'content/releases')

/** The blog's categories, in the order the blog index lists them */
export const CATEGORIES = ['Subscriptions', 'Cash flow', 'Teams', 'Lifetime deals', 'AI and agents', 'Comparisons', 'Product'] as const
export type Category = (typeof CATEGORIES)[number]

export type Heading = { id: string; text: string }

export type Post = {
  slug: string
  title: string
  /** For search snippets: the answer in one sentence */
  description: string
  /** One or two sentences under the title */
  lede: string
  category: Category
  tags: string[]
  /** A key in lib/authors.ts */
  author: string
  publishedAt: string
  /** Set when the post was revised after it was published */
  updatedAt?: string
  status?: string
  /** "In short": the takeaways, shown first */
  summary: string[]
  faq: { q: string; a: string }[]
  /** The call to action at the end, tied to the post's topic */
  cta: { title: string; body: string; button: string }
  /** The ## headings, for the side navigation */
  headings: Heading[]
  readingMinutes: number
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

const DEFAULT_CTA = {
  title: 'See every recurring payment in one place.',
  body: 'Upload one statement and Subly lists what renews, what went up and what looks forgotten, in about two minutes.',
  button: 'Start free trial',
}

const iso = (value: unknown) => (value ? new Date(value as string).toISOString() : undefined)

export function getPost(slug: string): Post | null {
  const file = path.join(POSTS_DIR, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const { data, content } = matter(fs.readFileSync(file, 'utf-8'))
  const category = (CATEGORIES as readonly string[]).includes(data.category) ? (data.category as Category) : 'Product'
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    lede: data.lede ?? data.description ?? '',
    category,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    author: data.author ?? 'emilio',
    publishedAt: iso(data.publishedAt) ?? new Date(0).toISOString(),
    updatedAt: iso(data.updatedAt),
    status: data.status,
    summary: Array.isArray(data.summary) ? data.summary.map(String) : [],
    faq: Array.isArray(data.faq) ? data.faq.filter((f: { q?: string; a?: string }) => f?.q && f?.a) : [],
    cta: { ...DEFAULT_CTA, ...(data.cta ?? {}) },
    headings: markdownHeadings(content),
    readingMinutes: Math.max(1, Math.round(content.split(/\s+/).length / 220)),
    content,
  }
}

/** Posts to read next: the same category first, then the newest */
export function relatedPosts(post: Post, count = 3): Post[] {
  const others = getPosts().filter((p) => p.slug !== post.slug)
  const same = others.filter((p) => p.category === post.category)
  return [...same, ...others.filter((p) => p.category !== post.category)].slice(0, count)
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

// In UTC, so the date does not depend on the time zone of the machine that builds the site
export const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' })
