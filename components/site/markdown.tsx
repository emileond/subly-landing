import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

/** Markdown from the blog and changelog, styled with Tailwind's prose on the Subly tokens. */
export function Markdown({ children, className = '' }: { children: string; className?: string }) {
  return (
    <div
      className={`prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-h2:mt-12 prose-img:w-full ${className}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          // eslint-disable-next-line @next/next/no-img-element
          img: ({ src, alt }) => <img src={typeof src === 'string' ? src : undefined} alt={alt ?? ''} loading="lazy" decoding="async" />,
          a: ({ href, children }) => {
            const external = !!href && /^https?:/.test(href)
            return (
              <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {children}
              </a>
            )
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
