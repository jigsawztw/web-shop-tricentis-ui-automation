import { test } from '@playwright/test';
import { UserBuilder } from '../src/helpers/builders/userBuilder';
import { AppFacade } from '../src/pages/index';
import { allure } from 'allure-playwright';
import { Severity } from 'allure-js-commons';
import { RegisterSuccessPage } from '../src/pages/register-success.page';

let app: AppFacade;
let successPage: RegisterSuccessPage;

test.describe('Регистрация пользователя', () => {
  test.beforeEach(async ({ page }) => {
    await allure.owner('Ivan Osipov');
    await allure.epic('Registration');
    await allure.feature('Register');
    await allure.tags('regression');
    app = new AppFacade(page);
  });

  test('TC-REGRESSION-REGISTER-04: Успешная регистрация пользователя', async () => {
    await allure.story('Successful registration');
    await allure.severity(Severity.CRITICAL);
    const user = new UserBuilder().build();

    await allure.step('Открыть страницу регистрации', async () => {
      await app.register.openRegisterPage();
    });
    await allure.step('Зарегистрировать нового пользователя', async () => {
      successPage = await app.register.registerUser(user);
    });
    await allure.step('Проверить успешную регистрацию', async () => {
      await successPage.checkSuccess(user.email);
    });
  });

  test('TC-REGRESSION-REGISTER-05: Невалидный email', async () => {
    await allure.story('invalid email');
    const user = new UserBuilder().withEmail('@s').build();

    await allure.step('Открыть страницу регистрации', async () => {
      await app.register.openRegisterPage();
    });
    await allure.step('Попытка регистрации с невалидным email', async () => {
      await app.register.registerUserWithError(user, 'Email', /wrong email/i);
    });
  });

  test('TC-REGRESSION-REGISTER-06: Email не заполнен', async () => {
    await allure.story('empty email');
    const user = new UserBuilder().withEmail('').build(); //пустой email

    await allure.step('Открыть страницу регистрации', async () => {
      await app.register.openRegisterPage();
    });
    await allure.step('Попытка регистрации с незаполненным email', async () => {
      await app.register.registerUserWithError(user, 'Email', /email is required./i);
    });
  });

  test('TC-REGRESSION-REGISTER-07: Имя не заполнено', async () => {
    await allure.story('empty name');
    const user = new UserBuilder().withFirstName('').build(); //пустое имя

    await allure.step('Открыть страницу регистрации', async () => {
      await app.register.openRegisterPage();
    });
    await allure.step('Попытка регистрации с незаполненным именем', async () => {
      await app.register.registerUserWithError(user, 'FirstName', /first name is required./i);
    });
  });

  test('TC-REGRESSION-REGISTER-08: Фамилия не заполнена', async () => {
    await allure.story('empty lastname');
    const user = new UserBuilder().withLastName('').build(); //пустая фамилия

    await allure.step('Открыть страницу регистрации', async () => {
      await app.register.openRegisterPage();
    });
    await allure.step('Попытка регистрации с незаполненной фамилией', async () => {
      await app.register.registerUserWithError(user, 'LastName', /last name is required./i);
    });
  });

  test('TC-REGRESSION-REGISTER-09: Пароль не заполнен', async () => {
    await allure.story('empty password');
    const user = new UserBuilder().withPassword('').build(); //пустой пароль

    await allure.step('Открыть страницу регистрации', async () => {
      await app.register.openRegisterPage();
    });
    await allure.step('Попытка регистрации с пустым паролем', async () => {
      await app.register.registerUserWithError(user, 'Password', /password is required./i);
    });
  });

  test('TC-REGRESSION-REGISTER-10: Пароль не совпадает', async () => {
    await allure.story('not confirmed password');
    const user = new UserBuilder().build();
    const notMatchedConfirmPassword = user.password + '1';

    await allure.step('Открыть страницу регистрации', async () => {
      await app.register.openRegisterPage();
    });
    await allure.step('Попытка регистрации с некорректно введенным паролем', async () => {
      await app.register.registerUserWithError(
        user,
        'ConfirmPassword',
        /the password and confirmation password do not match./i,
        notMatchedConfirmPassword,
      );
    });
  });

  test('TC-REGRESSION-REGISTER-11: Пароль не проходит по длине', async () => {
    await allure.story('not valid password');
    const user = new UserBuilder().withPassword('12345').build(); //6 символов минимум

    await allure.step('Открыть страницу регистрации', async () => {
      await app.register.openRegisterPage();
    });
    await allure.step('Попытка регистрации с коротким паролем', async () => {
      await app.register.registerUserWithError(user, 'Password', /the password should have at least 6 characters./i);
    });
  });
});
