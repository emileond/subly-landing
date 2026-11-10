import { absoluteUrl } from '@/lib/site'

/**
 * Everyone may read the site, AI crawlers included: being quoted by an assistant is how people
 * find Subly. They are named so the choice is on record (and survives a default that changes),
 * not because `*` leaves them out. /llms.txt points them at the Markdown version of each page.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
  'CCBot',
]

export function GET() {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /og',
    '',
    ...AI_CRAWLERS.map((name) => `User-agent: ${name}`),
    'Allow: /',
    '',
    `# For AI assistants: ${absoluteUrl('/llms.txt')}`,
    `Sitemap: ${absoluteUrl('/sitemap.xml')}`,
    '',
  ]
  return new Response(body.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
