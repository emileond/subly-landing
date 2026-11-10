import type { APIContext } from 'astro'
import { type MachinePage, machinePages, markdownPath, renderMarkdown } from '@/lib/machine-pages'

/** The Markdown twin of each page: /pricing.md, /compare/trackmysubs.md, /index.md (lib/machine-pages.ts) */
export function getStaticPaths() {
  return machinePages().map((page) => ({ params: { page: markdownPath(page.path).replace(/^\/|\.md$/g, '') }, props: { page } }))
}

export function GET({ props }: APIContext) {
  return new Response(renderMarkdown(props.page as MachinePage), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } })
}
