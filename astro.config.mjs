// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://louis-bethune.fr',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  // Preserve legacy Jekyll routes that no longer have a dedicated page.
  redirects: {
    '/service': '/community',
    '/teaching': '/community',
    '/research': '/publications',
    '/cv': '/cv/Louis_Bethune_CV.pdf',
  },
  build: {
    format: 'directory',
  },
  image: {
    // No sharp: all figures are already optimized to .webp, so we serve them
    // as-is. This avoids the native `sharp` dependency (and its flaky install
    // on CI) entirely.
    service: passthroughImageService(),
  },
});
