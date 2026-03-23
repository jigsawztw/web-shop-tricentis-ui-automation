import { BasePage } from './index';
import { Page, Locator, expect } from '@playwright/test';

export class MainPage extends BasePage {
  protected path = '/';

  readonly registerLink: Locator;
  readonly loginLink: Locator;
  readonly welcomeHeader: Locator;


  constructor(page: Page) {
    super(page);
    this.registerLink = this.registerLink = page.getByRole('link', { name: 'Register' });
    this.loginLink = this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.welcomeHeader = page.locator('h2.topic-html-content-header');
  }

  async openPageAndCheckFields() {
    await this.open();
    await expect(this.registerLink).toBeEnabled();
    await expect(this.loginLink).toBeEnabled();
    await expect(this.welcomeHeader).toBeVisible();
  }

  async goToRegisterPage() {
    await this.registerLink.click();
  }

  async goToLoginPage() {
    await this.loginLink.click();
  }
}
