import { releasesFeed } from '@/lib/feed'

export const dynamic = 'force-static'

export function GET() {
  return new Response(releasesFeed().json1(), { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
}
