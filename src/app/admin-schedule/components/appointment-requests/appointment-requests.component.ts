import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Moment} from 'moment';
import {BaseAppointment} from '../../../core/models/BaseAppointment';
import {Employee} from '../../../core/models/Employee';
import {AppointmentService} from '../../../shared/services/appointment.service';

@Component({
  selector: 'employee-appointment-requests',
  templateUrl: './appointment-requests.component.html',
  styleUrls: ['./appointment-requests.component.css']
})
export class AppointmentRequestsComponent implements OnInit {

  private _employee: Employee;
  get employee() {
    return this._employee;
  }
  @Input() set employee(employee: Employee) {
    this._employee = employee;
  }

  @Output() eventClicked = new EventEmitter<Moment>();

  appointments$: Observable<BaseAppointment[]>;

  constructor(private appointmentsService: AppointmentService) { }

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointments$ = this.appointmentsService.getAppointments({employee: this.employee.id.toString(), status: 'P'});
  }

  handleAppointmentClicked($event: Moment) {
    this.eventClicked.emit($event);
  }
}
