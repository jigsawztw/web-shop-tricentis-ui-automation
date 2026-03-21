import { test } from "@playwright/test";
import { UserBuilder } from "../factories/userBuilder";
import type { User } from "../types/user";
import { RegisterPage, MainPage } from "../src/pages/index";

test.describe("Регистрация пользователя", () => {
  let user: User;
  let mainPage: MainPage;
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    registerPage = new RegisterPage(page);
  });

  test("TC-REGRESSION-04: Успешная регистрация пользователя", async ({
    page,
  }) => {
    const user = new UserBuilder().build();

    await mainPage.open();
    await mainPage.goToRegisterPage();

    await registerPage.checkRegisterFormFields();
    await registerPage.fillRegisterFields(user);
    const registerSuccessPage = await registerPage.register();

    await registerSuccessPage.checkSuccess(user.email);
  });

  test("TC-REGRESSION-05: Невалидный email", async ({ page }) => {
    const user = new UserBuilder().withEmail("@s").build(); //невалидный email

    await mainPage.open();
    await mainPage.goToRegisterPage();

    await registerPage.checkRegisterFormFields();
    await registerPage.fillRegisterFields(user);
    await registerPage.register();

    await registerPage.expectFieldValidationError("Email", /wrong email/i);
  });

  test("TC-REGRESSION-06: Email не заполнен", async ({ page }) => {
    const user = new UserBuilder().withEmail("").build(); //пустой email

    await mainPage.open();
    await mainPage.goToRegisterPage();

    await registerPage.checkRegisterFormFields();
    await registerPage.fillRegisterFields(user);
    await registerPage.register();

    await registerPage.expectFieldValidationError("Email", /email is required./i);
  });

  test("TC-REGRESSION-07: Имя не заполнено", async ({ page }) => {
    const user = new UserBuilder().withFirstName("").build(); //пустое имя

    await mainPage.open();
    await mainPage.goToRegisterPage();

    await registerPage.checkRegisterFormFields();
    await registerPage.fillRegisterFields(user);
    await registerPage.register();

    await registerPage.expectFieldValidationError("FirstName", /first name is required./i);
  });

  test("TC-REGRESSION-08: Фамилия не заполнена", async ({ page }) => {
    const user = new UserBuilder().withLastName("").build(); //пустая фамилия

    await mainPage.open();
    await mainPage.goToRegisterPage();

    await registerPage.checkRegisterFormFields();
    await registerPage.fillRegisterFields(user);
    await registerPage.register();

    await registerPage.expectFieldValidationError("LastName", /last name is required./i);
  });

  test("TC-REGRESSION-09: Пароль не заполнен", async ({ page }) => {
    const user = new UserBuilder().withPassword("").build(); //пустой пароль

    await mainPage.open();
    await mainPage.goToRegisterPage();

    await registerPage.checkRegisterFormFields();
    await registerPage.fillRegisterFields(user);
    await registerPage.register();

    await registerPage.expectFieldValidationError("Password", /password is required./i);
  });

  test("TC-REGRESSION-10: Пароль не совпадает", async ({ page }) => {
    const user = new UserBuilder().build();
    const confirmPassword = user.password + "1";

    await mainPage.open();
    await mainPage.goToRegisterPage();

    await registerPage.checkRegisterFormFields();
    await registerPage.fillRegisterFields(user, confirmPassword);
    await registerPage.register();

    await registerPage.expectFieldValidationError("ConfirmPassword", /the password and confirmation password do not match./i);
  });

  test("TC-REGRESSION-11: Пароль не проходит по длине", async ({ page }) => {
    const user = new UserBuilder().withPassword("12345").build(); //6 символов минимум

    await mainPage.open();
    await mainPage.goToRegisterPage();

    await registerPage.checkRegisterFormFields();
    await registerPage.fillRegisterFields(user);
    await registerPage.register();

    await registerPage.expectFieldValidationError("Password", /the password should have at least 6 characters./i);
  });
});