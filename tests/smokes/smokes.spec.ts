import { test } from '../../src/helpers/fixtures/user.fixture';
import { AppFacade } from '../../src/pages/index';

test.describe('Смоки открытия страниц', () => {
  test('TC-SMOKE-01: Открытие главной страницы', async ({ app }) => {
    await test.step('Перейти на главную', async () => {
      await app.main.openPageAndCheckFields();
    });
  });

  test('TC-SMOKE-11: Открытие страницы регистрации', async ({ app }) => {
    await test.step('Перейти на страницу регистрации', async () => {
      await app.register.openPageAndCheckFields();
    });
  });

  test('TC-SMOKE-12: Открытие страницы авторизации', async ({ app }) => {
    await test.step('Перейти на страницу авторизации', async () => {
      await app.auth.openPageAndCheckFields();
    });
  });

  test('TC-SMOKE-13: Открытие корзины покупок', async ({ app }) => {
    await test.step('Перейти на страницу корзины', async () => {
      await app.cart.openPageAndCheckFields();
    });
  });

  test('TC-SMOKE-14: Открытие списка желаемого', async ({ app }) => {
    await test.step('Перейти на страницу списка желаемого', async () => {
      await app.wishlist.openPageAndCheckFields();
    });
  });
});
