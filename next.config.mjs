import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { withOutstatic } = require('outstatic/next-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'getterms.dev' },
    ],
  },
}

export default withOutstatic(nextConfig)
