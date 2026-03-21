import { BasePage } from "./base.page";
import { RegisterSuccessPage } from "./register-success.page";
import { Page, Locator, expect } from "@playwright/test";

export class RegisterPage extends BasePage {
  protected path = "/register";

  readonly registerButton: Locator;
  readonly formTitle: Locator;

  constructor(page: Page) {
    super(page);

    this.registerButton = page.locator("#register-button");
    this.formTitle = page.getByText("Your Personal Details");
  }

  async openAndCheckForm() {
    await this.open();
    await expect(this.formTitle).toBeVisible();
    await expect(this.registerButton).toBeEnabled();
  }

  async fillRegisterFields(user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    await this.page.locator("#gender-female").click();
    await this.page.fill("#FirstName", user.firstName);
    await this.page.fill("#LastName", user.lastName);
    await this.page.fill("#Email", user.email);
    await this.page.fill("#Password", user.password);
    await this.page.fill("#ConfirmPassword", user.password);
  }
  async register(): Promise<RegisterSuccessPage> {
  await this.registerButton.click();
  return new RegisterSuccessPage(this.page);
}
}
