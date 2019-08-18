import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeService} from '../../../shared/services/employee.service';
import {Observable} from 'rxjs';
import {Employee} from '../../../shared/models/Employee';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  employee$: Observable<Employee>

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employee$ = this.employeeService.current();
  }


}
