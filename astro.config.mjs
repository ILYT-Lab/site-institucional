// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ilyt.com.br',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  // navegadores atendidos: sem isto o compactador de CSS (lightningcss) apaga prefixos que o Safari < 18 ainda usa (ex.: -webkit-backdrop-filter)
  vite: { build: { cssTarget: ['chrome100', 'edge100', 'firefox100', 'safari15', 'ios15'] } },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
});
