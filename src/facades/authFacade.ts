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

  async openLoginPage() {
    await this.mainPage.open();
    await this.mainPage.goToLoginPage();
    await this.loginPage.checkLoginFormFields();
  }

  async loginUser(user: User) {
    await this.loginPage.fillLoginFields(user);
    return await this.loginPage.login();
  }

  async loginUserWithError(email: string, password: string, error: RegExp) {
    await this.loginPage.fillLoginFields({ email, password } as User);
    await this.loginPage.login();
    await this.loginPage.expectLoginValidationError(error);
  }

  async logout() {
    const logoutButton = this.page.locator('a.ico-logout');
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
      await logoutButton.waitFor({ state: 'hidden' });
    }
  }
}
