import { Page } from '@playwright/test';
import { WishlistPage, MainPage } from '../../src/pages/index';

export class WishlistFacade {
  private mainPage: MainPage;
  private wishlistPage: WishlistPage;

  constructor(private page: Page) {
    this.mainPage = new MainPage(page);
    this.wishlistPage = new WishlistPage(page);
  }

  async openPageAndCheckFields() {
    await this.mainPage.open();
    await this.mainPage.goToWishListPage();
    await this.wishlistPage.checkWishlistFields();
  }
}
