import { expect } from "@playwright/test";
import { Page } from "@playwright/test";

export async function openRegistrationForm(page: Page) {
  // Переход на главную страницу и открытие формы регистрации
  await page.goto("https://demowebshop.tricentis.com/", {
    waitUntil: "domcontentloaded",
  });
  await page.locator("a.ico-register", { hasText: "Register" }).click();

  // Проверка, что форма видна и кнопка доступна
  await page.getByText("Your Personal Details").isVisible();
  await expect(page.getByRole("button", { name: "Register" })).toBeEnabled();
}
