import {Component, EventEmitter, Inject, Output} from '@angular/core';
import * as moment from 'moment';
import {ToastService} from '../../../shared/services/toast.service';
import {Moment} from 'moment';
import {AppointmentService} from '../../../shared/services/appointment.service';
import {CreateAppointmentModel} from '../../../core/models/Appointment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../shared/helpers/format-datepicker';
import {CustomerListDialogComponent} from '../customer-list/customer-list-dialog.component';
import {Employee} from '../../../core/models/Employee';

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

  @Output() dateChanged = new EventEmitter<Moment>();

  minDate = new Date();
  form: CreateAppointmentForm;
  employee: Employee;

  constructor(private appointmentService: AppointmentService,
              private toast: ToastService,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<CreateAppointmentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { employee: Employee, date: Moment}) {
    this.form = new CreateAppointmentForm();
    this.form.customerName = 'select customer';
    this.form.startDate = data.date.toISOString();
    this.employee = data.employee;
    this.form.employeeId = data.employee.id;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.form.createModel());
  }

  openCustomerList() {
    const dialogRef = this.dialog.open(CustomerListDialogComponent, {
      width: '1400px'
    });

    dialogRef.afterClosed().subscribe(customer => {
      if (customer) {
        this.form.customerId = customer.id;
        this.form.customerName = customer.name;
      }
    });
  }

}

class CreateAppointmentForm {
  public startTime: string;
  public startDate: string;
  public customerName: string;
  public customerId: number;
  public service: number;
  public employeeId: number;

  createModel(): CreateAppointmentModel {
    const start = moment.utc(this.startDate).startOf('day');
    start.set('hour', +this.startTime.substr(0, 2));
    start.set('minute', +this.startTime.substr(3));
    return {
      customer: this.customerId,
      status: 'A',
      start: start.toISOString(),
      service: this.service,
      employee: this.employeeId,
      customer_notes: ''
    };
  }
}
