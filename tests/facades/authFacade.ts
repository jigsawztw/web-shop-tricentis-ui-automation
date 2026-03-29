import { Page, expect } from '@playwright/test';
import { LoginPage, MainPage } from '../../src/pages/index';
import type { User } from '../../src/models/user';

export class AuthFacade {
  private loginPage: LoginPage;
  private mainPage: MainPage;

  constructor(private page: Page) {
    this.loginPage = new LoginPage(page);
    this.mainPage = new MainPage(page);
  }

  async openPageAndCheckFields() {
    await this.mainPage.open();
    await this.mainPage.goToLoginPage();
    await this.loginPage.checkLoginFormFields();
  }

  async loginUser(email: string, password: string) {
    await this.loginPage.fillLoginFields({ email, password } as User);
    return await this.loginPage.login();
  }

  async expectLoginValidationError(email: string, password: string, error: RegExp) {
    await this.loginUser(email, password);
    await this.loginPage.expectValidationError(error);
  }

  async logout() {
    const logoutButton = this.page.locator('a.ico-logout');
    const loginButton = this.page.locator('a.ico-login');

    try {
      await logoutButton.waitFor({ state: 'visible' });
      await logoutButton.click();
      await logoutButton.waitFor({ state: 'hidden' });
    } catch (e) {
      console.log('Logout button not visible, skipping logout');
    }

    await loginButton.waitFor({ state: 'visible' });
  }
}
