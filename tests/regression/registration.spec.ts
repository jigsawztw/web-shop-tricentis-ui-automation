import { test } from '../../src/helpers/fixtures/user.fixture';
import { RegisterSuccessPage } from '../../src/pages/register-success.page';

test.describe('Регистрация пользователя', () => {
  test('TC-REGISTER-04: Успешная регистрация пользователя', async ({ app, baseBuilder }) => {
    const user = baseBuilder.build();
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

  test('TC-REGISTER-05: Невалидный email', async ({ app, baseBuilder }) => {
    const userWithInvalidEmail = baseBuilder.withEmail('@s').build();

    await app.register.openPageAndCheckFields();

    await app.register.expectRegisterValidationError(userWithInvalidEmail, 'Email', /wrong email/i);
  });

  test('TC-REGISTER-06: Email не заполнен', async ({ app, baseBuilder }) => {
    const userWithEmptyEmail = baseBuilder.withEmail('').build();

    await app.register.openPageAndCheckFields();

    await app.register.expectRegisterValidationError(userWithEmptyEmail, 'Email', /email is required./i);
  });

  test('TC-REGISTER-07: Имя не заполнено', async ({ app, baseBuilder }) => {
    const userWithEmptyName = baseBuilder.withFirstName('').build();

    await app.register.openPageAndCheckFields();

    await app.register.expectRegisterValidationError(userWithEmptyName, 'FirstName', /first name is required./i);
  });

  test('TC-REGISTER-08: Фамилия не заполнена', async ({ app, baseBuilder }) => {
    const userWithEmptyLastName = baseBuilder.withLastName('').build();

    await app.register.openPageAndCheckFields();

    await app.register.expectRegisterValidationError(userWithEmptyLastName, 'LastName', /last name is required./i);
  });

  test('TC-REGISTER-09: Пароль не заполнен', async ({ app, baseBuilder }) => {
    const userWithEmptyPw = baseBuilder.withPassword('').build();

    await app.register.openPageAndCheckFields();

    await app.register.expectRegisterValidationError(userWithEmptyPw, 'Password', /password is required./i);
  });

  test('TC-REGISTER-10: Пароль не совпадает', async ({ app, baseBuilder }) => {
    const user = baseBuilder.build();

    await app.register.openPageAndCheckFields();

    await app.register.expectRegisterValidationError(
      user,
      'ConfirmPassword',
      /the password and confirmation password do not match./i,
      user.password + '1',
    );
  });

  test('TC-REGISTER-11: Пароль не проходит по длине', async ({ app, baseBuilder }) => {
    const userWithShortPw = baseBuilder.withPassword('12345').build();

    await app.register.openPageAndCheckFields();

    await app.register.expectRegisterValidationError(
      userWithShortPw,
      'Password',
      /The password should have at least 6 characters./i,
    );
  });
});
