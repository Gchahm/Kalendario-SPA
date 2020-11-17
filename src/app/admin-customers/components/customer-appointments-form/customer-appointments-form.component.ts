import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as moment from 'moment';
import {FormBuilder} from '@angular/forms';
import {Employee, Service} from '@api/models';

@Component({
  selector: 'app-customer-appointments-form',
  templateUrl: './customer-appointments-form.component.html',
  styleUrls: ['./customer-appointments-form.component.css']
})
export class CustomerAppointmentsFormComponent {

  private _customerId: number;

  @Input() set customerId(id: number) {
    if (!this.form) {
      this.createForm(id);
    } else {
      this.updateFormCustomerId(id);
    }
    if (id !== this._customerId) {
      this._customerId = id;
      this.filter();
    }
  }
  get customerId(): number {
    return this._customerId;
  }

  /** The list of services for the service filter */
  @Input() services: Service[];
  /** The list of employees for the employee filter */
  @Input() employees: Employee[];
  /** This emits the form value on the following ocasions
   * after the form is created,
   * the value for customer is updated
   * or if the filter button is clicked */
  @Output() load = new EventEmitter<object>();

  form;

  constructor(private fb: FormBuilder) {
  }

  createForm(id) {
    this.form = this.fb.group({
      customer: id,
      from_date: [{value: moment.utc(), disabled: true},],
      to_date: [{value: moment.utc().add(3, 'd'), disabled: true},],
      employees: [[]],
      services: [[]],
    });
  }

  updateFormCustomerId(id) {
    this.form.patchValue({customer: id});
  }

  filter() {
    this.load.emit(this.form.value);
  }
}

