import type { Metadata } from 'next'
import { Agents } from '@/components/home/agents'
import { ClosingCta } from '@/components/home/closing-cta'
import { FaqSection } from '@/components/home/faq'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Subly for Claude and AI agents',
  description:
    'Connect Claude or any MCP-compatible agent to Subly. Ask about renewals, spend and cash, add items and assign owners, with a REST API, signed webhooks and Zapier and Make.',
  path: '/agents',
  ogTitle: 'Your AI finally knows your money.',
})

export default function AgentsPage() {
  return (
    <>
      <Agents as="h1" />
      <FaqSection only={['Can I use Subly with Claude', 'How is my data handled', 'What plan should I choose']} />
      <ClosingCta />
    </>
  )
}
