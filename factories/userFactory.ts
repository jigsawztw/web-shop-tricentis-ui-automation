import { faker } from "@faker-js/faker";
import { User } from "../types/user";

export const userFactory = {
  createByDefault(): User {
    const firstName = faker.person.firstName('female')
    const lastName = faker.person.lastName('female')

    return {
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      password: faker.internet.password({ length: 6 }),
    };
  },
    //to-do - возможно придется вернуть позже, либо удалить за ненадобностью
  /* createWithEmail(email: string): User {
    const user = this.createByDefault()
    return {
      ...user,
      email
    }
  },

  createWithInvalidEmail(): User {
    const invalidEmails = [
      'invalid-email',
      'test@',
      '@gmail.com',
      'testgmail.com',
      'test@.com'
    ];

    const randomInvalid =
      invalidEmails[Math.floor(Math.random() * invalidEmails.length)];

    const user = this.createByDefault();

    return {
      ...user,
      email: randomInvalid
    };
  },  */

  createWithOverride(overrides: Partial<User>): User {
    return {
      ...this.createByDefault(),
      ...overrides,
    };
  },
};
