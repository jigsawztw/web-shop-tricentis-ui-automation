import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;
  protected baseUrl = 'https://demowebshop.tricentis.com';
  protected path!: string;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    if (!this.path) throw new Error('Path не задан в дочернем классе');
    await this.page.goto(`${this.baseUrl}${this.path}`, {
      waitUntil: 'domcontentloaded',
    });
  }
}
