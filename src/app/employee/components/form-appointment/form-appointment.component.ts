import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Employee} from '../../../shared/models/Employee';
import * as moment from 'moment';
import {ToastService} from '../../../shared/services/toast.service';
import {Moment} from 'moment';
import {AppointmentService} from '../../../shared/services/appointment.service';
import {CreateAppointmentModel} from '../../../shared/models/Appointment';
import {DateAdapter, MAT_DATE_FORMATS, MatDialog} from '@angular/material';
import {DialogCustomerListComponent} from '../dialog-customer-list/dialog-customer-list.component';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../shared/helpers/format-datepicker';

@Component({
  selector: 'employee-form-appointment',
  templateUrl: './form-appointment.component.html',
  styleUrls: ['./form-appointment.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class FormAppointmentComponent {

  private _employee: Employee;
  get employee() {
    return this._employee;
  }

  @Input() set employee(employee: Employee) {
    this._employee = employee;
    this.form.employeeId = employee.id;
  }

  @Input() set date(value: Moment) {
    this.form.startDate = value.toISOString();
  }

  @Output() dateChanged = new EventEmitter<Moment>();

  minDate = new Date();
  form: CreateAppointmentForm;

  constructor(private appointmentService: AppointmentService,
              private toast: ToastService,
              private dialog: MatDialog) {
    this.form = new CreateAppointmentForm();
    this.form.customerName = 'select customer';
  }

  submit() {
    this.appointmentService.createAppointment(this.form.model())
      .toPromise()
      .then(success => {
        this.dateChanged.emit(success.start);
        this.toast.success('appointment booked');
        this.form.clear();
      })
      .catch(error => this.toast.error(error));
  }

  emitDateChanged(date: string) {
    this.dateChanged.emit(moment.utc(date));
  }

  openCustomerList() {
    const dialogRef = this.dialog.open(DialogCustomerListComponent, {
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

  model(): CreateAppointmentModel {
    const start = moment.utc(this.startDate).startOf('day');
    start.set('hour', +this.startTime.substr(0, 2));
    start.set('hour', +this.startTime.substr(2));
    return {
      customer: this.customerId,
      status: 'A',
      start: start.toISOString(),
      service: this.service,
      employee: this.employeeId,
      customer_notes: ''
    };
  }

  clear() {
    this.startTime = null;
    this.customerId = null;
    this.customerName = null;
    this.service = null;
  }
}
