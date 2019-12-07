import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeService} from '../../../shared/services/employee.service';
import {forkJoin, Subscription} from 'rxjs';
import {Employee} from '../../../core/models/Employee';
import {Globals} from '../../../core/services/Globals';
import {Moment} from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'admin-appointment-dashboard-page',
  templateUrl: './appointment-dashboard-page.component.html',
  styleUrls: ['./appointment-dashboard-page.component.css']
})
// TODO: Hide the admin features from normal employees
export class AppointmentDashboardPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  employees: Employee[];
  selectedEmployees: Employee[] = [];
  date: Moment = moment.utc();

  constructor(private employeeService: EmployeeService,
              private globals: Globals) {
  }

  ngOnInit() {
    if (this.globals.user.isEmployee) {
      // TODO: Test this part of the statement
      this.subscription = forkJoin(this.employeeService.current(), this.employeeService.getAll())
        .subscribe(([employee, employees]) => {
          this.employees = [employee];
        });
    } else {
      this.subscription = this.employeeService.getAll().subscribe(employees => {
        this.employees = employees;
      });

    }
  }

  isSelected(emp: Employee): boolean {
    return this.selectedEmployees.findIndex(e => e.id === emp.id) !== -1;
  }

  addPanel(emp: Employee) {
    if (!this.isSelected(emp)) {
      this.selectedEmployees.push(emp);
    }
  }

  removePanel(emp: Employee) {
    if (this.isSelected(emp)) {
      this.selectedEmployees.splice(this.selectedEmployees.indexOf(emp), 1 );
    }
  }

  today() {
    this.date = moment.utc();
  }

  previousDay() {
      this.date = this.date.subtract(1, 'days').clone();
  }

  nextDay() {
      this.date = this.date.add(1, 'days').clone();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
