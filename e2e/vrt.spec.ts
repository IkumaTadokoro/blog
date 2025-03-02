import { expect, test } from '@playwright/test';

const pages = ['/', '/blog', '/blog/markdown-sample', '/talk', '/search'] as const;

test('VRT', async ({ page }) => {
	for (const path of pages) {
		await page.goto(path, {
			waitUntil: 'networkidle',
		});
		await expect(page).toHaveScreenshot({
			fullPage: true,
			scale: 'device',
			maxDiffPixelRatio: 0.01,
		});
	}
});
