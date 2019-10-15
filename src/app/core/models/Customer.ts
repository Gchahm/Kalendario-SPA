import {Person} from './Person';

// TODO: Separate customer from user model
export class Customer implements Person {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  password2: string;
}
