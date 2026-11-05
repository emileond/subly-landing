import type { GetStaticPaths } from 'astro'
import { renderOgImage } from '@/lib/og-image'
import { allRoutes } from '@/lib/routes'
import { ogKey } from '@/lib/seo'

/** One Open Graph card per page, keyed by path (lib/seo.ts ogImagePath). /og/default.png is the home page's. */
export const getStaticPaths = (() =>
  allRoutes().map((r) => ({ params: { key: ogKey(r.path) }, props: { headline: r.ogTitle ?? r.title, eyebrow: r.ogEyebrow } }))) satisfies GetStaticPaths

export async function GET({ props }: { props: { headline: string; eyebrow?: string } }) {
  const png = await renderOgImage(props.headline, props.eyebrow)
  return new Response(png as BodyInit, { headers: { 'Content-Type': 'image/png' } })
}
