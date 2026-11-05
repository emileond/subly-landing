import { ArrowRight, Download, Info, Lightbulb, TriangleAlert } from 'lucide-react'
import type { ReactNode } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkDirective from 'remark-directive'
import remarkGfm from 'remark-gfm'
import { LogoMark } from '@/components/site/logo'
import { buttonClass } from '@/components/ui/button'
import { remarkBlogDirectives } from '@/lib/markdown'
import { SIGNUP_URL } from '@/lib/site'

type El = { children?: ReactNode; 'data-title'?: string; button?: string; href?: string }

/** A titled aside: tip and note are neutral with a violet icon, warning uses the amber "attention" colour */
function Callout({ kind, title, children }: { kind: 'tip' | 'note' | 'warning'; title?: string; children?: ReactNode }) {
  const Icon = kind === 'tip' ? Lightbulb : kind === 'warning' ? TriangleAlert : Info
  const tone =
    kind === 'warning'
      ? 'border-attention/30 bg-attention-soft [&_.callout-icon]:text-attention'
      : 'border-border bg-secondary/70 [&_.callout-icon]:text-brand-ink'
  return (
    <aside className={`not-prose my-8 flex gap-3.5 rounded-2xl border px-5 py-4 ${tone}`}>
      <Icon className="callout-icon mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="min-w-0 text-[1.0625rem] leading-relaxed [&_a]:font-medium [&_a]:text-brand-ink [&_a]:underline [&_a]:underline-offset-2 [&_p+p]:mt-2 [&_strong]:font-semibold">
        {title && <p className="mb-1 font-semibold text-foreground">{title}</p>}
        {children}
      </div>
    </aside>
  )
}

const components = {
  'x-tip': ({ children, 'data-title': title }: El) => <Callout kind="tip" title={title ?? 'Tip'}>{children}</Callout>,
  'x-note': ({ children, 'data-title': title }: El) => <Callout kind="note" title={title}>{children}</Callout>,
  'x-warning': ({ children, 'data-title': title }: El) => <Callout kind="warning" title={title ?? 'Watch out'}>{children}</Callout>,

  // Where Subly removes the work described around it
  'x-subly': ({ children, 'data-title': title }: El) => (
    <aside className="not-prose my-8 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <p className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-brand-ink">
        <LogoMark className="h-4 w-auto" />
        {title ?? 'How Subly helps'}
      </p>
      <div className="mt-3 text-[1.0625rem] leading-relaxed [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 [&_p+p]:mt-2 [&_strong]:font-semibold">
        {children}
      </div>
    </aside>
  ),

  // A numbered procedure: wraps an ordered list
  'x-steps': ({ children }: El) => (
    <div className="blog-steps not-prose my-8 [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-foreground">
      {children}
    </div>
  ),

  // Things to tick off: wraps a list
  'x-checklist': ({ children, 'data-title': title }: El) => (
    <div className="blog-checklist not-prose my-8 rounded-2xl border border-border bg-card p-5 sm:p-6">
      {title && <p className="mb-3 font-semibold">{title}</p>}
      {children}
    </div>
  ),

  // Numbers worth remembering: wraps a list of "**number** label" items
  'x-stats': ({ children }: El) => <div className="blog-stats not-prose my-8">{children}</div>,

  'x-cta': ({ 'data-title': text, button }: El) => (
    <aside className="not-prose my-10 flex flex-col gap-4 rounded-2xl border border-border bg-secondary/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <p className="font-display text-lg font-bold leading-snug tracking-tight text-balance sm:max-w-md">{text}</p>
      <a href={SIGNUP_URL} data-cta="blog-inline" className={buttonClass('primary', 'md', 'shrink-0')}>
        {button ?? 'Start free trial'} <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </aside>
  ),

  'x-download': ({ 'data-title': text, href }: El) => (
    <aside className="not-prose my-8 flex items-center gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-ink">
        <Download className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="min-w-0 flex-1 font-semibold leading-snug">{text}</p>
      <a href={href} download className={buttonClass('outline', 'sm', 'shrink-0')}>
        Download
      </a>
    </aside>
  ),

  table: ({ children }: El) => (
    <div className="blog-table not-prose my-8 overflow-x-auto rounded-2xl border border-border">
      <table>{children}</table>
    </div>
  ),
  img: ({ src, alt }: { src?: unknown; alt?: string }) => (
    <img src={typeof src === 'string' ? src : undefined} alt={alt ?? ''} loading="lazy" decoding="async" />
  ),
  a: ({ href, children }: { href?: string; children?: ReactNode }) => {
    const external = !!href && /^https?:/.test(href) && !href.startsWith('https://subly.app')
    return (
      <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    )
  },
} as unknown as Components

/** Markdown from the blog and changelog, styled with Tailwind's prose on the Subly tokens. */
export function Markdown({ children, className = '' }: { children: string; className?: string }) {
  return (
    <div
      className={`prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-h2:mt-14 prose-img:w-full ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkDirective, remarkBlogDirectives]}
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
