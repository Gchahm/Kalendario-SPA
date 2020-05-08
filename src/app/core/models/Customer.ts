import {IWriteModel} from './interfaces/IWriteModel';
import {Injectable} from '@angular/core';
import {Adapter} from '../interfaces/adapter';
import {Person} from './Person';

export class Customer extends Person {
  static modelType = 'customer';

  static fromJs(data: any): Customer {
    data = typeof data === 'object' ? data : {};
    const result = new Customer();
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


  writeModel(): ICustomerWriteModel {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
    };
  }

  details(): {name: string, value: string}[] {
    return [
      {name: 'name', value: this.name},
      {name: 'email', value: this.email},
      {name: 'phone', value: this.phone},
    ];
  }
  toString() {
    return this.name;
  }
}

export interface ICustomerWriteModel extends IWriteModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerAdapter implements Adapter<Customer> {
  adapt(data: any): Customer {
    return Customer.fromJs(data);
  }
}
