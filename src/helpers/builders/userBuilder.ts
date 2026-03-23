import { faker } from '@faker-js/faker';
import type { User } from '../../../types/user';

export class UserBuilder {
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _password: string;

  constructor() {
    this._firstName = faker.person.firstName('female');
    this._lastName = faker.person.lastName('female');
    this._email = faker.internet.email({ firstName: this._firstName, lastName: this._lastName }).toLowerCase();
    this._password = faker.internet.password({ length: 6 });
  }

  withFirstName(firstName: string) {
    this._firstName = firstName;
    return this;
  }

  withLastName(lastName: string) {
    this._lastName = lastName;
    return this;
  }

  withEmail(email: string) {
    this._email = email;
    return this;
  }

  withPassword(password: string) {
    this._password = password;
    return this;
  }

  build(): User {
    return structuredClone({
      firstName: this._firstName,
      lastName: this._lastName,
      email: this._email,
      password: this._password,
    });
  }
}
