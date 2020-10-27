import {IReadModel} from './IReadModel';

export class Person implements IReadModel {
  id = 0;
  firstName = '';
  lastName = '';
  name = '';
  email = '';
  phone = '';

  static fromJS(data: any): Person {
    data = typeof data === 'object' ? data : {};
    const result = new Person();
    if (data) {
      result.id = data.id;
      result.firstName = data.firstName;
      result.lastName = data.lastName;
      result.name = data.name;
      result.email = data.email;
      result.phone = data.phone;
    }
    return result;
  }
}
