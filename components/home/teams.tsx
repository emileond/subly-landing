'use client'

import { AtSign, Bell, Check, Inbox, MessageSquare, RotateCcw, SendHorizontal, UserCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Avatar } from '@/components/home/avatar'
import { ServiceLogo, WindowFrame } from '@/components/home/mock'
import { useInView, usePrefersReducedMotion } from '@/components/home/motion'
import { Section, SectionHeading } from '@/components/ui/section'

const points = [
  { icon: UserCheck, title: 'Every tool has an owner', body: 'Put a name next to each item. Renewals go to the person who can decide.' },
  { icon: AtSign, title: 'Notes and mentions', body: 'Leave a note on an item and mention a teammate. No more "who uses this?" threads.' },
  { icon: Inbox, title: 'A feed for what is yours', body: 'Mentions and things assigned to you land in one place.' },
  { icon: MessageSquare, title: 'Slack and Microsoft Teams', body: 'Keep or cancel a renewal right from the message, with Slack buttons or in Teams.' },
]

const SAM = 'sam@oakline.studio'
const DANA = 'dana@oakline.studio'

const SAM_TEXT = '@Dana is anyone still using this seat? It renews on Nov 5.'
const DANA_TEXT = 'Nobody has opened it since March. Plan to cancel.'

/** When each step of the story begins, in ms */
const AT = { sam: 700, sent: 3300, online: 3600, danaTyping: 4600, danaReply: 6200, decision: 8200, slack: 8900 }

/** Types `text` out one letter at a time once `active` */
function Typed({ text, active, speed = 38 }: { text: string; active: boolean; speed?: number }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) return
    const id = setInterval(() => setN((v) => Math.min(text.length, v + 1)), speed)
    return () => clearInterval(id)
  }, [active, text, speed])
  return <>{text.slice(0, n)}</>
}

function Mention({ children }: { children: string }) {
  return <span className="rounded bg-brand-soft px-1 font-medium text-brand-ink">{children}</span>
}

/** Renders Sam's text with the @mention picked out */
function SamText({ shown }: { shown: string }) {
  if (shown.startsWith('@Dana')) {
    return (
      <>
        <Mention>@Dana</Mention>
        {shown.slice(5)}
      </>
    )
  }
  return <>{shown}</>
}

