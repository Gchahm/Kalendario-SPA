import {Component} from '@angular/core';
import {BaseDetailsComponent} from '@shared/common/BaseDetailsComponent';
import { Customer } from '@api/models';

@Component({
  selector: 'admin-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent extends BaseDetailsComponent<Customer> {
  details(): { name: string, value: string }[] {
    return [
      {name: 'name', value: this.model.name},
      {name: 'email', value: this.model.email},
      {name: 'phone', value: this.model.phone},
    ];
  }
}
