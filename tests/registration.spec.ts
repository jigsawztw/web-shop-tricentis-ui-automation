import { test, expect } from "@playwright/test";
import { userFactory } from "../factories/userFactory";
import type { User } from "../types/user";
import { RegisterPage, MainPage } from "../src/pages/index";

test.describe("Регистрация пользователя", () => {
  let user: User;
  test.beforeEach(async ({ page }) => {
    user = userFactory.createByDefault();
  });

  test("TC-REGRESSION-04: Успешная регистрация пользователя", async ({
    page,
  }) => {
    // 1. Создали экземпляр страницы
    const mainPage = new MainPage(page);
    await mainPage.open();
    await mainPage.goToRegisterPage();
    const registerPage = new RegisterPage(page);
    await registerPage.open();
    await registerPage.fillRegisterFields({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });
    await page.locator("#register-button").click();
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

    await page.locator("#gender-female").click();
    await page.fill("#FirstName", user.firstName);
    await page.fill("#LastName", user.lastName);
    await page.fill("#Email", user.email);
    await page.fill("#Password", user.password);
    await page.fill("#ConfirmPassword", user.password);
    await page.locator("#register-button").click();

    await expect(page.locator(".field-validation-error span")).toHaveText(
      /wrong email/i,
    );
  });

  test("TC-REGRESSION-06: Пустой Email", async ({ page }) => {
    user.email = "";

    await page.locator("#gender-female").click();
    await page.fill("#FirstName", user.firstName);
    await page.fill("#LastName", user.lastName);
    await page.fill("#Email", user.email);
    await page.fill("#Password", user.password);
    await page.fill("#ConfirmPassword", user.password);
    await page.locator("#register-button").click();

    await expect(page.locator(".field-validation-error span")).toHaveText(
      /email is required./i,
    );
  });
});
