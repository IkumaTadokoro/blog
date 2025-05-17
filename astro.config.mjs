import { defineConfig, passthroughImageService } from "astro/config";
import react from "@astrojs/react";
import icon from "astro-icon";
import { expressiveCodePlugin, rehypePlugins } from "./src/shared/lib/markdown";
import { SITE } from "./src/shared/config/site";
import simpleScope from "vite-plugin-simple-scope";

import mdx from "@astrojs/mdx";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: SITE.siteUrl,
  integrations: [react(), icon(), expressiveCodePlugin, mdx()],

  markdown: {
    rehypePlugins,
  },

  image: {
    service: passthroughImageService(),
  },

  vite: {
    plugins: [tailwindcss(), simpleScope()],
  },
});
