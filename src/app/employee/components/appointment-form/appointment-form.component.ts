import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Employee} from '../../../shared/models/Employee';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CustomerService} from '../../../customer/services/customer.service';
import {CreateAppointment} from '../../models/CreateAppointment';
import * as moment from 'moment';
import {EmployeeAppointmentService} from '../../services/employee-appointment.service';
import {ToastService} from '../../../shared/services/toast.service';
import {Moment} from 'moment';
import {DateChangedEvent} from '../../../calendar/events/DateChangedEvent';
import {Appointment} from '../../../shared/models/Appointment';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {

  @Input() employee: Employee;
  @Input() set date(value: Moment) {
    this.form.startDate = value.format('YYYY-MM-DD');
  }

  @Output() appointmentBooked = new EventEmitter<Appointment>();

  selectedCustomer = '';
  appointment: CreateAppointment;
  form: {startTime: string, startDate: string, customerName: string};


  constructor(private customerService: CustomerService,
              private employeeAppointment: EmployeeAppointmentService,
              private toast: ToastService) {
    this.appointment = {customer: '', start: '', service: ''};
    this.form = {startDate: '', startTime: '', customerName: ''};
  }

  ngOnInit() {}

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.customerService.search(term),
      ));

  formatter = (x: { name: string, id: string }) => {
    this.selectedCustomer = x.name;
    this.appointment.customer = x.id;
    return x.name;
  };

  customerChange(e) {
    if (e.target.value !== this.selectedCustomer) {
      this.appointment.customer = null;
    }
  }

  submit() {
    this.appointment.start  = moment.utc(this.form.startDate + ' ' + this.form.startTime).toISOString();
    this.employeeAppointment.create(this.appointment)
      .toPromise()
      .then(success => {
        this.appointmentBooked.emit(success);
        this.toast.success('appointment booked');
      })
      .catch(error => this.toast.error(error));
  }

}
