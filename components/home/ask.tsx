import { Code2, Sparkles, Webhook } from 'lucide-react'
import { FakeButton, WindowFrame } from '@/components/home/mock'
import { Section, SectionHeading } from '@/components/ui/section'

const events = [
  'renewal.upcoming',
  'price.changed',
  'charge.unexpected',
  'charge.after_cancel',
  'refund_window.closing',
  'payment.late',
  'bank.issue',
  'item.no_owner',
]

export function Ask() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Ask Subly"
        title="Ask anything about your money"
        lede="Type a question in plain words and get the answer with the numbers behind it. Ask in Subly, or from Claude with the Subly connector."
      />

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-2">
        <div
          role="img"
          aria-label="Mock-up of Ask Subly: the question 'what do we pay for design tools per year?' answered with $1,079.76 across three tools"
          className="overflow-hidden rounded-2xl border border-input bg-card shadow-[0_24px_48px_-32px_rgb(0_0_0/0.3)]"
        >
          <div aria-hidden="true">
            <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-faint border-b border-border px-5 py-3">In Subly</p>
            <p className="flex items-center gap-2 border-b border-border px-5 py-3.5 text-sm">
              <Sparkles className="h-4 w-4 text-brand" />
              What do we pay for design tools per year?
            </p>
            <div className="border-b border-border px-5 py-4 text-sm leading-relaxed">
              <p>
                <strong className="font-mono text-base tabular-nums">$1,079.76 a year</strong> across 3 tools: Adobe Creative
                Cloud $719.88, Figma $180.00 and Canva $179.88. Adobe and Figma overlap for 2 people.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 px-5 py-3.5">
              <FakeButton primary>Open the 3 items</FakeButton>
              <FakeButton>Which one could we drop?</FakeButton>
            </div>
          </div>
        </div>

        <WindowFrame url="claude.ai · Subly connector" label="Mock-up of Claude using the Subly connector to list renewals before the end of the year and who owns each one">
          <div className="grid gap-2.5 bg-background p-5 text-sm">
            <p className="max-w-[85%] justify-self-end rounded-xl bg-primary px-3.5 py-2.5 text-primary-foreground">
              Which of our tools renew before the end of the year, and who owns each one?
            </p>
            <p className="justify-self-start rounded-lg border border-border bg-muted px-2.5 py-1.5 font-mono text-[11.5px] text-muted-foreground">
              Used Subly · upcoming renewals
            </p>
            <p className="max-w-[92%] rounded-xl border border-border bg-card px-3.5 py-2.5 leading-relaxed">
              Four renewals before Dec 31 add up to <strong className="font-mono tabular-nums">$3,412</strong>. Two have no
              owner: Adobe and Webflow. Want a note for #ops asking who should take them?
            </p>
          </div>
        </WindowFrame>
      </div>

      <div className="mt-6 grid gap-4 rounded-2xl border border-border bg-card p-5 sm:p-7 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-brand-ink">For builders</p>
          <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">Connect Subly to the rest of your stack</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground sm:text-base">
            <li className="flex gap-3">
              <Code2 className="mt-1 h-4 w-4 shrink-0 text-brand-ink" aria-hidden="true" />
              <span>A REST API with an OpenAPI spec: items, charges, what is coming up, and signals.</span>
            </li>
            <li className="flex gap-3">
              <Webhook className="mt-1 h-4 w-4 shrink-0 text-brand-ink" aria-hidden="true" />
              <span>Signed webhooks for every signal, so your own tools can react when a price changes.</span>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-faint">Webhook events</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {events.map((e) => (
              <li key={e} className="rounded-md border border-border bg-muted px-2 py-1 font-mono text-xs">
                {e}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-faint">
            The Claude connector and API are part of Business and Team, and of the AI &amp; Automation add-on for lifetime deals.
          </p>
        </div>
      </div>
    </Section>
  )
}
