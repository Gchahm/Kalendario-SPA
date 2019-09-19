import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeService} from '../../../shared/services/employee.service';
import {Observable, Subscription} from 'rxjs';
import {Employee} from '../../../shared/models/Employee';

@Component({
  selector: 'employee-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
// TODO: Hide the admin features from normal employees
export class DashboardPageComponent implements OnInit, OnDestroy {

  emp: Employee;
  empSubscription: Subscription;
  employees$: Observable<Employee[]>;

  activePanel = 'book';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.empSubscription = this.employeeService.current().subscribe(employee => this.emp = employee);
    this.employees$ = this.employeeService.getAll();
  }

  ngOnDestroy() {
    this.empSubscription.unsubscribe();
  }
}
