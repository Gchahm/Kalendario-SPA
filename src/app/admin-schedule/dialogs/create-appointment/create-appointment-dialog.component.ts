import {Component, Inject} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../shared/helpers/format-datepicker';
import {CustomerListDialogComponent} from '../customer-list/customer-list-dialog.component';
import {Employee} from '../../../core/models/Employee';
import {Appointment, IAppointmentWriteModel} from '../../../core/models/Appointment';

@Component({
  selector: 'employee-form-appointment',
  templateUrl: './create-appointment-dialog.component.html',
  styleUrls: ['./create-appointment-dialog.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class CreateAppointmentDialogComponent {

  minDate = new Date();
  model: IAppointmentWriteModel;
  form: CreateAptForm;
  employee: Employee;

  constructor(private dialog: MatDialog,
              private dialogRef: MatDialogRef<CreateAppointmentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { employee: Employee, date: Moment}) {
    this.model = Appointment.CreateModel();
    this.form = new CreateAptForm();
    this.form.startDate = data.date.format('YYYY-MM-DD');
    this.employee = data.employee;
    this.model.employee = data.employee.id.toString();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  submit() {
    const start = moment.utc(this.form.startDate).startOf('day');
    start.set('hour', +this.form.startTime.substr(0, 2));
    start.set('minute', +this.form.startTime.substr(3));
    this.model.start = start.toISOString();
    this.model.status = 'A';
    this.dialogRef.close(this.model);
  }

  openCustomerList() {
    const dialogRef = this.dialog.open(CustomerListDialogComponent, {
      width: '1400px'
    });

    dialogRef.afterClosed().subscribe(customer => {
      if (customer) {
        this.model.customer = customer.id;
        this.form.customerName = customer.name;
      }
    });
  }
}

class CreateAptForm {
  customerName = 'select a customer';
  startDate: string;
  startTime: string;
}
