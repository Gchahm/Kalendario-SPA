import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Employee} from '../../../core/models/Employee';
import {Moment} from 'moment';
import {ToastService} from '../../../shared/services/toast.service';
import * as moment from 'moment';
import {AppointmentService, CreateSelfAppointmentModel} from '../../../shared/services/appointment.service';

@Component({
  selector: 'employee-form-self-appointment',
  templateUrl: './form-self-appointment.component.html',
  styleUrls: ['./form-self-appointment.component.css']
})
export class FormSelfAppointmentComponent implements OnInit {

  private _employee: Employee;
  get employee() {
    return this._employee;
  }
  @Input() set employee(employee: Employee) {
    this._employee = employee;
    this.form.employeeId = employee.id.toString();
  }

  @Input() set date(value: Moment) {
    this.form.startDate = value.format('YYYY-MM-DD');
    this.form.endDate = value.format('YYYY-MM-DD');
  }

  @Output() dateChanged = new EventEmitter<Moment>();

  minDate = new Date();
  form: CreateSelfAppointmentForm;

  constructor(private employeeAppointment: AppointmentService,
              private toast: ToastService) {
    this.form = new CreateSelfAppointmentForm( '', '', '', '', '', '');
  }

  ngOnInit() {
  }

  submit() {
    this.employeeAppointment.createSelfAppointment(this.form.model())
      .toPromise()
      .then(success => {
        this.dateChanged.emit(success.start);
        this.form.clear();
        this.toast.success('appointment booked');
      })
      .catch(error => this.toast.error(error));
  }

  emitDateChanged(date: string) {
    this.dateChanged.emit(moment.utc(date));
  }
}

class CreateSelfAppointmentForm {
  constructor(public startDate: string,
              public endDate: string,
              public startTime: string,
              public endTime: string,
              public reason: string,
              public employeeId: string) {
  }

  model(): CreateSelfAppointmentModel {
    return {
      start: moment.utc(this.startDate + ' ' + this.startTime).toISOString(),
      end: moment.utc(this.endDate + ' ' + this.endTime).toISOString(),
      reason: this.reason,
      employee: this.employeeId
    };
  }

  clear() {
    this.startTime = null;
    this.endTime = null;
    this.endDate = null;
    this.reason = null;
  }
}
