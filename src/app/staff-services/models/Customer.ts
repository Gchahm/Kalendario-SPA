import {User} from './User';

export class Customer implements User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
