import { expect } from '@playwright/test';
import { test } from '../fixtures/user.fixture';
import { LoginSuccessPage } from '../../src/pages';

test.describe('Логин пользователя', () => {
  test('TC-LOGIN-01: Успешный логин', async ({ app, registeredUser }) => {
    let successLoginPage: LoginSuccessPage;

    await test.step('Открыть страницу авторизации', async () => {
      await app.auth.openPageAndCheckFields();
    });

    await test.step('Авторизовать пользователя', async () => {
      successLoginPage = await app.auth.loginUser(registeredUser.email, registeredUser.password);
    });

    await test.step('Проверить авторизацию пользователя', async () => {
      await successLoginPage.checkLoggedIn(registeredUser.email);
    });
  });

  test('TC-LOGIN-02: Невалидный пароль', async ({ app, registeredUser }) => {
    const wrongPassword = registeredUser.password + '1';

    await test.step('Открыть страницу авторизации', async () => {
      await app.auth.openPageAndCheckFields();
    });

    await test.step('Ошибка авторизации с невалидным паролем', async () => {
      await app.auth.expectLoginValidationError(
        registeredUser.email,
        wrongPassword,
        /the credentials provided are incorrect/i,
      );
    });
  });

  test('TC-LOGIN-03: Email не существует', async ({ app, registeredUser }) => {
    const nonExistentEmail = 'notexisted@mail.ru';

    await test.step('Открыть страницу авторизации', async () => {
      await app.auth.openPageAndCheckFields();
    });

    await test.step('Ошибка авторизации с несуществующим email', async () => {
      await app.auth.expectLoginValidationError(
        nonExistentEmail,
        registeredUser.password,
        /no customer account found/i,
      );
    });
  });

  test('TC-LOGIN-04: Email не валидный', async ({ app, registeredUser, page }) => {
    await test.step('Открыть страницу авторизации', async () => {
      await app.auth.openPageAndCheckFields();
    });

    await app.auth.loginUser(registeredUser.email + '1', registeredUser.password);

    await test.step('Ошибка авторизации с невалидным email', async () => {
      const emailError = page.locator('span.field-validation-error', {
        hasText: 'Please enter a valid email address.',
      });

      await expect(emailError).toBeVisible();
    });
  });
});
