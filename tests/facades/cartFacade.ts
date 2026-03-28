import { Page } from '@playwright/test';
import { CartPage, MainPage } from '../../src/pages/index';

export class CartFacade {
  private mainPage: MainPage;
  private cartPage: CartPage;

  constructor(private page: Page) {
    this.mainPage = new MainPage(page);
    this.cartPage = new CartPage(page);
  }

  async openPageAndCheckFields() {
    await this.mainPage.open();
    await this.mainPage.goToCartPage();
    await this.cartPage.checkCartFields();
  }
}
