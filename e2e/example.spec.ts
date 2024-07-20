import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('/');

	// Expect a title "to contain" a substring.
	const expectedTitle = 'ikuma-t';
	await expect(page).toHaveTitle(expectedTitle);
});
