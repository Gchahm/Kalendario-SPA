import { Component } from '@angular/core';
import {Customer} from '../../../../core/models/Customer';
import {BaseFormComponent} from '../BaseFormComponent';

@Component({
  selector: 'admin-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent extends BaseFormComponent<Customer> {

  constructor() {
    super();
  }

  submitModel() {
    return this.onUpdateEvent.model;
  }

  createForm() {
  }
}
