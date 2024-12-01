import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import icon from "astro-icon";
import { expressiveCodePlugin, rehypePlugins } from './src/utils/markdown';
import pagefind from "astro-pagefind";
import { SITE } from './src/config';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: SITE.siteUrl,
  integrations: [tailwind(), react(), icon(), expressiveCodePlugin, pagefind(), mdx()],
  markdown: {
    rehypePlugins,
  },
  image: {
    service: passthroughImageService(),
  },
  experimental: {
    contentIntellisense: true,
    contentLayer: true
  }
});
