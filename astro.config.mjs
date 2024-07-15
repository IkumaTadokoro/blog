import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import icon from "astro-icon";
import { expressiveCodePlugin } from './src/utils/markdown';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), icon(), expressiveCodePlugin],
});