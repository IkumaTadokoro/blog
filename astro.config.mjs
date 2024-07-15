import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import icon from "astro-icon";
import { expressiveCodePlugin, rehypePlugins } from './src/utils/markdown';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), icon(), expressiveCodePlugin],
  markdown: {
    rehypePlugins,
  },
  image: {
    service: passthroughImageService(),
  },
});