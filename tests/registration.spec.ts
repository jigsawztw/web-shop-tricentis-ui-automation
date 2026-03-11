import { test, expect } from "@playwright/test";
import { userFactory } from "../factories/userFactory";
import type { User } from "../types/user";
import { RegisterPage, MainPage } from "../src/pages/index";

test.describe("Регистрация пользователя", () => {
  let user: User;
  let mainPage: MainPage;
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    user = userFactory.createByDefault();

    mainPage = new MainPage(page);
    registerPage = new RegisterPage(page);
  });

  test("TC-REGRESSION-04: Успешная регистрация пользователя", async ({
    page,
  }) => {
    await mainPage.open();
    await mainPage.goToRegisterPage();

    await registerPage.openAndCheckForm();
    await registerPage.fillRegisterFields({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });
    await registerPage.register();
    // 4. Проверяем успешную регистрацию
    await expect(
      page.getByRole("heading", { level: 1, name: "Register" }),
    ).toBeVisible();
    await expect(page.locator(".result")).toHaveText(
      "Your registration completed",
    );
    await expect(page.getByRole("button", { name: "Continue" })).toBeEnabled();
    await expect(page.locator(".account", { hasText: user.email })).toHaveText(
      user.email,
    );
    await expect(page.getByRole("link", { name: "Log out" })).toBeEnabled();
  });

  test("TC-REGRESSION-05: Невалидный email", async ({ page }) => {
    user.email = "@s";

    await mainPage.open();
    await mainPage.goToRegisterPage();

    await registerPage.openAndCheckForm();
    await registerPage.fillRegisterFields({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });
    await registerPage.register();

    await expect(page.locator(".field-validation-error span")).toHaveText(
      /wrong email/i,
    );
  });

  test("TC-REGRESSION-06: Пустой Email", async ({ page }) => {
    user.email = "";

    await mainPage.open();
    await mainPage.goToRegisterPage();

    await registerPage.openAndCheckForm();
    await registerPage.fillRegisterFields({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });
    await registerPage.register();

    await expect(page.locator(".field-validation-error span")).toHaveText(
      /email is required./i,
    );
  });
});
