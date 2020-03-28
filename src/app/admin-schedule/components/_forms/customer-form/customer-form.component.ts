import { Component } from '@angular/core';
import {Customer} from '../../../../core/models/Customer';
import {BaseFormComponent} from '../BaseFormComponent';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'admin-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent extends BaseFormComponent<Customer> {

  constructor(private fb: FormBuilder) {
    super();
  }

  submitModel() {
    return this.onUpdateEvent.model;
  }

  createForm() {
    const model = this.model.writeModel();
    this.form = this.fb.group({
      id: [model.id, Validators.required],
      first_name: [model.first_name, Validators.required],
      last_name: [model.last_name, Validators.required],
      email: [model.email, Validators.required],
      phone: [model.phone, Validators.required],
    });
  }
}
