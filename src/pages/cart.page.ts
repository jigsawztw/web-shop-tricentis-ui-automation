import { BasePage } from './index';
import { Page, Locator, expect } from '@playwright/test';

export class CartPage extends BasePage {
    protected path = '/cart';

    readonly formTitle: Locator;

    constructor(page: Page) {
        super(page);

        this.formTitle = page.getByRole('heading', { name: 'Shopping cart' });
    }

    async checkCartFields() {
        await expect(this.formTitle).toBeVisible();
    }
}