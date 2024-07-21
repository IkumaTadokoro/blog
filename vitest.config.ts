/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
	// @ts-ignore
	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: ['vitest.setup.ts'],
		include: ['src/**/*.test.ts'],
	},
});
