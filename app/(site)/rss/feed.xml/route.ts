import { releasesFeed } from '@/lib/feed'

export const dynamic = 'force-static'

export function GET() {
  return new Response(releasesFeed().rss2(), { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
