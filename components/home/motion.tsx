'use client'

import { type ReactNode, useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'

const REDUCED = '(prefers-reduced-motion: reduce)'

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (notify) => {
      const q = window.matchMedia(REDUCED)
      q.addEventListener('change', notify)
      return () => q.removeEventListener('change', notify)
    },
    () => window.matchMedia(REDUCED).matches,
    () => false,
  )
}

/** True while the element is on screen (or once it has been, with `once`). */
export function useInView<T extends Element>({ once = false, margin = '-12% 0px' } = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin: margin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once, margin])
  return [ref, inView] as const
}

/** Holds its CSS animations until it scrolls into view, then plays them once. */
export function Play({ className = '', children }: { className?: string; children: ReactNode }) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true })
  return (
    <div ref={ref} data-play={inView} className={className}>
      {children}
    </div>
  )
}

/**
 * Steps through `count` tabs on a timer while on screen. Hovering pauses it,
 * and choosing a tab yourself stops the automatic advance for good.
 */
export function useCycle(count: number, ms: number) {
  const reduced = usePrefersReducedMotion()
  const [ref, inView] = useInView<HTMLDivElement>()
  const [index, setIndex] = useState(0)
  const [hovering, setHovering] = useState(false)
  const [manual, setManual] = useState(false)

  const running = inView && !hovering && !manual && !reduced

  useEffect(() => {
    if (!running) return
    const t = setTimeout(() => setIndex((i) => (i + 1) % count), ms)
    return () => clearTimeout(t)
  }, [running, index, count, ms])

  const select = useCallback((i: number) => {
    setIndex(i)
    setManual(true)
  }, [])

  return {
    ref,
    index,
    select,
    running,
    manual,
    hoverProps: { onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) },
  }
}

/** Counts up to `to` when `active` turns true. */
export function useCountUp(to: number, active: boolean, ms = 1100) {
  const reduced = usePrefersReducedMotion()
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active || reduced) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / ms)
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, active, ms, reduced])
  if (reduced) return to
  return active ? value : 0
}

/** A number that counts up once the surrounding demo is on screen, after `delay` ms. */
export function CountUp({ to, delay = 0, prefix = '', suffix = '' }: { to: number; delay?: number; prefix?: string; suffix?: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>({ once: true })
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setReady(true), delay)
    return () => clearTimeout(t)
  }, [inView, delay])
  const value = useCountUp(to, ready, 1200)
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
