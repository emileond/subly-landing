import { allRoutes } from '@/lib/routes'
import { absoluteUrl } from '@/lib/site'

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

export function GET() {
  const urls = allRoutes().map((r) => {
    const loc = absoluteUrl(r.path)
    const lastmod = r.lastModified ? `\n<lastmod>${r.lastModified.toISOString()}</lastmod>` : ''
    return `<url>\n<loc>${escape(loc)}</loc>${lastmod}\n<priority>${r.priority}</priority>\n</url>`
  })
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
