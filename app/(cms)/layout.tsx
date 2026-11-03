import type { ReactNode } from 'react'

// Outstatic's admin lives in its own root layout so its styles never reach the site.
export default function CmsLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
