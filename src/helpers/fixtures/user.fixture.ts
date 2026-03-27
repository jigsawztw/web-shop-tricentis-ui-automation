import { test as base } from '@playwright/test';
import { AppFacade } from '../../facades/appFacade';
import { UserBuilder } from '../builders/userBuilder';
import { User } from '../../../types/user';

type MyFixtures = {
  app: AppFacade;
  registeredUser: User;
  user: User;
};

export const test = base.extend<MyFixtures>({
  app: async ({ page }, use) => {
    const app = new AppFacade(page);
    await use(app);
  },

  user: async ({ }, use) => {
    const user = new UserBuilder().build();
    await use(user);
  },

  registeredUser: async ({ app }, use) => {
    const user = new UserBuilder().build();
    await app.register.openPageAndCheckFields();
    await app.register.registerUser(user);

    await app.auth.logout();

    await use(user);
  },
});