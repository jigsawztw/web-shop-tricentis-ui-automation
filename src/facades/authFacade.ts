import { Page } from '@playwright/test';
import { LoginPage, MainPage } from '../pages';
import type { User } from '../../types/user';

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
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
      await logoutButton.waitFor({ state: 'hidden' });
    }
  }
}
