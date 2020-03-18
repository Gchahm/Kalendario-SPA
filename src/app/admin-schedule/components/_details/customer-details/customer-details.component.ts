import { Component, OnInit } from '@angular/core';
import {BaseDetailsComponent} from '../BaseDetailsComponent';
import {Customer} from '../../../../core/models/Customer';

@Component({
  selector: 'admin-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent extends BaseDetailsComponent<Customer> {

  constructor() {
    super();
  }
}
