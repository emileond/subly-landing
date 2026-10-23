import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { ThemeProvider } from 'next-themes'
import { CrispChat } from '@/components/site/crisp'
import { Footer } from '@/components/site/footer'
import { Nav } from '@/components/site/nav'
import { display, mono, sans } from '@/lib/fonts'
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'
import '../globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Subly: never overpay for software again',
    template: '%s | Subly',
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    url: SITE_URL,
    title: 'Subly: never overpay for software again',
    description: DEFAULT_DESCRIPTION,
    locale: 'en_US',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Subly: never overpay for software again' }],
  },
  twitter: { card: 'summary_large_image', site: '@sublyweb', images: ['/og'] },
  icons: { icon: [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png' }], apple: '/apple-icon.png' },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0e10' },
  ],
}

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
        <CrispChat />
        <Script
          src="https://app.getterms.io/cookie-consent/embed/fe9ce7ea-2b79-4c36-9276-c1514bc42c61"
          strategy="afterInteractive"
        />
        {isProduction && (
          <>
            <Script
              id="umami-script"
              defer
              src="https://umami.subly.app/script.js"
              data-website-id="985b3243-3bb3-4213-9561-381cde5f2d85"
            />
            <Script
              id="partnero-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `(function(p,t,n,e,r,o){ p['__partnerObject']=r;function f(){
            var c={ a:arguments,q:[]};var r=this.push(c);return "number"!=typeof r?r:f.bind(c.q);}
            f.q=f.q||[];p[r]=p[r]||f.bind(f.q);p[r].q=p[r].q||f.q;o=t.createElement(n);
            var _=t.getElementsByTagName(n)[0];o.async=1;o.src=e+'?v'+(~~(new Date().getTime()/1e6));
            _.parentNode.insertBefore(o,_);})(window, document, 'script', 'https://app.partnero.com/js/universal.js', 'po');
            po('settings', 'assets_host', 'https://assets.partnero.com');
            po('program', 'NZCCAGAZ', 'load');`,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}
