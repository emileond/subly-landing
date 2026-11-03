import { ArrowRight, Code2, Webhook, Workflow } from 'lucide-react'
import Link from 'next/link'
import { AgentDemo } from '@/components/home/agent-demo'
import { ClaudeMark } from '@/components/home/mock'
import { Container } from '@/components/ui/section'
import { SIGNUP_URL } from '@/lib/site'

/**
 * Deliberately dark in both themes: it is the one moment on the page that has to
 * stand apart. Colours are fixed values, not theme tokens.
 */

const ways = [
  { icon: null, title: 'Claude connector', body: 'Built on MCP. Claude and other compatible agents can look things up, add items, assign owners and mark things cancelled.' },
  { icon: Code2, title: 'REST API', body: 'Items, charges, what is coming up and signals, with an OpenAPI spec your agent can read on its own.' },
  { icon: Webhook, title: 'Signed webhooks', body: 'Every signal can wake your own tools the moment it happens: a price change, a late payment, a budget crossed.' },
  { icon: Workflow, title: 'Zapier and Make', body: 'Send a renewal to your task board or a late payment to your CRM. No code.' },
]

/** `compact` is the home page band: plain words and a link to /agents, which shows the demo and the developer details. */
export function Agents({ compact = false, as: Heading = 'h2' }: { compact?: boolean; as?: 'h1' | 'h2' }) {
  return (
    <section id="agents" className={`relative isolate overflow-hidden bg-[#0b0b0e] text-white ${compact ? 'py-16 sm:py-20' : 'py-20 sm:py-28'}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(55% 45% at 50% 0%, rgba(140,120,255,0.32), transparent 70%), radial-gradient(35% 35% at 90% 55%, rgba(140,120,255,0.14), transparent 70%), radial-gradient(35% 35% at 5% 80%, rgba(140,120,255,0.10), transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(70% 60% at 50% 20%, #000, transparent)',
          WebkitMaskImage: 'radial-gradient(70% 60% at 50% 20%, #000, transparent)',
        }}
      />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] py-1 pl-1 pr-3 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-white/75">
            <span className="rounded-full bg-[#8c78ff] px-2 py-0.5 text-white">New in 2.0</span>
            {compact ? 'Works with Claude' : 'Built for agents · MCP'}
          </p>
          <Heading className="mt-6 font-display text-[2.5rem] font-bold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Your AI finally <span className="text-[#a898ff]">knows your money.</span>
          </Heading>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-pretty text-white/70 sm:text-xl">
            {compact ? (
              <>
                Connect <span className="inline-flex items-baseline gap-1.5 whitespace-nowrap font-medium text-white"><ClaudeMark className="h-4 w-4 self-center" />Claude</span> and ask about renewals, spend and cash in plain words. It works from your real numbers, and checks with you before it changes anything.
              </>
            ) : (
              <>
                Connect <span className="inline-flex items-baseline gap-1.5 whitespace-nowrap font-medium text-white"><ClaudeMark className="h-4 w-4 self-center" />Claude</span> or any MCP-compatible agent to Subly. Ask about renewals, spend and cash. Add items. Assign owners.
                Your agents work from the real numbers, and check with you before they change anything.
              </>
            )}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3">
            <a
              href={SIGNUP_URL}
              data-cta={compact ? 'agents-band' : 'agents-page'}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-6 text-base font-medium text-[#0b0b0e] transition-colors hover:bg-white/90 sm:w-auto"
            >
              Start free trial
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            {compact ? (
              <Link href="/agents" className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white">
                See what your AI can do with Subly <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : (
              <p className="text-sm text-white/55">14 days of Business, free, no credit card. The Claude connector and API start at Personal.</p>
            )}
          </div>
        </div>

        <div className="mt-14 sm:mt-16">
          <AgentDemo />
        </div>

        {!compact && (
          <>
            <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {ways.map(({ icon: Icon, title, body }) => (
                <li key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-[#8c78ff]/50 hover:bg-white/[0.06]">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#8c78ff]/20 text-[#b9adff]">
                    {Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : <ClaudeMark className="h-5 w-5" />}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold tracking-tight">{title}</h3>
                  <p className="mt-1.5 text-sm text-white/65">{body}</p>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-center text-xs text-white/45">
              The Claude connector and API are part of Personal, Business and Team, and of the AI &amp; Automation add-on for lifetime deals.
            </p>
          </>
        )}
      </Container>
    </section>
  )
}
