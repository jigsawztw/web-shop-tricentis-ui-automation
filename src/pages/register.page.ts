import { BasePage } from "./base.page";
import { RegisterSuccessPage } from "./register-success.page";
import { Page, Locator, expect } from "@playwright/test";

export class RegisterPage extends BasePage {
  protected path = "/register";

  readonly registerButton: Locator;
  readonly formTitle: Locator;
  readonly genderFemale: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly emailError: Locator;

  constructor(page: Page) {
    super(page);

    this.registerButton = page.locator("#register-button");
    this.formTitle = page.getByText("Your Personal Details");
    this.genderFemale = page.locator("#gender-female");
    this.firstNameInput = page.getByLabel("First name");
    this.lastNameInput = page.getByLabel("Last name");
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.locator('input[name="Password"]');
    this.confirmPasswordInput = page.locator('input[name="ConfirmPassword"]');
    this.emailError = page.locator(".field-validation-error span")
  }

  async openAndCheckForm() {
    await this.open();
    await expect(this.formTitle).toBeVisible();
    await expect(this.registerButton).toBeEnabled();
  }

  async fillRegisterFields(user: { firstName: string; lastName: string; email: string; password: string }) {
    await this.genderFemale.click();
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
  }

  async register(): Promise<RegisterSuccessPage> {
    await this.registerButton.click();
    return new RegisterSuccessPage(this.page);
  }

  async expectEmailError(message: string | RegExp) {
    await expect(this.emailError).toHaveText(message);
  }
}
