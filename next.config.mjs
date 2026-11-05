import { createRequire } from 'node:module'

import { securityHeaders } from './security-headers.mjs'

const require = createRequire(import.meta.url)
const { withOutstatic } = require('outstatic/next-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'getterms.dev' },
    ],
  },
}

export default withOutstatic(nextConfig)
