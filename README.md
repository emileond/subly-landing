# Subly website

Marketing site for [Subly](https://subly.app). Next.js 16 (App Router), React 19, Tailwind CSS v4.

Needs Node 22 (`.tool-versions`; Next 16 needs 20.9 or newer).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## How it is put together

- `app/(site)` is the website: home, `/pricing`, `/for/[persona]`, blog, changelog (`/releases`), roadmap, affiliates, legal, manifesto and the currency converter. It has its own root layout (fonts, theme, nav, footer, Crisp, analytics).
- `app/(cms)` and `app/api/outstatic` are the Outstatic dashboard at `/outstatic`. It has a separate root layout so its styles never reach the site. Blog posts are Markdown in `outstatic/content/posts`; the site reads them from disk at build time (`lib/content.ts`). The changelog reads `_releases/*.md`.
- `app/globals.css` holds the design tokens, copied from the app (`subly-web/app/globals.css`). Neutral surfaces and buttons, violet (`brand`) for indicators and decoration, green/amber/red only where they mean money. Dark mode is `.dark`, driven by `next-themes` (system by default, with a toggle in the nav).
- Fonts: Bricolage Grotesque (display), Geist (body), Geist Mono (numbers), loaded with `next/font/google`.
- `lib/plans.ts` and `lib/plan-features.ts` mirror `subly-web/lib/plans.ts`. Change prices or limits there first, then here.
- `app/og/route.tsx` draws the Open Graph image with `next/og` (fonts in `assets/fonts`). `lib/seo.ts` builds per-page metadata and canonical URLs on subly.app.
- `data/currencies.json` is rewritten twice a day by `.github/workflows/fetch-currencies-data.yml`; the converter reads it at build time.

Product visuals on the home page are plain HTML and CSS (`components/home`), not screenshots.
