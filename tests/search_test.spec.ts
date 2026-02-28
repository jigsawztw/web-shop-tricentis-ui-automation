import { test, expect } from '@playwright/test';

test('TC-REGRESSION-03: Поиск товара ', async ({ page }) => {
    const products = [
        'Custom T-Shir'
    ];

    const productName = products[Math.floor(Math.random() * products.length)];
    console.log('Текущий товар для поиска:', productName);
    await page.goto('https://demowebshop.tricentis.com/');
    await page.locator('#small-searchterms').fill(productName);
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(
        page.locator(`//a[text()="${productName}"]`)
    ).toBeVisible();

});