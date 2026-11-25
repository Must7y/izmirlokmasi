import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://izmirlokmasi.com',
  output: 'static',
  // The strict CSP bans inline CSS; force all styles to external assets.
  build: { inlineStylesheets: 'never' },
  trailingSlash: 'always',
  vite: {
    build: { assetsInlineLimit: 0 },
  },
});
