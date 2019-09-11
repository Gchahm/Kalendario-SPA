import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeService} from '../../../shared/services/employee.service';
import {Observable, Subscription} from 'rxjs';
import {Employee} from '../../../shared/models/Employee';
import {AppointmentsListViewType} from '../employee-appointments/employee-appointments.component';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
// TODO: Hide the admin features from normal employees
export class EmployeeDashboardComponent implements OnInit, OnDestroy {

  emp: Employee;
  empSubscription: Subscription;
  employees$: Observable<Employee[]>;

  isCollapsed = false;
  empListCollapsed = true;

  appointmentsListViewType: AppointmentsListViewType = AppointmentsListViewType.book;
  private active = 'profile';
  get activePanel(): string {
    return this.active;
  }
  set activePanel(value: string) {
    this.updateChild(value);
    this.active = value;
  }

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.empSubscription = this.employeeService.current().subscribe(employee => this.emp = employee);
    this.employees$ = this.employeeService.getAll();
  }

  ngOnDestroy() {
    this.empSubscription.unsubscribe();
  }

  SelectEmployee(emp: Employee) {
    this.empListCollapsed = true;
    this.emp = emp;
  }

  updateChild(value: string) {
    if (value === 'book') { this.appointmentsListViewType = AppointmentsListViewType.book; }
    if (value === 'pending') { this.appointmentsListViewType = AppointmentsListViewType.pending; }
    if (value === 'lock') { this.appointmentsListViewType = AppointmentsListViewType.lockTime; }
  }
}
