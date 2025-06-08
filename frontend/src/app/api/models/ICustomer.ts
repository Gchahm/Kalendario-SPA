import {Injectable} from '@angular/core';
import {Adapter} from '@api/adapter';
import {IPerson, Person} from './IPerson';
import {PermissionModels} from '@api/permissions';

export class Customer extends Person implements ICustomer {
  static modelType = PermissionModels.customer;
  warning: string;

  static fromJsc(data?: any): ICustomer {
    data = typeof data === 'object' ? data : {};
    const result = new Customer();
    result.init(data);
    return result;
  }

  init(data: any) {
    super.init(data);
    this.warning = data.warning;
  }

}

export interface ICustomer extends IPerson {
  warning: string;
}

export interface ICustomerWriteModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  warning: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerAdapter implements Adapter<ICustomer> {
  adapt(data: any): ICustomer {
    return Customer.fromJsc(data);
  }
}
