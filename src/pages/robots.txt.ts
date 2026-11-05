import { absoluteUrl } from '@/lib/site'

export function GET() {
  const body = ['User-Agent: *', 'Allow: /', 'Disallow: /og', '', `Host: ${absoluteUrl('/')}`, `Sitemap: ${absoluteUrl('/sitemap.xml')}`, '']
  return new Response(body.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
