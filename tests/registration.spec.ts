import { test } from "@playwright/test";
import { UserBuilder } from "../src/helpers/builders/userBuilder";
import { AppFacade } from "../src/pages/index";
import { allure } from "allure-playwright";
import { Severity } from "allure-js-commons";

let app: AppFacade;
test.describe("Регистрация пользователя", () => {
  test.beforeEach(async ({ page }) => {
    await allure.tags("regression");
    app = new AppFacade(page);
  });

  test("TC-REGRESSION-REGISTER-04: Успешная регистрация пользователя", async () => {
    await allure.owner("Ivan Osipov")
    await allure.severity(Severity.CRITICAL);
    const user = new UserBuilder().build();

    await app.register.openRegisterPage();
    const successPage = await app.register.registerUser(user);
    await successPage.checkSuccess(user.email);
  });

  test("TC-REGRESSION-REGISTER-05: Невалидный email", async () => {
    const user = new UserBuilder().withEmail("@s").build();

    await app.register.openRegisterPage();
    await app.register.registerUserWithError(user, "Email", /wrong email/i);
  });

  test("TC-REGRESSION-REGISTER-06: Email не заполнен", async () => {
    const user = new UserBuilder().withEmail("").build(); //пустой email

    await app.register.openRegisterPage();
    await app.register.registerUserWithError(
      user,
      "Email",
      /email is required./i,
    );
  });

  test("TC-REGRESSION-REGISTER-07: Имя не заполнено", async () => {
    const user = new UserBuilder().withFirstName("").build(); //пустое имя

    await app.register.openRegisterPage();
    await app.register.registerUserWithError(
      user,
      "FirstName",
      /first name is required./i,
    );
  });

  test("TC-REGRESSION-REGISTER-08: Фамилия не заполнена", async () => {
    const user = new UserBuilder().withLastName("").build(); //пустая фамилия

    await app.register.openRegisterPage();
    await app.register.registerUserWithError(
      user,
      "LastName",
      /last name is required./i,
    );
  });

  test("TC-REGRESSION-REGISTER-09: Пароль не заполнен", async () => {
    const user = new UserBuilder().withPassword("").build(); //пустой пароль

    await app.register.openRegisterPage();
    await app.register.registerUserWithError(
      user,
      "Password",
      /password is required./i,
    );
  });

  test("TC-REGRESSION-REGISTER-10: Пароль не совпадает", async () => {
    const user = new UserBuilder().build();
    const notMatchedConfirmPassword = user.password + "1";

    await app.register.openRegisterPage();
    await app.register.registerUserWithError(
      user,
      "ConfirmPassword",
      /the password and confirmation password do not match./i,
      notMatchedConfirmPassword,
    );
  });

  test("TC-REGRESSION-REGISTER-11: Пароль не проходит по длине", async () => {
    const user = new UserBuilder().withPassword("12345").build(); //6 символов минимум

    await app.register.openRegisterPage();
    await app.register.registerUserWithError(
      user,
      "Password",
      /the password should have at least 6 characters./i,
    );
  });
});
