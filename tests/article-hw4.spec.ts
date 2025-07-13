import { test, expect } from '@playwright/test';
import { WikiHomePage } from '../pages/WikiHomePage';
import { WikiMainPage } from '../pages/WikiMainPage';
import fs from 'fs';
import path from 'path';

test('Случайная статья на Википедии — заголовок, параграфы, ссылки и скриншот', async ({ page }) => {
  const home = new WikiHomePage(page);
  await home.goto();
  await home.chooseLanguage();

  const wiki = new WikiMainPage(page);
  await wiki.openRandomArticle();

  const heading = page.locator('#firstHeading');

  await expect(heading).toBeVisible();
  const title = (await heading.textContent())?.trim() || 'unknown-article';
  console.log('Заголовок статьи:', title);

  const paragraphs = page.locator('p');
  const paragraphCount = await paragraphs.count();
  console.log('Количество параграфов:', paragraphCount);
  expect(paragraphCount).toBeGreaterThan(0);

  const firstParagraphText = await paragraphs.first().textContent();
  expect(firstParagraphText?.trim().length).toBeGreaterThan(0);

  const internalLinks = page.locator('a[href^="/wiki/"]');
  const internalLinkCount = await internalLinks.count();
  console.log('Количество внутренних ссылок:', internalLinkCount);
  expect(internalLinkCount).toBeGreaterThan(0);

  const safeTitle = title.replace(/[<>:"/\\|?*]/g, '').replace(/\s+/g, '_');
  const screenshotPath = path.join('screenshots', `${safeTitle}.png`);

  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Скриншот сохранен: ${screenshotPath}`);
});