import { Component } from '@angular/core';
import {BaseRWComponent} from '@shared/common/BaseRWComponent';
import {Customer, ICustomerWriteModel} from '@api/models';

@Component({
  selector: 'admin-customer-rw',
  templateUrl: './customer-rw.component.html',
  styleUrls: ['./customer-rw.component.css']
})
export class CustomerRwComponent extends  BaseRWComponent<Customer> {
  writeModel(): ICustomerWriteModel {
    return {...this.model};
  }
}
