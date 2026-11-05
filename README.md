# Subly website

Marketing site for [Subly](https://subly.app). Astro 7 with React 19 components, Tailwind CSS v4, served by Cloudflare as static files.

Needs Node 24 (`.tool-versions`, `.node-version`; Astro 7 needs 22.23 or newer).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # dist/, in UTC so dates do not depend on your time zone
npm run preview   # build, then serve dist/ the way Cloudflare does (headers, redirects, 404)
npm run check     # astro check (types, .astro files)
npm run lint      # eslint (React and TypeScript)
npm run deploy    # build and deploy to Cloudflare (needs `npx wrangler login`)
```

## How it is put together

- Every page is prerendered by `astro build` into `dist/`. Nothing renders on request, and there is no Worker script: Cloudflare serves the files as Workers static assets (`wrangler.jsonc`).
- `src/pages` are the routes. Each is a thin `.astro` file that renders React components from `components/` inside `src/layouts/Site.astro` (head tags, nav, footer, theme, analytics).
- React components render to plain HTML unless a page gives them a `client:` directive. The interactive ones are islands: the nav (`client:load`), the animated home sections, the pricing plans and table, the agents demo and the currency converter. Everything else ships no JavaScript.
- Page bodies too long to write inline live in `components/pages` (legal pages, manifesto, roadmap, blog and changelog layouts).
- `lib/pages.ts` holds every fixed page's title, description and sitemap priority. `lib/routes.ts` adds personas, blog posts and releases; the sitemap and the Open Graph images are built from it, so a page's title lives in one place.
- Blog posts are Markdown in `content/posts`, changelog entries in `content/releases`; `lib/content.ts` reads them at build time. Edit them in the repo (the old Outstatic dashboard is gone).
- Open Graph cards are PNGs drawn at build time (`src/pages/og/[key].png.ts`, `lib/og-image.tsx`, fonts in `assets/fonts`), one per page at `/og/<path>.png`. `/og` redirects to `/og/default.png` for links made by the old Next.js site.
- `public/_headers` sets the security headers (HSTS, CSP `frame-ancestors`, nosniff…) and caching; `public/_redirects` holds redirects. Cloudflare applies both.
- `styles/globals.css` holds the design tokens, copied from the app (`subly-web/app/globals.css`). Neutral surfaces and buttons, violet (`brand`) for indicators and decoration, green/amber/red only where they mean money. Dark mode is `.dark`, set before first paint by the inline script in `Site.astro` and the toggle in the nav (`lib/theme.ts`; the choice is kept in `localStorage.theme`).
- Fonts: Bricolage Grotesque (display), Geist (body), Geist Mono (numbers), self-hosted with Fontsource.
- `lib/plans.ts` and `lib/plan-features.ts` mirror `subly-web/lib/plans.ts`. Change prices or limits there first, then here.
- `lib/seo.ts` builds the head tags and canonical URLs on subly.app.
- Analytics (Umami, Traks, Partnero) load only on subly.app, never on previews or local builds. `lib/tracking.ts` sends the `signup_click` and `pricing_viewed` events.
- `data/currencies.json` holds the exchange rates the converter uses; it is read at build time.

Product visuals on the home page are plain HTML and CSS (`components/home`), not screenshots.

## Why Wrangler and not `cf`

Cloudflare's newer `cf` CLI (1.0 beta) handles Astro only through the `@astrojs/cloudflare` server adapter and expects its build output; a fully static Astro build does not produce it, so `cf build` fails. `wrangler.jsonc` with an assets directory is Cloudflare's stable setup for a static site. Revisit with `cf migrate` once `cf` supports static Astro output.
