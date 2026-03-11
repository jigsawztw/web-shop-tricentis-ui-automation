import { test, expect } from "@playwright/test";
import { userFactory } from "../factories/userFactory";
import { openRegistrationForm } from "../helpers/registrationHelper";

test.describe("Регистрация пользователя", () => {
  test.beforeEach(async ({ page }) => {
    // 2. Открытие формы регистрации
    await openRegistrationForm(page);
  });

  test("TC-REGRESSION-04: Успешная регистрация пользователя", async ({
    page,
  }) => {
    // 1. Генерация тестового пользователя
    const user = userFactory.createByDefault();
    // 2. Заполняем поля формы
    await page.locator("#gender-male").click();
    await page.fill("#FirstName", user.firstName);
    await page.fill("#LastName", user.lastName);
    await page.fill("#Email", user.email);
    await page.fill("#Password", user.password);
    await page.fill("#ConfirmPassword", user.password);

    // 3. Кликаем на кнопку регистрации
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
    const user = userFactory.createWithOverride({ email: "@s" });

    await openRegistrationForm(page);

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
    const user = userFactory.createWithOverride({ email: "" });

    await openRegistrationForm(page);

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
