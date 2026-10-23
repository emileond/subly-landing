'use client'

import { useEffect } from 'react'

const CRISP_WEBSITE_ID = '19741c3f-ea21-48bb-a0b4-43eb92c8a700'

/** Loads the Crisp chat once the page is idle, so it never competes with first paint. */
export function CrispChat() {
  useEffect(() => {
    let cancelled = false
    let nudge: ReturnType<typeof setTimeout> | undefined

    const start = async () => {
      const { Crisp } = await import('crisp-sdk-web')
      if (cancelled) return
      Crisp.configure(CRISP_WEBSITE_ID)

      try {
        if (localStorage.getItem('crispTrigger')) return
        nudge = setTimeout(() => {
          Crisp.message.show('text', `Hey there 👋, Curious about how Subly works? I'm here to help!`)
          localStorage.setItem('crispTrigger', 'true')
        }, 30000)
      } catch {
        // storage can be blocked; skip the nudge
      }
    }

    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 2000))
    const id = idle(start)
    return () => {
      cancelled = true
      if (nudge) clearTimeout(nudge)
      if (window.cancelIdleCallback && typeof id === 'number') window.cancelIdleCallback(id)
    }
  }, [])

  return null
}
