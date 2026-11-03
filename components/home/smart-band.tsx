'use client'

import { CalendarClock, Check, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Pill, ServiceLogo } from '@/components/home/mock'
import { useCountUp, useInView, usePrefersReducedMotion } from '@/components/home/motion'
import { Container } from '@/components/ui/section'

/** 0 numbers count up, 1 insights arrive, 2 a decision is made, 3 the result lands */
const STEP_MS = [0, 1300, 3400, 4700]
const LOOP_MS = 9500

export function SmartBand() {
  const [ref, inView] = useInView<HTMLDivElement>()
  const reduced = usePrefersReducedMotion()
  const [stepRaw, setStep] = useState(0)

  useEffect(() => {
    if (reduced || !inView) return
    let timers: ReturnType<typeof setTimeout>[] = []
    const run = () => {
      timers = STEP_MS.map((ms, i) => setTimeout(() => setStep(i), ms))
      timers.push(setTimeout(run, LOOP_MS))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [inView, reduced])

  const step = reduced ? 3 : inView ? stepRaw : 0
  const moneyIn = useCountUp(5980, inView || reduced)
  const moneyOut = useCountUp(3420, inView || reduced)
  const left = useCountUp(2560, inView || reduced)
  const fmt = (n: number) => `$${n.toLocaleString('en-US')}`

  return (
    <section className="hero-glow border-y border-border py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-brand-ink">Beyond the numbers</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl">
            Numbers in. Smarter decisions out.
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">
            Most tools stop at a chart. Subly reads your money, spots what matters and puts the next move one tap away, so every
            decision is an informed one.
          </p>
        </div>

        <div
          ref={ref}
          className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-input bg-card shadow-[0_1px_0_var(--border),0_32px_64px_-36px_rgb(0_0_0/0.35)]"
        >
          <div aria-hidden="true">
            <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
              {[
                { label: 'Money in', value: fmt(moneyIn), sign: '+', tone: 'text-money-in' },
                { label: 'Money out', value: fmt(moneyOut), sign: '−', tone: 'text-problem' },
                { label: 'Left over', value: fmt(left), sign: '', tone: '' },
              ].map((s) => (
                <div key={s.label} className="px-3 py-5 text-center sm:px-6 sm:py-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.07em] text-faint sm:text-[11px]">{s.label} · month</p>
                  <p className="mt-1.5 font-mono text-xl tabular-nums tracking-tight sm:text-4xl">
                    {s.sign && <span className={`mr-px font-semibold ${s.tone}`}>{s.sign}</span>}
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-faint">Subly noticed</p>
                <div className="flex flex-wrap gap-1.5">
                  <Pill tone="neutral">23 recurring charges</Pill>
                  <Pill tone="attention">4 look forgotten</Pill>
                </div>
              </div>

              <div
                className={`rounded-xl border bg-background p-4 transition-all duration-500 ${
                  step >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                } ${step >= 3 ? 'border-money-in/40' : 'border-border'}`}
              >
                <div className="flex items-start gap-3">
                  <ServiceLogo logo="adobecc" className="h-10 w-10" />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 text-sm font-semibold sm:text-base">
                      <CalendarClock className="h-4 w-4 shrink-0 text-attention" /> Adobe Creative Cloud renews in 13 days
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">About $720 a year, and nobody owns it.</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 pl-0 sm:pl-[52px]">
                  <span className="rounded-md border border-input bg-card px-2.5 py-1 text-xs font-medium">Keep</span>
                  <span
                    className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-all duration-300 ${
                      step >= 2
                        ? 'scale-105 border-primary bg-primary text-primary-foreground'
                        : 'border-input bg-card'
                    }`}
                  >
                    Plan to cancel
                  </span>
                  <span className="rounded-md border border-input bg-card px-2.5 py-1 text-xs font-medium">Snooze</span>
                </div>
                <div
                  className={`grid transition-all duration-500 ${step >= 3 ? 'mt-4 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="flex items-center gap-2 rounded-lg bg-money-in-soft px-3 py-2 text-sm text-foreground">
                      <Check className="h-4 w-4 shrink-0 text-money-in" />
                      <span>
                        Plan saved. <strong className="font-mono tabular-nums">$720 a year</strong> stays in your account, and your
                        lowest cash point rises.
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`flex items-center gap-3 rounded-xl border border-border bg-background p-4 transition-all delay-150 duration-500 ${
                  step >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                }`}
              >
                <ServiceLogo logo="notion" className="h-10 w-10" />
                <p className="min-w-0 flex-1 text-sm">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <TrendingUp className="h-4 w-4 shrink-0 text-attention" /> Notion Plus went up 20%
                  </span>
                  <span className="text-muted-foreground">Paying yearly would save $24.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
