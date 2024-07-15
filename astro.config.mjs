import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import icon from "astro-icon";
import { expressiveCodePlugin, rehypePlugins } from './src/utils/markdown';
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  build: {
    format: "file",
  },
  integrations: [tailwind(), react(), icon(), expressiveCodePlugin, pagefind()],
  markdown: {
    rehypePlugins,
  },
  image: {
    service: passthroughImageService(),
  },
});