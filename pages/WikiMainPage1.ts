import { Page, Locator } from '@playwright/test';

/** Главная страница русской Википедии (работа с Избранной статьей) */
export class WikiMainPage {
  readonly page: Page;

constructor(page: Page) {
    this.page = page;
  }

  /** Открыть блок «Избранная статья» */
    async openFeaturedArticle() {
    // На главной перейти по ссылке «Избранные статьи»
    await this.page.getByRole('link', { name: 'Избранные статьи' }).click();
    }

  /** Получить заголовок страницы «Избранные статьи» */
  getFeaturedHeading(): Locator {
    return this.page.locator('#firstHeading');
  }

  /** Получить параграфы текста */
  getFeaturedParagraphs(): Locator {
    return this.page.locator('#mw-content-text p');
  }
}

