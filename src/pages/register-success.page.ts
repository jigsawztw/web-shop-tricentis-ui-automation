// register-success.page.ts
import { BasePage } from "./base.page";
import { Page, Locator, expect } from "@playwright/test";

export class RegisterSuccessPage extends BasePage {
  protected path = "/registerresult"; // можно не использовать

  readonly resultMessage: Locator;
  readonly continueButton: Locator;
  readonly accountEmail: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);

    this.resultMessage = page.locator(".result");
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.accountEmail = page.locator(".header .account")
    this.logoutLink = page.getByRole("link", { name: "Log out" });
  }

  async checkSuccess(userEmail: string) {
    await expect(this.resultMessage).toHaveText(
      "Your registration completed",
    );
    await expect(this.continueButton).toBeEnabled();
    await expect(this.accountEmail).toHaveText(userEmail);
    await expect(this.logoutLink).toBeEnabled();
  }
}