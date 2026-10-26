'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

const order = ['system', 'light', 'dark'] as const
const labels = { system: 'Match my device', light: 'Light', dark: 'Dark' } as const

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme = 'system', setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  const current = (mounted && order.includes(theme as (typeof order)[number]) ? theme : 'system') as (typeof order)[number]
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
