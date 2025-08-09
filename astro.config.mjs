import { defineConfig, passthroughImageService } from "astro/config";
import react from "@astrojs/react";
import icon from "astro-icon";
import {
  expressiveCodePlugin,
  remarkPlugins,
  rehypePlugins,
} from "./src/shared/config/markdown";
import { SITE } from "./src/shared/config/site";
import simpleScope from "vite-plugin-simple-scope";
// import mdx from "@astrojs/mdx"; // MDXサポートを削除
import tailwindcss from "@tailwindcss/vite";
import og from "astro-og";
import typesafeRoutes from "astro-typesafe-routes";

// https://astro.build/config
export default defineConfig({
  site: SITE.siteUrl,
  integrations: [
    react(),
    icon(),
    expressiveCodePlugin,
    // mdx(), // MDXサポートを削除
    og(),
    typesafeRoutes(),
  ],
  markdown: {
    remarkPlugins,
    rehypePlugins,
  },
  image: {
    service: passthroughImageService(),
  },
  vite: {
    plugins: [tailwindcss(), simpleScope()],
  },
});
