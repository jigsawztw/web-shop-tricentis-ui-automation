import { Page } from '@playwright/test';
import { AuthFacade } from './authFacade';
import { RegisterFacade } from './registerFacade';
import { MainPage } from '../pages/main.page';

export class AppFacade {
  main: MainPage;
  auth: AuthFacade;
  register: RegisterFacade;

  constructor(page: Page) {
    this.auth = new AuthFacade(page);
    this.register = new RegisterFacade(page);
    this.main = new MainPage(page);
  }
}
