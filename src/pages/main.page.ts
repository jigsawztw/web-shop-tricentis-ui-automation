import { BasePage } from './index';
import { Page, Locator } from '@playwright/test';

export class MainPage extends BasePage {
  protected path = '/';

  readonly registerLink: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    super(page);
    this.registerLink = this.registerLink = page.getByRole('link', {
      name: 'Register',
    });
    this.loginLink = this.loginLink = page.getByRole('link', {
      name: 'Log in',
    });
  }

  async goToRegisterPage() {
    await this.registerLink.click();
  }

  async goToLoginPage() {
    await this.loginLink.click();
  }
}
