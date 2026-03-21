import { test } from "@playwright/test";
import { UserBuilder } from "../src/helpers/builders/userBuilder";
import { AppFacade } from "../src/pages/index";

let app: AppFacade;
test.describe("Регистрация пользователя", () => {
  test.beforeEach(async ({ page }) => {
    app = new AppFacade(page)
  });

  test("TC-REGRESSION-04: Успешная регистрация пользователя", async ({
    page,
  }) => {
    const user = new UserBuilder().build();

    await app.openRegisterPage();
    const successPage = await app.registerUser(user);
    await successPage.checkSuccess(user.email);
  });

  test("TC-REGRESSION-05: Невалидный email", async ({ page }) => {
    const user = new UserBuilder().withEmail("@s").build();

    await app.openRegisterPage();
    await app.registerUserWithError(user, "Email", /wrong email/i);
  });

  test("TC-REGRESSION-06: Email не заполнен", async ({ page }) => {
    const user = new UserBuilder().withEmail("").build(); //пустой email

    await app.openRegisterPage();
    await app.registerUserWithError(user, "Email", /email is required./i);
  });

  test("TC-REGRESSION-07: Имя не заполнено", async ({ page }) => {
    const user = new UserBuilder().withFirstName("").build(); //пустое имя

    await app.openRegisterPage();
    await app.registerUserWithError(user, "FirstName", /first name is required./i);
  });

  test("TC-REGRESSION-08: Фамилия не заполнена", async ({ page }) => {
    const user = new UserBuilder().withLastName("").build(); //пустая фамилия

    await app.openRegisterPage();
    await app.registerUserWithError(user, "LastName", /last name is required./i);
  });

  test("TC-REGRESSION-09: Пароль не заполнен", async ({ page }) => {
    const user = new UserBuilder().withPassword("").build(); //пустой пароль

    await app.openRegisterPage();
    await app.registerUserWithError(user, "Password", /password is required./i);
  });

  test("TC-REGRESSION-10: Пароль не совпадает", async ({ page }) => {
    const user = new UserBuilder().build();
    const notMatchedConfirmPassword = user.password + "1";

    await app.openRegisterPage();
    await app.registerUserWithError(user, "ConfirmPassword", /the password and confirmation password do not match./i, notMatchedConfirmPassword);
  });

  test("TC-REGRESSION-11: Пароль не проходит по длине", async ({ page }) => {
    const user = new UserBuilder().withPassword("12345").build(); //6 символов минимум

    await app.openRegisterPage();
    await app.registerUserWithError(user, "Password", /the password should have at least 6 characters./i);
  });
});