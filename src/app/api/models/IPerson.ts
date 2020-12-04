import {IReadModel} from './IReadModel';

export class Person implements IPerson {
  id;
  firstName;
  lastName;
  name;
  email;
  phone;

  static fromJS(data?: any): Person {
    data = typeof data === 'object' ? data : {};
    const result = new Person();
    result.init(data);
    return result;
  }

  init(data: any) {
    if (data) {
      this.id = data.id ? data.id : 0;
      this.firstName = data.firstName ? data.firstName : '';
      this.lastName = data.lastName ? data.lastName : '';
      this.name = data.name ? data.name : '';
      this.email = data.email ? data.email : '';
      this.phone = data.phone ? data.phone : '';
    }
  }
}

export interface IPerson extends IReadModel {
  firstName;
  lastName;
  email;
  phone;
}
