import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// A fully static site: `astro build` writes dist/, which Cloudflare serves as Workers static
// assets (wrangler.jsonc). Security headers and redirects live in public/_headers and
// public/_redirects; Cloudflare applies them, not Astro.
export default defineConfig({
  site: 'https://subly.app',
  output: 'static',
  // /pricing, not /pricing/ (as the Next.js site served them): dist/pricing.html
  trailingSlash: 'never',
  build: { format: 'file' },
  // Astro 7 defaults to 'jsx', which strips the space between inline elements
  compressHTML: true,
  integrations: [react()],
  vite: { plugins: [tailwindcss()] }
})