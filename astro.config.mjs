// @ts-check
import { defineConfig } from 'astro/config';
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
    // Allow processing of local images in src/
  },
});
