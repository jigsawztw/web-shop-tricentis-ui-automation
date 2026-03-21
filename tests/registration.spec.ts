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
    await registerPage.fillRegisterFields(user);
    const successPage = await registerPage.register();
    await successPage.checkSuccess(user.email);
  });

  test("TC-REGRESSION-05: Невалидный email", async ({ page }) => {
    user.email = "@s";

    await mainPage.open();
    await mainPage.goToRegisterPage();

    await registerPage.openAndCheckForm();
    await registerPage.fillRegisterFields(user);
    await registerPage.register();

    await registerPage.expectEmailError(/wrong email/i);
  });

  test("TC-REGRESSION-06: Пустой Email", async ({ page }) => {
    user.email = "";

    await mainPage.open();
    await mainPage.goToRegisterPage();

    await registerPage.openAndCheckForm();
    await registerPage.fillRegisterFields(user);
    await registerPage.register();
    await registerPage.expectEmailError(/email is required./i);
  });
});
