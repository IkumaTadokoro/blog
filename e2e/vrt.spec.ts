import { expect, test } from '@playwright/test';

test('VRT', async ({ page }) => {
	await page.goto('/', {
		waitUntil: 'networkidle',
	});
	await expect(page).toHaveScreenshot({
		fullPage: true,
		scale: 'device',
		maxDiffPixelRatio: 0.01,
	});
});
