import { defineConfig, envField, passthroughImageService } from 'astro/config';
import react from "@astrojs/react";
import icon from "astro-icon";
import { expressiveCodePlugin, rehypePlugins } from './src/utils/markdown';
import { SITE } from './src/config';

import mdx from "@astrojs/mdx";

import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  site: SITE.siteUrl,
  integrations: [react(), icon(), expressiveCodePlugin, mdx(), auth()],

  markdown: {
    rehypePlugins,
  },

  image: {
    service: passthroughImageService(),
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: process.env.NODE_ENV === 'production'
      ? {
          'react-dom/server': 'react-dom/server.edge',
        }
      : undefined,
    }
  },

  adapter: cloudflare(),

  env: {
    schema:  {
      ADMIN_GITHUB_CLIENT_ID: envField.string({
        context: "server",
        access: "secret",
      }),
      ADMIN_GITHUB_CLIENT_SECRET: envField.string({
        context: "server",
        access: "secret",
      }),
      ADMIN_EMAIL: envField.string({
        context: "server",
        access: "secret",
      }),
      AUTH_TRUST_HOST: envField.boolean({
        context: "server",
        access: "secret"
      }),
      AUTH_SECRET: envField.string({
        context: "server",
        access: "secret"
      }),
    },
    validateSecrets: true,
  }
});
