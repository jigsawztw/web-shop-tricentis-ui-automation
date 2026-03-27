import { test } from '../../src/helpers/fixtures/user.fixture';
import { RegisterSuccessPage } from '../../src/pages/register-success.page';

test.describe('Регистрация пользователя', () => {

  test('TC-REGISTER-04: Успешная регистрация пользователя', async ({ app, user }) => {
    let successPage: RegisterSuccessPage;

    await test.step('Открыть страницу регистрации', async () => {
      await app.register.openPageAndCheckFields();
    });

    await test.step('Зарегистрировать нового пользователя', async () => {
      successPage = await app.register.registerUser(user);
    });

    await test.step('Проверить успешную регистрацию', async () => {
      await successPage.checkRegisterSuccess(user.email);
    });
  });

  test('TC-REGISTER-05: Невалидный email', async ({ app, user }) => {
    user.email = '@s';

    await app.register.openPageAndCheckFields();

    await app.register.expectRegisterValidationError(
      user,
      'Email',
      /wrong email/i
    );
  });

  test('TC-REGISTER-06: Email не заполнен', async ({ app, user }) => {
    user.email = '';

    await app.register.openPageAndCheckFields();

    await app.register.expectRegisterValidationError(
      user,
      'Email',
      /email is required./i
    );
  });

  test('TC-REGISTER-07: Имя не заполнено', async ({ app, user }) => {
    user.firstName = '';

    await app.register.openPageAndCheckFields();

    await app.register.expectRegisterValidationError(
      user,
      'FirstName',
      /first name is required./i
    );
  });

  test('TC-REGISTER-08: Фамилия не заполнена', async ({ app, user }) => {
    user.lastName = '';

    await app.register.openPageAndCheckFields();

    await app.register.expectRegisterValidationError(
      user,
      'LastName',
      /last name is required./i
    );
  });

  test('TC-REGISTER-09: Пароль не заполнен', async ({ app, user }) => {
    user.password = '';

    await app.register.openPageAndCheckFields();

    await app.register.expectRegisterValidationError(
      user,
      'Password',
      /password is required./i
    );
  });

  test('TC-REGISTER-10: Пароль не совпадает', async ({ app, user }) => {
    const notMatchedConfirmPassword = user.password + '1';

    await app.register.openPageAndCheckFields();

    await app.register.expectRegisterValidationError(
      user,
      'ConfirmPassword',
      /the password and confirmation password do not match./i,
      notMatchedConfirmPassword
    );
  });

  test('TC-REGISTER-11: Пароль не проходит по длине', async ({ app, user }) => {
    user.password = '12345';

    await app.register.openPageAndCheckFields();

    await app.register.expectRegisterValidationError(
      user,
      'Password',
      /the password should have at least 6 characters./i
    );
  });

});