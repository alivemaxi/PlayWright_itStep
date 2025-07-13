import { test, expect } from '@playwright/test';
import { WikiHomePage } from '../pages/WikiHomePage';
import { WikiMainPage } from '../pages/WikiMainPage';

test('Избранная статья — содержит заголовок и абзац', async ({ page }) => {
  const home = new WikiHomePage(page);
  await home.goto();
  await home.chooseLanguage();

  const wiki = new WikiMainPage(page);

  const featuredBlock = wiki.getFeaturedArticleBlock();

  // Проверить, что блок "Избранная статья" видим
  await expect(featuredBlock).toBeVisible();

  // Проверить, что есть заголовок внутри блока
  const heading = featuredBlock.locator('b a'); // Обычно заголовок - это ссылка в <b>
  await expect(heading).toBeVisible();

  // Проверить, что есть хотя бы один абзац
  const paragraphs = featuredBlock.locator('p');
  const paragraphCount = await paragraphs.count();
  console.log('Параграфов в избранной статье:', paragraphCount);
  expect(paragraphCount).toBeGreaterThan(0);
});