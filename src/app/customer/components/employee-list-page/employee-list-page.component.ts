import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../../shared/services/employee.service';
import {Observable} from 'rxjs';
import {Employee} from '../../../core/models/Employee';

@Component({
  selector: 'customer-employee-list',
  templateUrl: './employee-list-page.component.html',
  styleUrls: ['./employee-list-page.component.css']
})
export class EmployeeListPageComponent implements OnInit {

  public employees$: Observable<Employee[]>;

  constructor(private empService: EmployeeService) { }

  ngOnInit() {
    this.employees$ = this.empService.getAll();
  }

  services(employee: Employee): string {
    return employee.services.map(s => s.name).join(' - ');
  }
}
