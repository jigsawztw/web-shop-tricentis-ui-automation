import { test } from '@playwright/test';
import { UserBuilder } from '../../src/helpers/builders/userBuilder';
import { AppFacade } from '../../src/pages/index';
import { RegisterSuccessPage } from '../../src/pages/register-success.page';

let app: AppFacade;
let successPage: RegisterSuccessPage;

test.describe('Регистрация пользователя', () => {
  test.beforeEach(async ({ page }) => {
    app = new AppFacade(page);
  });

  test('TC-REGISTER-04: Успешная регистрация пользователя', async ({ }) => {
    const user = new UserBuilder().build();

    await test.step('Открыть страницу регистрации', async () => {
      await app.register.openRegisterPageAndCheckFields();
    });

    await test.step('Зарегистрировать нового пользователя', async () => {
      successPage = await app.register.registerUser(user);
    });

    await test.step('Проверить успешную регистрацию', async () => {
      await successPage.checkSuccess(user.email);
    });
  });

  test('TC-REGISTER-05: Невалидный email', async ({ }) => {
    const user = new UserBuilder().withEmail('@s').build();

    await test.step('Открыть страницу регистрации', async () => {
      await app.register.openRegisterPageAndCheckFields();
    });

    await test.step('Ошибка регистрации с невалидным email', async () => {
      await app.register.registerUserWithError(user, 'Email', /wrong email/i);
    });
  });

  test('TC-REGISTER-06: Email не заполнен', async ({ }) => {
    const user = new UserBuilder().withEmail('').build();

    await test.step('Открыть страницу регистрации', async () => {
      await app.register.openRegisterPageAndCheckFields();
    });

    await test.step('Ошибка регистрации с незаполненным email', async () => {
      await app.register.registerUserWithError(user, 'Email', /email is required./i);
    });
  });

  test('TC-REGISTER-07: Имя не заполнено', async ({ }) => {
    const user = new UserBuilder().withFirstName('').build();

    await test.step('Открыть страницу регистрации', async () => {
      await app.register.openRegisterPageAndCheckFields();
    });

    await test.step('Ошибка регистрации с незаполненным именем', async () => {
      await app.register.registerUserWithError(user, 'FirstName', /first name is required./i);
    });
  });

  test('TC-REGISTER-08: Фамилия не заполнена', async ({ }) => {
    const user = new UserBuilder().withLastName('').build();

    await test.step('Открыть страницу регистрации', async () => {
      await app.register.openRegisterPageAndCheckFields();
    });

    await test.step('Ошибка регистрации с незаполненной фамилией', async () => {
      await app.register.registerUserWithError(user, 'LastName', /last name is required./i);
    });
  });

  test('TC-REGISTER-09: Пароль не заполнен', async ({ }) => {
    const user = new UserBuilder().withPassword('').build();

    await test.step('Открыть страницу регистрации', async () => {
      await app.register.openRegisterPageAndCheckFields();
    });

    await test.step('Ошибка регистрации с пустым паролем', async () => {
      await app.register.registerUserWithError(user, 'Password', /password is required./i);
    });
  });

  test('TC-REGISTER-10: Пароль не совпадает', async ({ }) => {
    const user = new UserBuilder().build();
    const notMatchedConfirmPassword = user.password + '1';

    await test.step('Открыть страницу регистрации', async () => {
      await app.register.openRegisterPageAndCheckFields();
    });

    await test.step('Ошибка регистрации с некорректно введенным паролем', async () => {
      await app.register.registerUserWithError(
        user,
        'ConfirmPassword',
        /the password and confirmation password do not match./i,
        notMatchedConfirmPassword,
      );
    });
  });

  test('TC-REGISTER-11: Пароль не проходит по длине', async ({ }) => {
    const user = new UserBuilder().withPassword('12345').build();

    await test.step('Открыть страницу регистрации', async () => {
      await app.register.openRegisterPageAndCheckFields();
    });

    await test.step('Ошибка регистрации с коротким паролем', async () => {
      await app.register.registerUserWithError(
        user,
        'Password',
        /the password should have at least 6 characters./i
      );
    });
  });
});