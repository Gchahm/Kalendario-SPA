import {Component} from '@angular/core';
import {BaseFormComponent} from '../BaseFormComponent';
import {CustomerListDialogComponent} from '../../_dialogs/customer-list/customer-list-dialog.component';
import {FormBuilder, Validators} from '@angular/forms';
import {Appointment} from '../../../../core/models/Appointment';
import * as moment from 'moment';
import {CustomValidators} from '../../../../shared/Validators/Custom.validators';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'admin-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent extends BaseFormComponent<Appointment> {

  form;

  constructor(private fb: FormBuilder,
              private dialog: MatDialog) {
    super();
  }

  submitModel() {
    this.form.patchValue({
      start: this.formDatetime()
    });
    return this.form.value;
  }


  createForm() {
    this.form = this.fb.group({
      id: [this.model.id, Validators.required],
      employee: [this.model.employee.id, [Validators.required, CustomValidators.cannotBeZero]],
      customer: [this.model.customer.id, [Validators.required, CustomValidators.cannotBeZero]],
      status: [this.model.status, Validators.required],
      start: [this.model.start.toISOString(),],
      service: [this.model.service.id, [Validators.required, CustomValidators.cannotBeZero]],
      customerName: [{value: this.model.customer.name, disabled: true}],
      startDate: [this.model.start.format('YYYY-MM-DD'), Validators.required],
      startTime: [this.model.start.format('hh:mm'), Validators.required],
    });
  }

  openCustomerList() {
    const customerDialog = this.dialog.open(CustomerListDialogComponent, {
      width: '1400px'
    });

    customerDialog.afterClosed().toPromise()
      .then(customer => {
        if (customer) {
          this.form.patchValue({
            customerName: customer.name,
            customer: customer.id
          });
        }
      });
  }

  formDatetime() {
    const date = moment.utc(this.form.get('startDate').value);
    const time = moment.duration(this.form.get('startTime').value);
    date.hour(time.hours());
    date.minute(time.minutes());
    return date.toISOString();
  }
}

