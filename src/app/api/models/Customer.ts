import {Injectable} from '@angular/core';
import {Adapter} from '@api/adapter';
import {Person} from './Person';
import {PermissionModels} from '@api/models/User';

export class Customer extends Person {
  static modelType = PermissionModels.customer;

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
}

export interface ICustomerWriteModel {
  id: number;
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
