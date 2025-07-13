import { test, expect } from '@playwright/test';
import { WikiHomePage } from '../pages/WikiHomePage';
import { WikiMainPage } from '../pages/WikiMainPage1';

test('Избранная статья содержит заголовок и параграф', async ({ page }) => {
  const home = new WikiHomePage(page);
  await home.goto();
  await home.chooseLanguage();

  const wiki = new WikiMainPage(page);
  await wiki.openFeaturedArticle();

  const heading = wiki.getFeaturedHeading();
  await expect(heading).toBeVisible();

  const paragraphs = wiki.getFeaturedParagraphs();
  const count = await paragraphs.count();
  expect(count).toBeGreaterThan(0);
});