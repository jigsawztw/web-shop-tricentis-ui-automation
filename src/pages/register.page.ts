import { BasePage } from "./base.page";
import { Page, Locator, expect } from "@playwright/test";

export class RegisterPage extends BasePage {
  protected path = "/register";

  readonly registerButton: Locator;
  readonly formHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.registerButton = page.locator("#register-button");
    this.formHeading = page.getByText("Your Personal Details");
  }

  async openAndCheckForm() {
    await this.open();
    await expect(this.formHeading).toBeVisible();
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
  async register() {
    await this.registerButton.click();
  }
}
