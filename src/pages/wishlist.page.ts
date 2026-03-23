import { BasePage } from './index';
import { Page, Locator, expect } from '@playwright/test';

export class WishlistPage extends BasePage {
    protected path = '/wishlist';

    readonly formTitle: Locator;

    constructor(page: Page) {
        super(page);

        this.formTitle = page.locator('.cart-label', { hasText: 'Wishlist' });
    }

    async checkWishlistFields() {
        await expect(this.formTitle).toBeVisible();
    }
}