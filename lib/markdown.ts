import GithubSlugger from 'github-slugger'
import type { Root } from 'mdast'
import { toString } from 'mdast-util-to-string'
import remarkDirective from 'remark-directive'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import type { Heading } from '@/lib/content'

/**
 * Blog components written as Markdown directives (docs/blog-writing-guide.md):
 *   :::tip[Title] … :::   :::steps … :::   ::cta[Text]{button="…"}
 * remarkBlogDirectives turns each into an element named `x-<name>` with its attributes and
 * its [label] as `data-title`; components/site/markdown.tsx renders those elements.
 */
export const CONTAINERS = ['tip', 'note', 'warning', 'subly', 'steps', 'checklist', 'stats'] as const
export const LEAVES = ['cta', 'download'] as const

type DirectiveNode = {
  type: 'containerDirective' | 'leafDirective' | 'textDirective'
  name: string
  attributes?: Record<string, string | null | undefined>
  children: { type: string; data?: { directiveLabel?: boolean }; children?: unknown[] }[]
  data?: { hName?: string; hProperties?: Record<string, unknown> }
}

export function remarkBlogDirectives() {
  return (tree: Root) => {
    visit(tree, (node) => {
      const d = node as unknown as DirectiveNode
      if (d.type !== 'containerDirective' && d.type !== 'leafDirective' && d.type !== 'textDirective') return
      const known = d.type === 'containerDirective' ? CONTAINERS : d.type === 'leafDirective' ? LEAVES : []
      if (!(known as readonly string[]).includes(d.name)) {
        // Not one of ours (e.g. "10:30" read as a text directive): render it as plain text
        d.data = { hName: 'span' }
        return
      }
      let title: string | undefined
      if (d.type === 'containerDirective') {
        const label = d.children.findIndex((c) => c.data?.directiveLabel)
        if (label >= 0) {
          title = toString(d.children[label] as never)
          d.children.splice(label, 1)
        }
      } else {
        title = toString(d as never)
      }
      d.data = {
        hName: `x-${d.name}`,
        hProperties: { ...(d.attributes ?? {}), ...(title ? { 'data-title': title } : {}) },
      }
    })
  }
}

/** The ## headings of a post, with the ids rehype-slug gives them */
export function markdownHeadings(markdown: string): Heading[] {
  const tree = unified().use(remarkParse).use(remarkGfm).use(remarkDirective).parse(markdown) as Root
  const slugger = new GithubSlugger()
  const headings: Heading[] = []
  visit(tree, 'heading', (node) => {
    const text = toString(node)
    // rehype-slug slugs every heading in order, so ### ones must advance the slugger too
    const id = slugger.slug(text)
    if (node.depth === 2) headings.push({ id, text })
  })
  return headings
}
