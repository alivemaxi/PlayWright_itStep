import { Locator, Page } from '@playwright/test'; 
 
/** Главная страница русской Википедии */ 
export class WikiMainPage { 
  constructor(private page: Page) {} 
 
  /** Переход к случайной статье */ 
  async openRandomArticle() { 
    await this.page.getByRole('link', { name: 'Случайная статья' }).click(); 
  }
  getFeaturedArticleBlock(): Locator {
    return this.page.locator('#mp-tfa'); // ID блока "Избранная статья"
  } 
} 