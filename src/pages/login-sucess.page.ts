import { BasePage } from "./index";
import { Page, Locator, expect } from "@playwright/test";

export class LoginSuccessPage extends BasePage {
  readonly accountEmail: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.accountEmail = page.locator(".header .account");
    this.logoutLink = page.getByRole("link", { name: "Log out" });
  }

  async checkLoggedIn(userEmail: string) {
    await expect(this.accountEmail).toHaveText(userEmail);
    await expect(this.logoutLink).toBeEnabled();
  }
}
