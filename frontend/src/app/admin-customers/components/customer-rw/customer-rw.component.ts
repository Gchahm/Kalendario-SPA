import { Component } from '@angular/core';
import {BaseRWComponent} from '@shared/common/BaseRWComponent';
import {ICustomer, ICustomerWriteModel} from '@api/models';

@Component({
  selector: 'admin-customer-rw',
  templateUrl: './customer-rw.component.html',
  styleUrls: ['./customer-rw.component.css']
})
export class CustomerRwComponent extends  BaseRWComponent<ICustomer> {
  writeModel(): ICustomerWriteModel {
    return {...this.model};
  }
}
