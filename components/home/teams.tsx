import { AtSign, Inbox, MessageSquare, UserCheck } from 'lucide-react'
import { ServiceLogo, WindowFrame } from '@/components/home/mock'
import { Section, SectionHeading } from '@/components/ui/section'

const points = [
  { icon: UserCheck, title: 'Every tool has an owner', body: 'Put a name next to each item. Renewals go to the person who can decide.' },
  { icon: AtSign, title: 'Notes and mentions', body: 'Leave a note on an item and mention a teammate. No more "who uses this?" threads.' },
  { icon: Inbox, title: 'An Inbox for what is yours', body: 'Mentions and things assigned to you land in one place.' },
  { icon: MessageSquare, title: 'Slack and Microsoft Teams', body: 'Keep or cancel a renewal right from the message, with Slack buttons or in Teams.' },
]

const people = [
  { initials: 'DK', bg: '#0F766E' },
  { initials: 'SR', bg: '#7C3AED' },
]

export function Teams() {
  return (
    <Section tone="sunken">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <WindowFrame url="web.subly.app/recurring/adobe-creative-cloud" label="Mock-up of an item page: owner Dana, a note from Sam mentioning Dana, and an Inbox entry" className="order-2 lg:order-1">
          <div className="bg-background p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <ServiceLogo abbr="Ai" bg="#DA1F26" className="h-10 w-10 text-sm" />
              <div className="min-w-0">
                <p className="font-display text-lg font-bold leading-tight tracking-tight">Adobe Creative Cloud</p>
                <p className="text-xs text-muted-foreground">Design · Monthly · $59.99</p>
              </div>
              <span className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card py-0.5 pl-0.5 pr-2.5 text-xs">
                <span className="grid h-5 w-5 place-items-center rounded-full text-[9px] font-semibold text-white" style={{ background: people[0].bg }}>
                  {people[0].initials}
                </span>
                Dana
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-border bg-card p-3.5 text-sm">
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-semibold text-white" style={{ background: people[1].bg }}>
                    {people[1].initials}
                  </span>
                  <span className="font-medium">Sam</span>
                  <span className="text-xs text-faint">2 hours ago</span>
                </div>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  <span className="rounded bg-brand-soft px-1 font-medium text-brand-ink">@Dana</span> is anyone still using
                  this seat? It renews on Nov 5.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-3.5">
                <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-faint">Inbox</p>
                <ul className="mt-2 divide-y divide-border text-sm">
                  <li className="flex items-center justify-between gap-3 py-2">
                    <span className="truncate">Sam mentioned you on Adobe Creative Cloud</span>
                    <span className="h-2 w-2 shrink-0 rounded-full bg-brand" />
                  </li>
                  <li className="flex items-center justify-between gap-3 py-2 text-muted-foreground">
                    <span className="truncate">Webflow was assigned to you</span>
                    <span className="shrink-0 text-xs">Yesterday</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </WindowFrame>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="For teams"
            title="Built for teams"
            lede="The person who knows about a tool is rarely the person who pays for it. Subly puts a name on every item and keeps the conversation next to it."
          />
          <ul className="mt-8 space-y-5">
            {points.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-4">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand-ink">
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground sm:text-base">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
