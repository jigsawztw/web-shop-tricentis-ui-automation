import {
  test,
  expect,
  chromium,
  Browser,
  BrowserContext,
  Page,
} from "@playwright/test";
import {allure } from "allure-playwright";
import { Severity } from "allure-js-commons";
import { UserBuilder } from "../src/helpers/builders/userBuilder";
import { AppFacade } from "../src/pages/index";
import { User } from "../types/user";
import playwrightConfig from "../playwright.config";

let user: User;
let browser: Browser;
let context: BrowserContext;
let page: Page;
let app: AppFacade;

test.describe("Логин пользователя", () => {
  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext();
    page = await context.newPage();
    app = new AppFacade(page);

    user = new UserBuilder().build();

    await app.register.openRegisterPage();
    await app.register.registerUser(user);

    await app.auth.logout();
  });

  test.beforeEach(async () => {
    await allure.tags("regression");
    app = new AppFacade(page);
    await app.auth.logout();
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test("TC-REGRESSION-LOGIN-01: Успешный логин", async () => {
    await allure.owner("Ivan Osipov")
    await allure.severity(Severity.CRITICAL)
    await app.auth.openLoginPage();
    const successLoginPage = await app.auth.loginUser(user);
    await successLoginPage.checkLoggedIn(user.email);
  });

  test("TC-REGRESSION-LOGIN-02: Невалидный пароль", async () => {
    await app.auth.openLoginPage();
    const wrongPassword = user.password + "1";
    await app.auth.loginUserWithError(
      user.email,
      wrongPassword,
      /the credentials provided are incorrect/i,
    );
  });

  test("TC-REGRESSION-LOGIN-03: Email не существует", async () => {
    await app.auth.openLoginPage();
    const nonExistentEmail = "notexisted@mail.ru";
    await app.auth.loginUserWithError(
      nonExistentEmail,
      user.password,
      /no customer account found/i,
    );
  });

  test("TC-REGRESSION-LOGIN-04: Email не валидный", async () => {
    await app.auth.openLoginPage();
    const invalidUser = { ...user, email: user.email + "1" };
    await app.auth.loginUser(invalidUser);
    const emailError = page.locator("span.field-validation-error", {
      hasText: "Please enter a valid email address.",
    });
    await expect(emailError).toBeVisible();
  });
});
