'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { applyTheme, readTheme, type Theme } from '@/lib/theme'

const order = ['system', 'light', 'dark'] as const
const labels = { system: 'Match my device', light: 'Light', dark: 'Dark' } as const

export function ThemeToggle({ className = '' }: { className?: string }) {
  // 'system' on the server and the first client render, then the stored choice
  const [current, setCurrent] = useState<Theme>('system')
  useEffect(() => setCurrent(readTheme()), [])
  const setTheme = (t: Theme) => {
    applyTheme(t)
    setCurrent(t)
  }

  const next = order[(order.indexOf(current) + 1) % order.length]
  const Icon = current === 'light' ? Sun : current === 'dark' ? Moon : Monitor

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground ${className}`}
      aria-label={`Theme: ${labels[current]}. Switch to ${labels[next]}.`}
      title={`Theme: ${labels[current]}`}
    >
      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
    </button>
  )
}
