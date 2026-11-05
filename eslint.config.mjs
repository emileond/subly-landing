import { defineConfig, globalIgnores } from 'eslint/config'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

// .astro files are type-checked by `npm run check` (astro check); this lints the React and TS.
export default defineConfig([
  ...tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  globalIgnores(['dist/**', '.astro/**', '.wrangler/**', 'node_modules/**']),
])
