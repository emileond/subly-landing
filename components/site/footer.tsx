import Link from 'next/link'
import { Logo } from '@/components/site/logo'
import { Container } from '@/components/ui/section'
import { SIGNUP_URL } from '@/lib/site'

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Changelog', href: '/releases' },
      { label: 'Roadmap', href: '/roadmap' },
      { label: 'Currency converter', href: '/currency-converter' },
    ],
  },
  {
    title: 'For',
    links: [
      { label: 'Teams', href: '/for/teams' },
      { label: 'Founders and freelancers', href: '/for/founders' },
      { label: 'Households', href: '/for/households' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Manifesto', href: '/manifesto' },
      { label: 'Affiliate program', href: '/affiliates' },
      { label: 'Suggest a feature', href: 'https://roadmap.subly.app/feature-requests', external: true },
      { label: 'Status', href: 'https://uptime.subly.app', external: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/legal/privacy-policy' },
      { label: 'Terms of service', href: '/legal/terms' },
      { label: 'Cookie policy', href: '/legal/cookie-policy' },
      { label: 'Acceptable use', href: '/legal/acceptable-use' },
    ],
  },
] as const

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Know what you pay for, what you earn, and what needs you this week.
            </p>
            <a
              href={SIGNUP_URL}
              className="mt-4 inline-block text-sm font-medium text-foreground underline underline-offset-4 hover:text-brand-ink"
            >
              Start free
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-faint">{col.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {'external' in l ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Subly Financial, Inc.</p>
          <p>
            The app speaks English, Español, Português (BR), Français, Deutsch, Italiano, Norsk, Svenska and Dansk.
          </p>
        </div>
      </Container>
    </footer>
  )
}
