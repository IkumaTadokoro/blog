/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
	define: {
		'import.meta.vitest': false,
	},
	test: {
		globals: true,
		includeSource: ['src/**/*.{ts,tsx,js,jsx}'],
	},
});
