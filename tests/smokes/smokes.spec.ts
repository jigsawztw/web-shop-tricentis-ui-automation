import { test } from '@playwright/test';
import { AppFacade } from '../../src/pages/index';

let app: AppFacade;

test.describe('Смоки открытия страниц', () => {
    test.beforeEach(async ({ page }) => {
        app = new AppFacade(page);

    });

    test('TC-SMOKE-01: Открытие главной страницы', async () => {
        await test.step('Перейти на главную и проверить отображение полей', async () => {
            await app.main.openPageAndCheckFields()
        });
    });

    test('TC-SMOKE-11: Открытие страницы регистрации', async () => {

        await test.step('Перейти на страницу регистрации и проверить отображение полей', async () => {
            await app.register.openPageAndCheckFields()
        });
    });
});