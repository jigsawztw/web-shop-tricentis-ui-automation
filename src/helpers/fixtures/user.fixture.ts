import { test as base } from '@playwright/test';
import { AppFacade } from '../../facades/appFacade';
import { UserBuilder } from '../builders/userBuilder';
import { User } from '../../../types/user';

type MyFixtures = {
  app: AppFacade;
  registeredUser: User;
  baseBuilder: UserBuilder;
};

export const test = base.extend<MyFixtures>({
  app: async ({ page }, use) => {
    const app = new AppFacade(page);
    await use(app);
  },

  baseBuilder: async ({}, use) => {
    const baseBuilder = new UserBuilder();
    await use(baseBuilder);
  },

  registeredUser: async ({ app }, use) => {
    const user = new UserBuilder().build();
    await app.register.openPageAndCheckFields();
    await app.register.registerUser(user);

    await app.auth.logout();

    await use(user);
  },
});
