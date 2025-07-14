import { test, expect } from '@playwright/test';

test('Открыть главную страницу, перейти на русский и кликнуть Порталы', async ({ page }) => {
  
  await page.goto('https://www.wikipedia.org');

  await page.getByRole('link', { name: 'Русский' }).click();

  await page.getByRole('link', {name: 'Порталы'}).click();

  const heading = await page.locator('h1#firstHeading').textContent();
  console.log('Заголовок:', heading);
  expect(heading).toContain('Портал');
});