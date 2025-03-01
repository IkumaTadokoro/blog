import { defineConfig, passthroughImageService } from 'astro/config';
import react from "@astrojs/react";
import icon from "astro-icon";
import { expressiveCodePlugin, rehypePlugins } from './src/utils/markdown';
import pagefind from "astro-pagefind";
import { SITE } from './src/config';

import mdx from "@astrojs/mdx";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: SITE.siteUrl,
  integrations: [react(), icon(), expressiveCodePlugin, pagefind(), mdx()],

  markdown: {
    rehypePlugins,
  },

  image: {
    service: passthroughImageService(),
  },

  vite: {
    plugins: [tailwindcss()]
  }
});