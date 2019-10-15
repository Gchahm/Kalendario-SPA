import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeService} from '../../../shared/services/employee.service';
import {forkJoin, Subscription} from 'rxjs';
import {Employee} from '../../../core/models/Employee';
import {Globals} from '../../../core/services/Globals';

@Component({
  selector: 'admin-appointment-dashboard-page',
  templateUrl: './appointment-dashboard-page.component.html',
  styleUrls: ['./appointment-dashboard-page.component.css']
})
// TODO: Hide the admin features from normal employees
export class AppointmentDashboardPageComponent implements OnInit, OnDestroy {

  emp: Employee;
  subscription: Subscription;
  employees: Employee[];

  activePanel = 'book';

  constructor(private employeeService: EmployeeService,
              private globals: Globals) { }

  ngOnInit() {
    if (this.globals.user.isEmployee) {
      this.subscription = forkJoin(this.employeeService.current(), this.employeeService.getAll())
        .subscribe(([employee, employees]) => {
          this.emp = employee;
          this.employees = employees;
        });
    } else {
      this.subscription = this.employeeService.getAll().subscribe(employees => {
        this.emp = employees[0];
        this.employees = employees;
      });

    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
