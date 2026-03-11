import { BasePage } from "./base.page";
import { Page, Locator } from "@playwright/test";

export class RegisterPage extends BasePage {
  protected path = "/register";
  readonly genderMaleRadioBtn: Locator;
  readonly genderFemaleRadioBtn: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    super(page);
    this.genderMaleRadioBtn = page.locator("#gender-male");
    this.genderFemaleRadioBtn = page.locator("#gender-female");
    this.firstNameInput = page.locator("#FirstName");
    this.lastNameInput = page.locator("#LastName");
    this.emailInput = page.locator("#Email");
    this.passwordInput = page.locator("#Password");
    this.confirmPasswordInput = page.locator("#ConfirmPassword");
    this.registerButton = page.locator("#register-button");
  }

  async fillRegisterFields(user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    await this.genderFemaleRadioBtn.click();
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
  }
}
