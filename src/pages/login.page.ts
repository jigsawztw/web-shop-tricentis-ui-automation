import { BasePage, LoginSuccessPage } from './index';
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage extends BasePage {
  protected path = '/login';

  readonly loginButton: Locator;
  readonly formTitle: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeButton: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInput = page.locator('#Email');
    this.formTitle = page.getByRole('heading', {
      name: 'Welcome, Please Sign In!',
    });
    this.passwordInput = page.locator('#Password');
    this.rememberMeButton = page.locator('#RememberMe');
    this.forgotPasswordLink = page.locator('#forgot-password');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
  }

  async checkLoginFormFields() {
    await this.open();
    await expect(this.formTitle).toBeVisible();
    await expect(this.loginButton).toBeEnabled();
  }

  async fillLoginFields(user: { email: string; password: string }) {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
  }

  async login(): Promise<LoginSuccessPage> {
    await this.loginButton.click();
    return new LoginSuccessPage(this.page);
  }

  async expectLoginValidationError(message: string | RegExp) {
    const errorBlock = this.page.locator('.validation-summary-errors');

    await expect(errorBlock).toBeVisible();
    await expect(errorBlock).toContainText(message);
  }
}
