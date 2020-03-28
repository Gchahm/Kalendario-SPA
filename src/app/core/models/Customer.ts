import {IWriteModel} from './interfaces/IWriteModel';
import {Injectable} from '@angular/core';
import {Adapter} from '../interfaces/adapter';
import {Person} from './Person';

export class Customer extends Person {
  static modelType = 'customer';

  writeModel(): ICustomerWriteModel {
    return {
      id: this.id,
      first_name: this.firstName,
      last_name: this.lastName,
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
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerAdapter implements Adapter<Customer> {
  adapt(item: any): Customer {
    const customer = new Customer();
    customer.id = item.id;
    customer.firstName = item.first_name;
    customer.lastName = item.last_name;
    customer.name = item.name;
    customer.email = item.email;
    customer.phone = item.phone;
    return customer;
  }
}
