import { defineConfig, devices } from '@playwright/test';

export const baseURL = 'http://localhost:4321';

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		baseURL,
		video: process.env.VIDEO ? 'on' : 'retain-on-failure',
		trace: 'on-first-retry',
		headless: !process.env.UI,
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
		{
			name: 'Mobile Chrome',
			use: { ...devices['Pixel 7'] },
		},
		{
			name: 'Mobile Safari',
			use: { ...devices['iPhone 14'] },
		},
	],

	webServer: {
		command: 'pnpm preview:local',
		url: baseURL,
		reuseExistingServer: !process.env.CI,
	},
});
