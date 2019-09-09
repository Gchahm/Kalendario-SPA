import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Employee} from '../../../shared/models/Employee';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {CustomerService} from '../../../shared/services/customer.service';
import {CreateAppointmentForm, CreateAppointmentModel} from '../../models/CreateAppointment';
import * as moment from 'moment';
import {EmployeeAppointmentService} from '../../services/employee-appointment.service';
import {ToastService} from '../../../shared/services/toast.service';
import {Moment} from 'moment';

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

  @Output() dateChanged = new EventEmitter<Moment>();

  selectedCustomer = '';
  form: CreateAppointmentForm;

  constructor(private customerService: CustomerService,
              private employeeAppointment: EmployeeAppointmentService,
              private toast: ToastService) {
    this.form = new CreateAppointmentForm('', '', '', '', '');
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
    this.form.customerId = x.id;
    return x.name;
  };

  customerChange(e) {
    if (e.target.value !== this.selectedCustomer) {
      this.form.customerId = null;
    }
  }

  submit() {
    this.employeeAppointment.createAppointment(this.form.model())
      .toPromise()
      .then(success => {
        this.dateChanged.emit(success.start);
        this.toast.success('appointment booked');
      })
      .catch(error => this.toast.error(error));
  }

  emitDateChanged(date: string) {
    this.dateChanged.emit(moment.utc(date));
  }

}
