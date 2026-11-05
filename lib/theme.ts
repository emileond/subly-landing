/**
 * Light, dark or the device's choice, kept in localStorage under 'theme' (the key next-themes
 * used, so a choice made on the old site carries over). The inline script in layouts/Site.astro
 * applies it before first paint; the toggle calls applyTheme.
 */
export type Theme = 'system' | 'light' | 'dark'

export const THEME_KEY = 'theme'

export function readTheme(): Theme {
  try {
    const t = localStorage.getItem(THEME_KEY)
    return t === 'light' || t === 'dark' ? t : 'system'
  } catch {
    return 'system'
  }
}

export function applyTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // storage blocked: the choice lasts for this page only
  }
  const dark = theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches)
  const root = document.documentElement
  // No colour transitions while everything switches at once
  const freeze = document.createElement('style')
  freeze.textContent = '*,*::before,*::after{transition:none!important}'
  document.head.appendChild(freeze)
  root.classList.toggle('dark', dark)
  root.classList.toggle('light', !dark)
  root.style.colorScheme = dark ? 'dark' : 'light'
  void getComputedStyle(document.body).opacity
  setTimeout(() => freeze.remove(), 1)
}
