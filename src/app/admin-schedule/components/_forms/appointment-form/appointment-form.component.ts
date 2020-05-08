import {Component} from '@angular/core';
import {BaseFormComponent} from '../BaseFormComponent';
import {CustomerListDialogComponent} from '../../_dialogs/customer-list/customer-list-dialog.component';
import {FormBuilder, Validators} from '@angular/forms';
import {Appointment} from '../../../../core/models/Appointment';
import * as moment from 'moment';
import {CustomValidators} from '../../../../shared/Validators/Custom.validators';
import {MatDialog} from '@angular/material/dialog';
import {AppointmentService} from '../../../../shared/services/appointment.service';

@Component({
  selector: 'admin-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent extends BaseFormComponent<Appointment> {

  form;

  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              service: AppointmentService) {
     super(service);
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

}

