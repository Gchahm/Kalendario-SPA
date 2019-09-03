import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../../shared/services/employee.service';
import {Observable} from 'rxjs';
import {Employee} from '../../../shared/models/Employee';
import {AppointmentsListViewType} from '../appointment-list/appointments-list.component';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  employee$: Observable<Employee>;
  activatedPanel = 'profile';
  appointmentsListViewType: AppointmentsListViewType = AppointmentsListViewType.book;
  isCollapsed = false;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employee$ = this.employeeService.current();
  }

  bookAppointmentClicked() {
    this.activatedPanel = 'schedule';
    this.appointmentsListViewType = AppointmentsListViewType.book;
  }

  bookAppointmentActive() {
    return this.activatedPanel === 'schedule' && this.appointmentsListViewType === AppointmentsListViewType.book;
  }

  pendingappointmentClicked() {
    this.activatedPanel = 'schedule';
    this.appointmentsListViewType = AppointmentsListViewType.pending;
  }

  pendingAppointmentActive() {
    return this.activatedPanel === 'schedule' && this.appointmentsListViewType === AppointmentsListViewType.pending;
  }
}
