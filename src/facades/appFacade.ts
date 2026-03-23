import { Page } from '@playwright/test';
import { AuthFacade } from './authFacade';
import { RegisterFacade } from './registerFacade';
import { MainPage } from '../pages/main.page';
import { CartFacade } from './cartFacade';
import { WishlistFacade } from './wishlistFacade';

export class AppFacade {
  main: MainPage;
  auth: AuthFacade;
  register: RegisterFacade;
  cart: CartFacade;
  wishlist: WishlistFacade;

  constructor(page: Page) {
    this.auth = new AuthFacade(page);
    this.register = new RegisterFacade(page);
    this.main = new MainPage(page);
    this.cart = new CartFacade(page);
    this.wishlist = new WishlistFacade(page);
  }
}
