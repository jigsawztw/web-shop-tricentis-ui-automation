import { BasePage } from "./base.page";
import { Page, Locator } from "@playwright/test";

export class MainPage extends BasePage {
  protected path = "/";

  readonly registerLink: Locator;

  constructor(page: Page) {
    super(page);
    this.registerLink = this.registerLink = page.getByRole("link", {
      name: "Register",
    });
  }

  async goToRegisterPage() {
    await this.registerLink.click();
  }
}
