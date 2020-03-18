import {IReadModel} from './interfaces/IReadModel';
import {IWriteModel} from './interfaces/IWriteModel';

export class Person implements IReadModel {
  id = 0;
  firstName = '';
  lastName = '';
  name = '';
  email = '';
  phone = '';

  writeModel(): IWriteModel {
    return undefined;
  }
}

export function adaptPerson(item: any): Person {
  if (item === null) {
    return null;
  }
  const person = new Person();
  person.id = item.id;
  person.firstName = item.first_name;
  person.lastName = item.last_name;
  person.name = item.name;
  person.email = item.email;
  person.phone = item.phone;
  return person;
}
