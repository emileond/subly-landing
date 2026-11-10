import { postsFeed } from '@/lib/feed'

export function GET() {
  return new Response(postsFeed().rss2(), { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
