import { Component } from '@angular/core';
import {Customer} from '@core/models/Customer';
import {BaseFormComponent} from '../BaseFormComponent';
import {CustomerService} from '../../../services/customer.service';

@Component({
  selector: 'admin-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent extends BaseFormComponent<Customer> {
  constructor(service: CustomerService) {
    super(service);
  }
}
