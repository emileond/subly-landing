import type { Metadata } from 'next'
import { DEFAULT_DESCRIPTION, SITE_NAME, absoluteUrl } from '@/lib/site'

/** Per-page metadata: canonical on subly.app, plus an Open Graph image drawn by /og. */
export function pageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  type = 'website',
  ogTitle,
  publishedTime,
}: {
  title: string
  description?: string
  path: string
  type?: 'website' | 'article'
  ogTitle?: string
  publishedTime?: string
}): Metadata {
  const url = absoluteUrl(path)
  const image = `/og?title=${encodeURIComponent(ogTitle ?? title)}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      siteName: SITE_NAME,
      url,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
  }
}
