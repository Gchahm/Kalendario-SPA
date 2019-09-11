import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EmployeeAppointmentService} from '../../services/employee-appointment.service';
import {Observable} from 'rxjs';
import {Moment} from 'moment';
import {BaseAppointment} from '../../../shared/models/BaseAppointment';
import {Employee} from '../../../shared/models/Employee';

@Component({
  selector: 'app-appointment-requests',
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

  constructor(private appointmentsService: EmployeeAppointmentService) { }

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointments$ = this.appointmentsService.getPending(this.employee.id.toString());
  }

  handleAppointmentClicked($event: Moment) {
    this.eventClicked.emit($event);
  }
}
