import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, fontProviders } from 'astro/config'
import robotsTxt from 'astro-robots-txt'
import { configSite } from './src/lib/site.config'

export default defineConfig({
  // -> Modifica la url del sitio en src/site.config.ts
  site: configSite.url,
  integrations: [sitemap(), robotsTxt()],
  fonts: [
    {
      name: 'Poppins',
      provider: fontProviders.fontsource(),
      cssVariable: '--font-poppins',
      weights: [400, 600, 700],
      styles: ['normal'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