function Presence({ seed, name, online }: { seed: string; name: string; online: boolean }) {
  return (
    <span className="relative" title={name}>
      <Avatar seed={seed} size="md" className="ring-2 ring-card" />
      <span
        className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card transition-colors duration-500 ${
          online ? 'bg-money-in' : 'bg-input'
        }`}
      />
    </span>
  )
}

function Collab() {
  const reduced = usePrefersReducedMotion()
  const [ref, inView] = useInView<HTMLDivElement>({ once: true })
  const [t, setT] = useState(0)

  useEffect(() => {
    if (!inView || reduced) return
    const start = performance.now()
    const id = setInterval(() => {
      const elapsed = performance.now() - start
      setT(elapsed)
      if (elapsed > AT.slack + 500) clearInterval(id)
    }, 40)
    return () => clearInterval(id)
  }, [inView, reduced])

  const now = reduced ? Infinity : t
  const samTyping = now >= AT.sam && now < AT.sent
  const sent = now >= AT.sent
  const danaOnline = now >= AT.online
  const toast = now >= AT.online && now < AT.danaReply
  const danaTyping = now >= AT.danaTyping && now < AT.danaReply
  const replied = now >= AT.danaReply
  const decided = now >= AT.decision
  const slack = now >= AT.slack

  return (
    <div ref={ref} className="relative bg-background p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <ServiceLogo logo="adobecc" className="h-10 w-10 text-sm" />
        <div className="min-w-0">
          <p className="font-display text-lg font-bold leading-tight tracking-tight">Adobe Creative Cloud</p>
          <p className="text-xs text-muted-foreground">Design · Monthly · $59.99</p>
        </div>
        <div className="ml-auto flex shrink-0 -space-x-1.5">
          <Presence seed={SAM} name="Sam" online />
          <Presence seed={DANA} name="Dana" online={danaOnline} />
        </div>
      </div>

      <div className="mt-4 min-h-[15.5rem] space-y-3">
        {sent && (
          <div className="anim-rise flex gap-2.5">
            <Avatar seed={SAM} size="md" />
            <div className="min-w-0 flex-1 rounded-xl rounded-tl-sm border border-border bg-card px-3.5 py-2.5 text-sm">
              <p className="flex items-baseline gap-2">
                <span className="font-medium">Sam</span>
                <span className="text-xs text-faint">just now</span>
              </p>
              <p className="mt-1 leading-relaxed text-muted-foreground">
                <SamText shown={SAM_TEXT} />
              </p>
            </div>
          </div>
        )}

        {danaTyping && (
          <div className="anim-rise flex items-center gap-2.5">
            <Avatar seed={DANA} size="md" />
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2">
              {[0, 1, 2].map((i) => (
                <span key={i} className="anim-dot h-1.5 w-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
              <span className="text-xs text-muted-foreground">Dana is typing</span>
            </div>
          </div>
        )}

        {replied && (
          <div className="anim-rise flex gap-2.5">
            <Avatar seed={DANA} size="md" />
            <div className="min-w-0 flex-1 rounded-xl rounded-tl-sm border border-border bg-card px-3.5 py-2.5 text-sm">
              <p className="flex items-baseline gap-2">
                <span className="font-medium">Dana</span>
                <span className="text-xs text-faint">just now</span>
              </p>
              <p className="mt-1 leading-relaxed text-muted-foreground">
                <Typed text={DANA_TEXT} active speed={28} />
              </p>
            </div>
          </div>
        )}

        {decided && (
          <div className="anim-rise flex items-center gap-3 rounded-xl border border-money-in/40 bg-money-in-soft px-3.5 py-3 text-sm">
            <Check className="h-4 w-4 shrink-0 text-money-in" aria-hidden="true" />
            <span className="flex-1">
              Plan to cancel on <strong>Nov 4</strong>, set by Dana
            </span>
            <span className="font-mono text-xs tabular-nums">$720 a year</span>
          </div>
        )}

        {slack && <p className="anim-fade text-xs text-faint">Also posted to #ops in Slack, where the same buttons work.</p>}
      </div>

      {/* Sam's composer: the message is typed here, then sent into the thread */}
      <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-input bg-card px-3 py-2.5 text-sm">
        <Avatar seed={SAM} size="sm" />
        <span className="min-h-5 flex-1 leading-5">
          {samTyping ? (
            <>
              <SamText shown={SAM_TEXT.slice(0, Math.max(0, Math.floor((now - AT.sam) / 38)))} />
              <span className="ml-px inline-block h-4 w-px translate-y-0.5 bg-brand" style={{ animation: 'caret 0.8s step-end infinite' }} />
            </>
          ) : (
            <span className="text-faint">{sent ? 'Write a note…' : ''}</span>
          )}
        </span>
        <span
          className={`grid h-7 w-7 place-items-center rounded-md transition-colors ${
            samTyping && now > AT.sent - 400 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}
        >
          <SendHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>

      {/* What Dana sees, on her side, the moment she is mentioned */}
      {toast && (
        <div className="anim-pop absolute bottom-[5rem] right-3 flex w-[16.5rem] items-start gap-2.5 rounded-xl border border-input bg-card p-3 text-xs shadow-[0_16px_40px_-16px_rgb(0_0_0/0.4)] sm:right-5">
          <Avatar seed={DANA} size="sm" />
          <div>
            <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-faint">
              <Bell className="h-3 w-3" aria-hidden="true" /> For you · Dana
            </p>
            <p className="mt-1 font-medium">Sam mentioned you on Adobe Creative Cloud</p>
          </div>
        </div>
      )}
    </div>
  )
}

export function Teams() {
  const [run, setRun] = useState(0)

  return (
    <Section tone="sunken">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <WindowFrame
            url="web.subly.app/recurring/adobe-creative-cloud"
            label="Mock-up of a teammate typing a note that mentions Dana on an item, Dana being notified, typing a reply and deciding to cancel"
          >
            <Collab key={run} />
          </WindowFrame>
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-faint underline-offset-4 hover:text-foreground hover:underline"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" /> Replay
          </button>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="For teams"
            title="Everyone on the same page"
            lede="The person who knows about a tool is rarely the person who pays for it. Subly puts a name on every item and keeps the conversation, and the decision, right next to it."
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
