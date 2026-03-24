import { test, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { UserBuilder } from '../../src/helpers/builders/userBuilder';
import { AppFacade, LoginSuccessPage } from '../../src/pages/index';
import { User } from '../../types/user';

let user: User;
let browser: Browser;
let context: BrowserContext;
let page: Page;
let app: AppFacade;
let successLoginPage: LoginSuccessPage;

test.describe('Логин пользователя', () => {
  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext();
    page = await context.newPage();
    app = new AppFacade(page);

    user = new UserBuilder().build();

    await app.register.openPageAndCheckFields();
    await app.register.registerUser(user);

    await app.auth.logout();
  });

  test.beforeEach(async () => {
    app = new AppFacade(page);
    await app.auth.logout();
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test('TC-LOGIN-01: Успешный логин', async () => {
    await test.step('Открыть страницу авторизации', async () => {
      await app.auth.openPageAndCheckFields();
    });

    await test.step('Авторизовать пользователя', async () => {
      successLoginPage = await app.auth.loginUser(user.email, user.password);
    });

    await test.step('Проверить авторизацию пользователя', async () => {
      await successLoginPage.checkLoggedIn(user.email);
    });
  });

  test('TC-LOGIN-02: Невалидный пароль', async () => {
    const wrongPassword = user.password + '1';

    await test.step('Открыть страницу авторизации', async () => {
      await app.auth.openPageAndCheckFields();
    });

    await test.step('Ошибка авторизации с невалидным паролем', async () => {
      await app.auth.expectLoginValidationError(user.email, wrongPassword, /the credentials provided are incorrect/i);
    });
  });

  test('TC-LOGIN-03: Email не существует', async () => {
    const nonExistentEmail = 'notexisted@mail.ru';

    await test.step('Открыть страницу авторизации', async () => {
      await app.auth.openPageAndCheckFields();
    });

    await test.step('Ошибка авторизации с несуществующим email', async () => {
      await app.auth.expectLoginValidationError(nonExistentEmail, user.password, /no customer account found/i);
    });
  });

  test('TC-LOGIN-04: Email не валидный', async () => {
    await test.step('Открыть страницу авторизации', async () => {
      await app.auth.openPageAndCheckFields();
    });

    await app.auth.loginUser(user.email + '1', user.password);

    await test.step('Ошибка авторизации с невалидным email', async () => {
      const emailError = page.locator('span.field-validation-error', {
        hasText: 'Please enter a valid email address.',
      });

      await expect(emailError).toBeVisible();
    });
  });
});
