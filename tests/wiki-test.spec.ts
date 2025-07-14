import { test, expect } from '@playwright/test';

test('Open Wikipedia and check title', async ({ page }) => {
  await page.goto('https://www.wikipedia.org');
  await expect(page).toHaveTitle(/Wikipedia/);
});