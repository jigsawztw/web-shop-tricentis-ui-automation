import { Page } from '@playwright/test';
import { AuthFacade } from './authFacade';
import { RegisterFacade } from './registerFacade';

export class AppFacade {
  auth: AuthFacade;
  register: RegisterFacade;

  constructor(page: Page) {
    this.auth = new AuthFacade(page);
    this.register = new RegisterFacade(page);
  }
}
