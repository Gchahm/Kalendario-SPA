import {IReadModel} from './interfaces/IReadModel';
import {IWriteModel} from './interfaces/IWriteModel';

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
    result.init(data);
    return result;
  }

  init(data: any) {
    if (data) {
      this.id = data.id;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.name = data.name;
      this.email = data.email;
      this.phone = data.phone;
    }
  }

  writeModel(): IWriteModel {
    return undefined;
  }
}
