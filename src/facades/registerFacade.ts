import { Page } from '@playwright/test';
import { MainPage, RegisterPage } from '../pages';
import type { User } from '../../types/user';

export class RegisterFacade {
  private mainPage: MainPage;
  private registerPage: RegisterPage;

  constructor(private page: Page) {
    this.mainPage = new MainPage(page);
    this.registerPage = new RegisterPage(page);
  }

  async openPageAndCheckFields() {
    await this.mainPage.open();
    await this.mainPage.goToRegisterPage();
    await this.registerPage.checkRegisterFormFields();
  }

  async registerUser(user: User, confirmPassword?: string) {
    await this.registerPage.fillRegisterFields(user, confirmPassword ?? user.password);
    return await this.registerPage.register();
  }

  async expectRegisterValidationError(user: User, field: string, error: RegExp, confirmPassword?: string) {
    await this.registerUser(user, confirmPassword);
    await this.registerPage.expectValidationError(field, error);
  }
}
